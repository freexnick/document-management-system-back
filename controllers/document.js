import path from "path";
import fs from "fs";
import { Document } from "../models/Document.js";
import { User } from "../models/User.js";

const uploadFile = async (req, res) => {
  const fileSize = req.file.size / 1024 ** 2;
  const user = await User.findByIdAndUpdate(
    { _id: req.body.owner },
    { $inc: { spaceUsed: +fileSize } }
  ).exec();
  if (user) {
    const result = await Document.create({
      owner: req.body.owner,
      name: req.file.originalname,
      email: req.body.email,
      visibility: req.body.visibility,
      file: req.file.path,
      contentType: req.file.mimetype,
      fileSize: fileSize,
    });
    res.status(200).json(result);
  }
};

const getDocuments = async (req, res) => {
  const result = await Document.find();
  res.status(200).json(result);
};

const getDocument = async (req, res) => {
  const reg = new RegExp(req.params.id, "i");
  const result = await Document.findOne({
    file: reg,
  });
  const filePath = `${path.resolve()}/${result.file}`;
  res.status(200).download(filePath, result.name);
};

const deleteDocument = async (req, res) => {
  const result = await Document.findOneAndDelete({ _id: req.params.id });
  if (result) {
    await User.findByIdAndUpdate(
      { _id: result.owner },
      { $inc: { spaceUsed: -result.fileSize } }
    ).exec();
    fs.unlink(`${path.resolve()}/${result.file}`, (err) => err);
    res.status(200).json({ status: 200, message: "Sucess" });
  }
};

export { uploadFile, getDocuments, getDocument, deleteDocument };
