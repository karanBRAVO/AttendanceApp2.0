import express from "express";
import {
  registerStudent,
  loginStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/register-student/:token", registerStudent);
router.post("/login-student", loginStudent);

export default router;
