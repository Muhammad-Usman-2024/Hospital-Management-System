import jwt from "jsonwebtoken";
import Patient from "../../models/patient/patient.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/error.js";

// Register Patient
const PatientRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, doctorId } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const existingPatient = await Patient.findOne({ email });
  if (existingPatient) {
    return next(new ErrorHandler("Patient already registered.", 400));
  }

  // 👇 Doctor ID tabhi set hoga agar doctor dashboard se register ho raha hai
  const patient = new Patient({
    name,
    email,
    password,
    registeredBy: doctorId || null, // 🔥 Agar doctorId nahi mila toh NULL save karein
  });

  await patient.save();

  res.status(201).json({
    message: "Patient registered successfully.",
    success: true,
    error: false,
    patient,
  });
});

// Login Patient
const PatientLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const patient = await Patient.findOne({ email }).select("+password");
  if (!patient) {
    return next(new ErrorHandler("Patient not found.", 404));
  }

  const isPasswordValid = await patient.comparePassword(password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid credentials.", 401));
  }

  const patientToken = jwt.sign(
    { id: patient._id, email: patient.email },
    process.env.PATIENT_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.cookie("patientToken", patientToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.status(200).json({
    message: "Login successful.",
    success: true,
    error: false,
    patientToken,
  });
});

// Logout Patient
const PatientLogout = catchAsyncErrors(async (req, res, next) => {
  // Clear the patientToken cookie
  res.cookie("patientToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production", // Match your login settings
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  res.status(200).json({
    success: true,
    error: false,
    message: "Patient logged out successfully.",
  });
});

// Get Patient data
const PatientDetails = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patient.findById(req.patientId).select("-password");
  if (!patient) {
    return next(new ErrorHandler("Patient not found.", 404));
  }

  res.status(200).json({
    message: "Patient Details fetched successfully.",
    success: true,
    error: false,
    data: patient,
  });
});

//update patient profile
const updatePatientProfile = catchAsyncErrors(async (req, res, next) => {
  const { patientId } = req; // Use patientId from the auth token instead of route params
  let updateData = req.body; // Initialize updateData with request body

  try {
    console.log("Body Data:", updateData); // Log request body
    console.log("Uploaded Files:", req.files); // Log uploaded files

    // ---- Handle single file upload: 'avatar' ----
    if (req.files && req.files["avatar"]) {
      const avatarFilePath = req.files["avatar"][0].path;

      // Save file path to updateData
      updateData.avatar = avatarFilePath;

      console.log("Avatar stored locally at:", avatarFilePath);
    }

    // ---- Handle parsing of JSON fields ----
    const fieldsToParse = ["medicalHistory", "allergies", "currentMedications"];
    fieldsToParse.forEach((field) => {
      if (updateData[field]) {
        try {
          updateData[field] = JSON.parse(updateData[field]);
        } catch (error) {
          return next(new ErrorHandler(`Invalid ${field} JSON format`, 404));
        }
      }
    });

    // ---- Update Patient Profile in Database ----
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId, // Use patientId from auth token
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Handle patient not found
    if (!updatedPatient) {
      return next(new ErrorHandler("Patient not found.", 404));
    }

    // ---- Respond with Updated Data ----
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    next(new ErrorHandler(error.message, 500));
  }
});

const getDoctorRegisteredPatients = async (req, res) => {
  try {
    const { doctorId } = req.query;
    console.log("this is the doctorId ", doctorId);

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const patients = await Patient.find({ registeredBy: doctorId });
    console.log("these are the patients:", patients);
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching registered patients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  PatientRegister,
  PatientLogin,
  PatientLogout,
  PatientDetails,
  updatePatientProfile,
  getDoctorRegisteredPatients,
};
