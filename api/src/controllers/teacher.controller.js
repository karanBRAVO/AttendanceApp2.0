import { orgsModel } from "../models/orgs.model.js";
import { teacherModel } from "../models/teacher.model.js";
import { tokenModel } from "../models/token.model.js";
import { getToken } from "../utils/jwtTasks.js";
import { comparePassword, createHash } from "../utils/passwords.js";

export const registerTeacher = async (req, res, next) => {
  try {
    // getting the invitation token
    const token = req.params.token;
    if (!token) {
      const err = new Error("Token is required");
      throw err;
    }

    // matching the invitation token
    const tokenFound = await tokenModel.findOne({ token });
    if (!tokenFound) {
      const err = new Error("Couldn't find the invitation token.");
      throw err;
    }

    // getting the details from the request
    const { name, identityProof, email, phone, password, subjectName } =
      req.body;
    if (
      !name ||
      !identityProof ||
      !email ||
      !phone ||
      !password ||
      !subjectName
    ) {
      const err = new Error(`Invalid details.`);
      throw err;
    }

    // matching the emails
    if (tokenFound.receiverMail != email) {
      const err = new Error(
        `Emails are not matching <sent to> (${tokenFound.receiverMail}) <registering by> (${email})`
      );
      throw err;
    }

    // finding the organization in the database
    const orgs = await orgsModel.findOne({ _id: tokenFound.orgId });
    if (!orgs) {
      const err = new Error(`No organization found.`);
      throw err;
    }

    // finding the teacher in database
    const teacher = await teacherModel.findOne({
      orgId: orgs._id,
      name,
      identityProof,
      email,
      phone,
      subjectName,
    });
    if (teacher) {
      const err = new Error(`Registration already exists.`);
      throw err;
    }

    // generating the password hash
    let hashedPassword = createHash(password);

    // adding the teacher to the database
    const newTeacher = new teacherModel({
      orgId: orgs._id,
      name,
      identityProof,
      email,
      phone,
      password: hashedPassword,
      subjectName,
    });
    await newTeacher.save();

    res.json({ success: true, message: "Registration successful." });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const loginTeacher = async (req, res, next) => {
  try {
    // getting the details from the request
    const { name, identityProof, email, phone, password } = req.body;
    if (!name || !identityProof || !email || !phone || !password) {
      const err = new Error(`Invalid details.`);
      throw err;
    }

    // finding the teacher in database
    const teacher = await teacherModel.findOne({
      name,
      identityProof,
      email,
      phone,
    });
    if (!teacher) {
      const err = new Error(`Registration not found.`);
      throw err;
    }

    // matching the passwords
    if (!comparePassword(teacher.password, password)) {
      const err = new Error(`Password mismatch.`);
      throw err;
    }

    // creating a new token
    const token = getToken(teacher._id);

    res.json({ success: true, message: "Logged in.", token });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
