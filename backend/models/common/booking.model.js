import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  amount: { type: String, required: true },
  time: { type: String, required: true },
  purpose: { type: String, required: true },
  type: { type: String, required: true },
  symptoms: { type: String, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Cancelled"],
    default: "Pending",
  },
  bookingDate: { type: Date, default: Date.now }, // Automatically sets to current date
  appointmentDate: { type: Date, required: true }, // Appointment date
  customId: { type: String, unique: true }, // Custom ID field
});

export default mongoose.model("Booking", bookingSchema);
