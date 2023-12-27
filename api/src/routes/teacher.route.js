import express from "express";
import {
  registerTeacher,
  loginTeacher,
} from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/teacher-register/:token", registerTeacher);
router.post("/teacher-login", loginTeacher);

export default router;
