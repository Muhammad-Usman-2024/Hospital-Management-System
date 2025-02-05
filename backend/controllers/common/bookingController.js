import mongoose from "mongoose";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/error.js";
import Booking from "../../models/common/booking.model.js";
import Doctor from "../../models/doctor/doctor.model.js";

// const BookDoctor = async (req, res) => {
//   try {
//     const bookingData = req.body;

//     const booking = new Booking(bookingData);
//     await booking.save();
//     res.status(201).json({ message: "Booking created successfully", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating booking", error });
//   }
// };
const BookDoctor = async (req, res) => {
  try {
    console.log("Received Booking Request:", req.body); // Debugging log

    const {
      doctorId,
      patientId,
      patientName,
      email,
      phoneNumber,
      amount,
      time,
      purpose,
      type,
      symptoms,
      message,
      appointmentDate,
    } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Request body is empty. Check your request format." });
    }

    // Check for missing required fields
    if (
      !doctorId ||
      !patientId ||
      !patientName ||
      !email ||
      !phoneNumber ||
      !amount ||
      !time ||
      !purpose ||
      !type ||
      !symptoms ||
      !appointmentDate
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", receivedData: req.body });
    }

    // Validate MongoDB ObjectId format
    if (
      !mongoose.Types.ObjectId.isValid(doctorId) ||
      !mongoose.Types.ObjectId.isValid(patientId)
    ) {
      return res.status(400).json({ message: "Invalid doctorId or patientId" });
    }

    const booking = new Booking({
      doctorId,
      patientId,
      patientName,
      email,
      phoneNumber,
      amount,
      time,
      purpose,
      type,
      symptoms,
      message,
      appointmentDate,
    });

    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
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
          const prefix = "PT";
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

// const updateBookingStatus = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { status } = req.body;

//     const booking = await Booking.findByIdAndUpdate(
//       bookingId,
//       { status },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ message: "Booking status updated", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating booking status", error });
//   }
// };
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate("patientId", "avatar name email phoneNumber");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Error updating booking status", error });
  }
};

export { BookDoctor, getBookings, updateBookingStatus };
