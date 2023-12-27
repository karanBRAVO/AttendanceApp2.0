import express from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { markAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/mark-attendance", authenticate, markAttendance);

export default router;
