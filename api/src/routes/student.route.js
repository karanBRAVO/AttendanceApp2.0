import express from "express";
import {
  registerStudent,
  loginStudent,
  getAllTeachers,
} from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/register-student/:token", registerStudent);
router.post("/login-student", loginStudent);
router.get("/student/get-all-teachers", authenticate, getAllTeachers);

export default router;
