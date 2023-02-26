const mongoose = require("mongoose");
const crypto = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      // required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/avatar.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return;

  const salt = crypto.randomBytes(16).toString();
  const hashedPassword = crypto
    .createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("No User Found !!");

  const salt = user.salt;
  const hashedPassword = user.password;

  const newHashedPassword = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== newHashedPassword)
    throw new Error("Wrong password !!");

  const token = createTokenForUser(user);
  return token;
});

const User = mongoose.model("users", userSchema);

module.exports = User;
