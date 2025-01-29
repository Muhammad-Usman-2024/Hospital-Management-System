import dotenv from "dotenv";
import cloudinary from "cloudinary";
import fs from "fs";
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload single file to Cloudinary with file cleanup
export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: folder, // Specify Cloudinary folder
    });
    fs.unlinkSync(filePath); // Clean up the temporary file locally
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error("Cloudinary Error Response:", error);
    fs.unlinkSync(filePath); // Clean up file
    throw new Error(
      `Failed to upload to Cloudinary: ${error.message || "No error message"}`
    );
  }
};

// Upload multiple files to Cloudinary with file cleanup
export const uploadMultipleToCloudinary = async (files, folder) => {
  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: folder, // Specify Cloudinary folder
        });
        fs.unlinkSync(file.path); // Clean up each file locally
        return result.secure_url; // Return the Cloudinary URL
      })
    );

    return uploadedFiles; // Return array of secure URLs
  } catch (error) {
    console.error("Cloudinary Error Response:", error);
    files.forEach((file) => fs.unlinkSync(file.path)); // Clean up all files if any upload fails
    throw new Error(
      `Failed to upload multiple files to Cloudinary: ${error.message}`
    );
  }
};
