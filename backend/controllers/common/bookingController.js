import mongoose from "mongoose";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/error.js";
import Booking from "../../models/common/booking.model.js";
import Doctor from "../../models/doctor/doctor.model.js";

// Book Doctor Controller
// const BookDoctor = catchAsyncErrors(async (req, res, next) => {
//   const {
//     doctorId,
//     patientName,
//     email,
//     phoneNumber,
//     amount,
//     date,
//     time,
//     purpose,
//     type,
//     symptoms,
//     message,
//   } = req.body;
//   console.log(req.body);
//   console.log(doctorId);

//   // Handle file upload: 'patientAvatar'
//   let patientAvatar = "";
//   if (req.files && req.files["patientAvatar"]) {
//     patientAvatar = req.files["patientAvatar"][0].path; // Save the file path to the avatar field
//     console.log("Patient Avatar stored at:", patientAvatar);
//   }

//   // Validate required fields
//   if (
//     !doctorId ||
//     !patientName ||
//     !email ||
//     !phoneNumber ||
//     !date ||
//     !time ||
//     !symptoms ||
//     !purpose ||
//     !type
//   ) {
//     return next(new ErrorHandler("Missing required fields!", 400)); // Use custom error handler
//   }

//   // Check if the doctor exists
//   const doctor = await Doctor.findById(doctorId);
//   if (!doctor) {
//     return next(new ErrorHandler("Doctor not found!", 404)); // Use custom error handler
//   }

//   // Create the booking
//   const newBooking = new Booking({
//     doctorId,
//     patientName,
//     email,
//     phoneNumber,
//     amount,
//     date,
//     time,
//     purpose,
//     type,
//     symptoms,
//     message,
//     patientAvatar, // Save the avatar path to the booking
//   });

//   // Save booking to database
//   await newBooking.save();

//   return res.status(201).json({
//     message: "Doctor booked successfully!",
//     booking: newBooking,
//   });
// });

const BookDoctor = async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

const getBookings = async (req, res) => {
  try {
    const { userId, role } = req.query;
    console.log("UserId from query:", userId);
    console.log("Role from query:", role);

    // Validate if userId and role are provided
    if (!userId || !role) {
      return res.status(400).json({ message: "userId and role are required" });
    }

    let bookings;

    // Use .trim() to ensure there's no trailing spaces in the role
    const userRole = role.trim().toLowerCase();

    if (userRole === "patient") {
      // Fetch all bookings for the patient, regardless of status
      bookings = await Booking.find({ patientId: userId }).populate(
        "doctorId",
        "avatar username servicesAndSpecialization"
      );
    } else if (userRole === "doctor") {
      // Fetch only non-cancelled bookings for the doctor
      bookings = await Booking.find({
        doctorId: userId,
        status: { $ne: "Cancelled" }, // Exclude canceled bookings
      }).populate("patientId", "avatar name");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    // Generate customId for bookings if missing
    const updatedBookings = await Promise.all(
      bookings.map(async (booking, index) => {
        if (!booking.customId) {
          const prefix = userRole === "doctor" ? "DR" : "PT";
          const generatedId = `#${prefix}${String(index + 1).padStart(4, "0")}`;
          booking.customId = generatedId;

          // Save the updated booking back to the database
          await booking.save();
        }
        return booking;
      })
    );

    res.status(200).json(updatedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

// const getBookings = async (req, res) => {
//   try {
//     const { userId, role } = req.query;
//     console.log("UserId from query:", userId);
//     console.log("role:", role);

//     // Validate if userId and role are provided
//     if (!userId || !role) {
//       return res.status(400).json({ message: "userId and role are required" });
//     }

//     let bookings;

//     // Use .trim() to ensure there's no trailing spaces in the role
//     const userRole = role.trim().toLowerCase();

//     if (userRole === "patient") {
//       bookings = await Booking.find({ patientId: userId }).populate(
//         "doctorId",
//         "avatar username servicesAndSpecialization"
//       );
//     } else if (userRole === "doctor") {
//       bookings = await Booking.find({ doctorId: userId }).populate(
//         "patientId",
//         "avatar name"
//       );
//     } else {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     if (!bookings || bookings.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No bookings found for this user" });
//     }

//     // Generate customId for bookings if missing
//     const updatedBookings = await Promise.all(
//       bookings.map(async (booking, index) => {
//         if (!booking.customId) {
//           const prefix = userRole === "doctor" ? "DR" : "PT";
//           const generatedId = `#${prefix}${String(index + 1).padStart(4, "0")}`;
//           booking.customId = generatedId;

//           // Save the updated booking back to the database
//           await booking.save();
//         }
//         return booking;
//       })
//     );

//     res.status(200).json(updatedBookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching bookings", error: error.message });
//   }
// };

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error });
  }
};

export { BookDoctor, getBookings, updateBookingStatus };
