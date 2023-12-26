import express from "express";
import {
  getAllOrganizations,
  addNewOrganization,
} from "../controllers/orgs.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/add-new-organization", authenticate, addNewOrganization);
router.get("/get-all-organizations", getAllOrganizations);

export default router;
