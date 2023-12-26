import mongoose from "mongoose";

const orgsSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default:
        "https://img.freepik.com/vecteurs-premium/creation-logo-communautaire-couleur_766765-434.jpg?w=360",
      required: false,
    },
  },
  { timestamps: true }
);

export const orgsModel = new mongoose.model("org", orgsSchema);
