import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/error.js";
import { Admin } from "../../models/admin/admin.model.js";

// Seed Admins (Admin Registration)
const seedAdmins = async () => {
  try {
    const admins = [
      {
        username: "muhammad",
        email: "muhammad@gmail.com",
        password: "muhammad123",
      },
      {
        username: "qamar",
        email: "qamar@gmail.com",
        password: "qamar123",
      },
    ];

    for (const admin of admins) {
      const existingAdmin = await Admin.findOne({ username: admin.username });
      if (!existingAdmin) {
        const newAdmin = new Admin(admin);
        await newAdmin.save();
      }
    }
    console.log("Admins seeded successfully.");
  } catch (error) {
    console.error("Error seeding admins:", error.message);
  }
};

seedAdmins();

// Admin Login
const AdminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }
  const validAdmin = await Admin.findOne({ email });
  if (!validAdmin) {
    return next(new ErrorHandler("Admin not found.", 404));
  }
  const isPasswordValid = await validAdmin.comparePassword(password);

  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  const adminToken = jwt.sign(
    { id: validAdmin._id, isAdmin: true },
    process.env.ADMIN_ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const { password: hashedPassword, ...rest } = validAdmin._doc;

  res
    .cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      error: false,
      data: rest,
      message: "Admin Logged In Successfully.",
      token: adminToken,
    });
});
// Get Admin data
const AdminDetails = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.adminId).select("-password");
  if (!admin) {
    return next(new ErrorHandler("Admin not found.", 404));
  }
  res.status(200).json({
    message: "Admin Details fetched successfully.",
    success: true,
    error: false,
    data: admin,
  });
});
// Controller to update the admin profile
const updateAdminProfile = catchAsyncErrors(async (req, res, next) => {
  const { adminId } = req; // Use adminId from the auth token middleware
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

    // ---- Update Admin Profile in Database ----
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId, // Use adminId from auth token
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Handle admin not found
    if (!updatedAdmin) {
      return next(new ErrorHandler("Admin not found.", 404));
    }

    // ---- Respond with Updated Data ----
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    next(new ErrorHandler(error.message, 500));
  }
});

export { AdminLogin, AdminDetails, updateAdminProfile };
