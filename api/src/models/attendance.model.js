import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const attendanceModel = new mongoose.model(
  "attendance",
  attendanceSchema
);
