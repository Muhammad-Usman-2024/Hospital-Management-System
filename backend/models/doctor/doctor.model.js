import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const doctorSchema = new mongoose.Schema(
  {
    // Basic information
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    // About me
    aboutMe: {
      biography: {
        type: String,
      },
    },
    // Clinic info
    clinicInfo: {
      name: { type: String },
      address: { type: String },
      images: [String], // Store image URLs from Cloudinary
    },
    // Contact details
    contactDetails: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    // Pricing
    pricing: {
      type: { type: String, default: "free" },
      customPrice: { type: String },
    },
    // Services and specialization
    servicesAndSpecialization: {
      services: [],
      specializations: [],
    },
    // Education
    education: [
      {
        degree: { type: String },
        college: { type: String },
        yearOfCompletion: { type: String },
      },
    ],
    // Experience
    experience: [
      {
        hospitalName: { type: String },
        from: { type: String },
        to: { type: String },
        designation: { type: String },
      },
    ],
    // Awards
    awards: [
      {
        title: { type: String },
        year: { type: String },
      },
    ],
    // Memberships
    memberships: [{ name: { type: String } }],
  },
  { timestamps: true }
);

// Hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
