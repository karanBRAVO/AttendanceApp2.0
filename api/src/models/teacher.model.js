import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
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
      unique: true,
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    subjectName: {
      type: String,
      required: true,
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

export const teacherModel = new mongoose.model("teacher", teacherSchema);
