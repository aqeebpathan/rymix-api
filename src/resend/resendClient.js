import "../../config.js";
import { Resend } from "resend";

const resendClient = new Resend(process.env.RESEND_API_KEY);

const sendEmail = (email, subject, template) => {
  return resendClient.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: subject,
    html: template,
  });
};

export default sendEmail;
