import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String, // Store the file path or URL of the avatar image
      default: "", // Optional default value
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dateOfBirth: {
      type: Date, // Date type for birth date
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
    phoneNumber: {
      type: String, // String type to allow special characters like '+'
    },
    address: {
      type: String, // Address line
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String, // Using String for postal codes to handle alphanumeric formats
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware for hashing passwords
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new or modified

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const Admin = mongoose.model("Admin", AdminSchema);
