import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId, userRole) => {
  const token = jwt.sign({ userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    // domain: process.env.COOKIE_DOMAIN,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateTokenAndSetCookie;
