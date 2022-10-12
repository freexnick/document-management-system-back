import path from "path";
import fs from "fs";
import { Document } from "../models/Document.js";
import { User } from "../models/User.js";

const uploadFile = async (req, res) => {
  const fileSize = req.file.size / 1024 ** 2;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.session.user._id },
      { $inc: { spaceUsed: +fileSize } }
    ).exec();
    if (user) {
      const result = await Document.create({
        owner: req.session.user._id,
        name: req.file.originalname,
        email: req.session.user.email,
        visibility: req.body.visibility,
        file: req.file.path,
        contentType: req.file.mimetype,
        fileSize: fileSize,
      });
      res.status(201).json(result);
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const getDocuments = async (req, res) => {
  const userEmail =
    req.session.user?.role === "admin"
      ? null
      : { email: req.session.user?.email };
  try {
    const result = await Document.find(userEmail);
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const getPublicDocuments = async (req, res) => {
  try {
    const result = await Document.find({ visibility: "public" });
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const getDocument = async (req, res) => {
  const reg = new RegExp(req.params.id, "i");
  try {
    const result = await Document.findOne({
      file: reg,
    });
    if (result) {
      const filePath = `${path.resolve()}/${result.file}`;
      res.status(200).download(filePath, result.name);
    } else {
      res
        .status(404)
        .json({ status: 404, message: "couldn't find the doccument" });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const result = await Document.findOneAndDelete({ _id: req.params.id });
    if (result) {
      await User.findByIdAndUpdate(
        { _id: result.owner },
        { $inc: { spaceUsed: -result.fileSize } }
      ).exec();
      fs.unlink(`${path.resolve()}/${result.file}`, (err) => err);
      res.status(200).json({ status: 200, message: "Sucess" });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

export {
  uploadFile,
  getDocuments,
  getDocument,
  deleteDocument,
  getPublicDocuments,
};
