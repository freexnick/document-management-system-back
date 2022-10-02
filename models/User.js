import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
    minLength: 4,
    maxLength: 50,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  phone: { type: Number, minLength: 11 },
  password: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 8,
  },
  spaceUsed: Number,
  spaceLimit: { type: Number, enum: 25000 },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (providedPassword) {
  return await bcrypt.compare(providedPassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
