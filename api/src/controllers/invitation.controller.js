import { adminModel } from "../models/admin.model.js";
import { orgsModel } from "../models/orgs.model.js";
import { tokenModel } from "../models/token.model.js";
import { mailer } from "../utils/mailer.js";
import { InvitationTemplate } from "../utils/mail_templates/invitation.template.js";
import crypto from "crypto";

export const sendInvitation = async (req, res, next) => {
  try {
    // getting the user id from the request
    const userId = req.userId;
    if (!userId) {
      const err = new Error(`Authentication is required.`);
      throw err;
    }

    // finding the user is admin database
    const admin = await adminModel.findOne({ _id: userId });
    if (!admin) {
      const err = new Error(`No user found`);
      throw err;
    }

    // finding the organization created by the admin
    const org = await orgsModel.findOne({ adminId: admin._id });
    if (!org) {
      const err = new Error(`No organization found`);
      throw err;
    }

    // getting the receiver email
    const { receiverEmail, rediectURL } = req.body;
    if (!receiverEmail || !rediectURL) {
      const err = new Error(`Invalid details`);
      throw err;
    }

    // generating the invitation token
    const invitationToken = crypto.randomBytes(16).toString("hex");
    const invitationLink = `${rediectURL}/${invitationToken}`;

    // // sending the invitation
    // const mailData = {
    //   from: admin.email,
    //   to: receiverEmail,
    //   subject: "Invitation for Registration",
    //   template: InvitationTemplate(
    //     org.name,
    //     admin.name,
    //     admin.email,
    //     invitationLink
    //   ),
    // };
    // const mailStatus = await mailer(
    //   mailData.from,
    //   mailData.to,
    //   mailData.subject,
    //   mailData.template
    // );
    // if (!mailStatus) {
    //   const err = new Error(`Could not send the invitation.`);
    //   throw err;
    // }

    // saving the invitation token to the database
    const newToken = new tokenModel({
      orgId: org._id,
      receiverMail: receiverEmail,
      token: invitationToken,
    });
    await newToken.save();

    res.json({
      success: true,
      message: "Invitation successfully sent.",
      invitationLink,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
