import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/user.model.js";
import AppResponse from "../utils/AppResponse.js";
import generateVerificationToken from "../utils/generateVerificationToken.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../resend/emailService.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return AppResponse.error(res, "All fields are required", 400);
    }

    // Check if this is the first user, make them admin
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";

    const userExists = await User.findOne({ email });
    if (userExists) {
      return AppResponse.error(res, "Email already in use.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      role,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id, user.role);

    // send verification email
    sendVerificationEmail(user.email, user.username, user.verificationToken);

    return AppResponse.success(
      res,
      "Account created successfully!",
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        role: user.role,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return AppResponse.error(
        res,
        "Invalid or expired verification code",
        400
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // todo: welcome email

    return AppResponse.success(
      res,
      "Your email has been verified.",
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        role: user.role,
      },
      200
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return AppResponse.error(res, "Invalid Credentials", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return AppResponse.error(res, "Invalid Credentials", 400);
    }

    generateTokenAndSetCookie(res, user._id, user.role);

    user.lastLogin = new Date();
    await user.save();

    return AppResponse.success(
      res,
      "Successfully logged in!",
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        role: user.role,
      },
      200
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (_, res) => {
  res.clearCookie("token");
  return AppResponse.success(res, "You’ve been logged out.");
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return AppResponse.error(res, "User with email not found.");
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send password reset email
    sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return AppResponse.success(
      res,
      "Password reset request sent. Check your email."
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return AppResponse.error(res, "Invalid or expired reset token.");
    }

    // update password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    user.save();

    // todo: send success reset email

    return AppResponse.success(res, "Your password has been reset.");
  } catch (error) {
    next(error);
  }
};

export const checkAuthStatus = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordTokenExpiresAt -verificationTokenExpiresAt -__v"
    );
    if (!user) {
      return AppResponse.error(res, "User not found", 404);
    }

    return AppResponse.success(res, "User is authenticated.", {
      _id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
