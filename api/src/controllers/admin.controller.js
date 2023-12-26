import { admingModel } from "../models/admin.model.js";
import { createHash, comparePassword } from "../utils/passwords.js";
import { getToken } from "../utils/jwtTasks.js";

export const adminSignup = async (req, res, next) => {
  try {
    // getting the details from the body
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      const err = new Error(`Invalid details entered`);
      throw err;
    }

    // checking user existance
    const admin = await admingModel.findOne({ name, email, phone });
    if (admin) {
      const err = new Error(`User already exists`);
      throw err;
    }

    // adding the admin to database
    const hashedPassword = createHash(password);
    const newAdmin = new admingModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newAdmin.save();

    res.json({ success: true, message: "Signup successful." });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    // getting the details from the body
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      const err = new Error(`Invalid details entered`);
      throw err;
    }

    // checking user existance
    const admin = await admingModel.findOne({ name, email, phone });
    if (!admin) {
      const err = new Error(`User not found`);
      throw err;
    }

    // generating the token
    const token = getToken(admin._id);

    res.json({ success: true, message: "Logged In.", token });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
