import { orgsModel } from "../models/orgs.model.js";
import { studentModel } from "../models/student.model.js";
import { teacherModel } from "../models/teacher.model.js";
import { tokenModel } from "../models/token.model.js";
import { getUniqueId } from "../utils/idGenerator.js";
import { getToken } from "../utils/jwtTasks.js";
import { createHash, comparePassword } from "../utils/passwords.js";

export const registerStudent = async (req, res, next) => {
  try {
    // getting the invitation token
    const token = req.params.token;
    if (!token) {
      const err = new Error("Token is required");
      throw err;
    }

    // matching the invitation token
    const tokenFound = await tokenModel.findOneAndDelete({ token });
    if (!tokenFound) {
      const err = new Error("Couldn't find the invitation token.");
      throw err;
    }

    // getting the details from the request
    const { name, identityProof, email, phone, password, className } = req.body;
    if (
      !name ||
      !identityProof ||
      !email ||
      !phone ||
      !password ||
      !className
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

    // finding the student in database
    const student = await studentModel.findOne({
      orgId: orgs._id,
      name,
      identityProof,
      email,
      phone,
      class: className,
    });
    if (student) {
      const err = new Error(`Registration already exists.`);
      throw err;
    }

    // generating the password hash
    let hashedPassword = createHash(password);

    // generating unique identifier
    let uniqueId = getUniqueId(`${name}${email}${phone}`, password);

    // adding the student to the database
    const newStudent = new studentModel({
      orgId: orgs._id,
      name,
      identityProof,
      email,
      phone,
      password: hashedPassword,
      class: className,
      uniqueId,
    });
    await newStudent.save();

    res.json({ success: true, message: "Registration successful." });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const loginStudent = async (req, res, next) => {
  try {
    // getting the details from the request
    const { name, identityProof, email, phone, password } = req.body;
    if (!name || !identityProof || !email || !phone || !password) {
      const err = new Error(`Invalid details.`);
      throw err;
    }

    // finding the student in database
    const student = await studentModel.findOne({
      name,
      identityProof,
      email,
      phone,
    });
    if (!student) {
      const err = new Error(`Registration not found.`);
      throw err;
    }

    // matching the passwords
    if (!comparePassword(student.password, password)) {
      const err = new Error(`Password mismatch.`);
      throw err;
    }

    // creating a new token
    const token = getToken(student._id);

    res.json({ success: true, message: "Logged in.", token });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    // getting the student id
    const studentId = req.userId;
    if (!studentId) {
      const err = new Error(`Authentication failed.`);
      throw err;
    }

    // finding the student in the database
    const student = await studentModel.findOne({ _id: studentId });
    if (!student) {
      const err = new Error(`Not registered`);
      throw err;
    }

    // fetching all the teachers for the same organization as of student
    const teachers = await teacherModel.find({ orgId: student.orgId });
    if (!teachers || teachers.length == 0) {
      const err = new Error(`No teachers found for ${student.orgId}`);
      throw err;
    }

    // creating the required data to be sent to the frontend
    let data = [];
    for (const teacher of teachers) {
      data.push({
        teacher_name: teacher.name,
        teacher_subject: teacher.subjectName,
        teacher_uniqueId: teacher.uniqueId,
      });
    }

    res.json({ success: true, message: "Teachers sent.", data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
