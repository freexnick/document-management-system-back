import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "Please provide the owner"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  name: {
    type: String,
    required: [true, "Please Provide file name"],
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    required: [true, "Please provide file visibility"],
  },
  type: {
    type: String,
  },
  file: { type: String },
  fileSize: { type: Number },
  contentType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Document = mongoose.model("Document", DocumentSchema);
