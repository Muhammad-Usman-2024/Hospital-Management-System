import jwt from "jsonwebtoken";
import Doctor from "../../models/doctor/doctor.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/error.js";
import bcryptjs from "bcryptjs";

// Register Doctor
const DoctorRegister = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const existingDoctor = await Doctor.findOne({ email });
  if (existingDoctor) {
    return next(new ErrorHandler("Doctor already registered.", 400));
  }

  const doctor = new Doctor({
    username,
    email,
    password,
  });
  console.log(doctor);
  await doctor.save();

  res.status(201).json({
    message: "Doctor registered successfully.",
    success: true,
    error: false,
  });
});

// Login Doctor
const DoctorLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Validation for empty fields
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found.", 404));
  }

  const isPasswordValid = await bcryptjs.compare(password, doctor.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid credentials.", 401));
  }

  const doctorToken = jwt.sign(
    { id: doctor._id, email: doctor.email },
    process.env.DOCTOR_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.cookie("doctorToken", doctorToken, {
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
    doctorToken,
  });
});

<<<<<<< HEAD
=======
// Logout Doctor
const DoctorLogout = catchAsyncErrors(async (req, res, next) => {
  // Clear the doctorToken cookie
  res.cookie("doctorToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production", // Match your login settings
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  res.status(200).json({
    success: true,
    error: false,
    message: "Doctor logged out successfully.",
  });
});

>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
// Get Doctor data
const DoctorDetails = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctorId).select("-password");
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found.", 404));
  }
  res.status(200).json({
    message: "Doctor profile data fetched successfully.",
    success: true,
    error: false,
    data: doctor,
  });
});

//all doctors data
const AllDoctorsData = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.find().select("-password");
  if (!doctor) {
    return next(new ErrorHandler("Doctors not found.", 404));
  }
  res.status(200).json({
    message: "Doctors profile data fetched successfully.",
    success: true,
    error: false,
    data: doctor,
  });
});

<<<<<<< HEAD
// Update Doctor Profile
// const updateDoctorProfile = catchAsyncErrors(async (req, res, next) => {
//   const { doctorId } = req; // Fetch id from route parameter
//   let updateData = req.body; // Initialize updateData with request body

//   try {
//     console.log("Body Data:", updateData); // Log request body
//     console.log("Uploaded Files:", req.files); // Log uploaded files

//     // ---- Handle single file upload: 'avatar' ----
//     if (req.files && req.files["avatar"]) {
//       const avatarFilePath = req.files["avatar"][0].path;

//       // Save the file path to updateData
//       updateData.avatar = avatarFilePath;

//       console.log("Avatar uploaded locally:", avatarFilePath);
//     }

//     // ---- Handle multiple file uploads: 'images' ----
//     if (req.files && req.files["clinicInfo.images"]) {
//       const imageFiles = req.files["clinicInfo.images"]; // Array of files

//       // Extract file paths
//       const clinicImagesUrls = imageFiles.map((file) => file.path);

//       console.log("Images uploaded locally:", clinicImagesUrls);

//       // ---- Parse clinicInfo JSON if provided and add image file paths ----
//       if (updateData.clinicInfo) {
//         try {
//           const clinicInfo = JSON.parse(updateData.clinicInfo);
//           clinicInfo.images = clinicImagesUrls;
//           updateData.clinicInfo = clinicInfo;
//         } catch (error) {
//           return res.status(400).json({
//             success: false,
//             message: "Invalid clinicInfo JSON format",
//           });
//         }
//       }
//     }

//     // ---- Parse and handle other JSON fields if provided ----
//     // const fieldsToParse = ["memberships", "education", "experience", "awards"];
//     // fieldsToParse.forEach((field) => {
//     //   if (updateData[field]) {
//     //     try {
//     //       updateData[field] = JSON.parse(updateData[field]);
//     //     } catch (error) {
//     //       return res.status(400).json({
//     //         success: false,
//     //         message: `Invalid ${field} JSON format`,
//     //       });
//     //     }
//     //   }
//     // });
//     const fieldsToParse = ["memberships", "education", "experience", "awards"];
//     fieldsToParse.forEach((field) => {
//       if (updateData[field]) {
//         try {
//           updateData[field] = JSON.parse(updateData[field]);
//         } catch (error) {
//           return res.status(400).json({
//             success: false,
//             message: `Invalid ${field} JSON format`,
//           });
//         }
//       }
//     });

//     // ---- Update Doctor Profile in Database ----
//     const updatedDoctor = await Doctor.findByIdAndUpdate(
//       doctorId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     // Handle doctor not found
//     if (!updatedDoctor) {
//       return res.status(404).json({
//         success: false,
//         message: "Doctor not found",
//       });
//     }

//     // ---- Respond with Updated Data ----
//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: updatedDoctor,
//     });
//   } catch (error) {
//     console.error("Update Profile Error:", error.message);
//     next(new ErrorHandler(error.message, 500));
//   }
// });
=======
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
const updateDoctorProfile = catchAsyncErrors(async (req, res, next) => {
  const { doctorId } = req; // Fetch id from route parameter
  let updateData = req.body; // Initialize updateData with request body

  try {
    console.log("Body Data:", updateData); // Log request body
    console.log("Uploaded Files:", req.files); // Log uploaded files

    // ---- Handle single file upload: 'avatar' ----
    if (req.files && req.files["avatar"]) {
      const avatarFilePath = req.files["avatar"][0].path;
      updateData.avatar = avatarFilePath;
      console.log("Avatar uploaded locally:", avatarFilePath);
    }

    // ---- Handle multiple file uploads: 'images' ----
    if (req.files && req.files["clinicInfo.images"]) {
      const imageFiles = req.files["clinicInfo.images"]; // Array of files
      const clinicImagesUrls = imageFiles.map((file) => file.path);
      console.log("Images uploaded locally:", clinicImagesUrls);

      if (updateData.clinicInfo) {
        try {
          const clinicInfo = JSON.parse(updateData.clinicInfo);
          clinicInfo.images = clinicImagesUrls;
          updateData.clinicInfo = clinicInfo;
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Invalid clinicInfo JSON format",
          });
        }
      }
    }

    // ---- Parse and handle JSON fields ----
    const fieldsToParse = ["memberships", "education", "experience", "awards"];
    fieldsToParse.forEach((field) => {
      if (updateData[field]) {
        try {
          // Parse array fields
          updateData[field] = JSON.parse(updateData[field]);

          // Ensure the array has the correct structure (check if each item is an object with required fields)
          if (Array.isArray(updateData[field])) {
            updateData[field] = updateData[field].map((item) => {
              if (field === "education") {
                return {
                  degree: item.degree || "",
                  college: item.college || "",
                  yearOfCompletion: item.yearOfCompletion || "",
                };
              } else if (field === "experience") {
                return {
                  hospitalName: item.hospitalName || "",
                  from: item.from || "",
                  to: item.to || "",
                  designation: item.designation || "",
                };
              } else if (field === "awards") {
                return {
                  title: item.title || "",
                  year: item.year || "",
                };
              }
              return item;
            });
          }
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: `Invalid ${field} JSON format`,
          });
        }
      }
    });

    // ---- Update Doctor Profile in Database ----
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // ---- Respond with Updated Data ----
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    next(new ErrorHandler(error.message, 500));
  }
});

export {
  DoctorRegister,
  DoctorLogin,
<<<<<<< HEAD
=======
  DoctorLogout,
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
  DoctorDetails,
  AllDoctorsData,
  updateDoctorProfile,
};
