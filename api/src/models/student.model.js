import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    identityProof: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      required: true,
      trim: true,
    },
    uniqueId: {
      // identifier given by the organization
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const studentModel = new mongoose.model("student", studentSchema);
