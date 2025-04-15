import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import sendEmail from "./resendClient.js";

export const sendVerificationEmail = async (
  email,
  username,
  verificationToken
) => {
  const personalizedTemplate = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{username}",
    username
  ).replace("{verificationToken}", verificationToken);

  try {
    const subject = "Verify Your Email";
    await sendEmail(email, subject, personalizedTemplate);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Email sending failed");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const prepareTemplate = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetURL
  );

  try {
    const subject = "Reset Your Password";
    await sendEmail(email, subject, prepareTemplate);
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
};
