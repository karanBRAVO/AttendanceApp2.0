import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailer = async (from, to, subject, template, attachments = []) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
      },
    });

    const message = {
      from,
      to,
      subject,
      html: template,
      attachments,
    };

    const res = await transporter.sendMail(message);
    if (!res) {
      throw new Error("Cannot send mail");
    }

    return true;
  } catch (err) {
    return false;
  }
};
