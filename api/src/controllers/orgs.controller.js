import { admingModel } from "../models/admin.model.js";
import { orgsModel } from "../models/orgs.model.js";

export const addNewOrganization = async (req, res, next) => {
  try {
    // getting the admin id from request
    const userId = req.userId;
    if (!userId) {
      const err = new Error(`Invalid request.`);
      throw err;
    }

    // finding the user in the database
    const admin = await admingModel.findOne({ _id: userId });
    if (!admin) {
      const err = new Error(`Admin registration is required.`);
      throw err;
    }

    // getting the organization details
    let { name, address, logo } = req.body;
    if (!name || !address) {
      const err = new Error(`Invalid details for organization.`);
      throw err;
    }
    if (!logo) {
      logo = undefined;
    }

    // checking the existance of the organization
    const org = await orgsModel.findOne({ name });
    if (org) {
      const err = new Error(`Organization ${org.name} already exists.`);
      throw err;
    }

    // adding the organization
    const newOrg = new orgsModel({
      adminId: admin._id,
      name,
      address,
      logo,
    });
    await newOrg.save();

    res.json({ success: true, message: "Organization added." });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};

export const getAllOrganizations = async (req, res, next) => {
  try {
    // fetching all the organizations
    const orgs = await orgsModel.find();
    if (orgs.length == 0) {
      const err = new Error(`No organizations found.`);
      throw err;
    }

    // creating the required data
    let organizations = [];
    for (let org of orgs) {
      organizations.push({
        orgName: org.name,
        address: org.address,
        logo: org.logo,
      });
    }

    res.json({ success: true, message: "Organizations sent.", organizations });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};
