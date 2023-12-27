import express from "express";
import { sendInvitation } from "../controllers/invitation.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/send-invitation", authenticate, sendInvitation);

export default router;
