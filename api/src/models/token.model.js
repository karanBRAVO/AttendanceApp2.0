import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  orgId: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
  receiverMail: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
    expires: 60 * 60 * 24,
  },
});

export const tokenModel = new mongoose.model("token", tokenSchema);
