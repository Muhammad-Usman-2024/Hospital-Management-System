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
<<<<<<< HEAD
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
=======
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
<<<<<<< HEAD
  customId: { type: String, unique: true }, // Custom ID field
=======
  customId: { type: String }, // Custom ID field
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
});

export default mongoose.model("Booking", bookingSchema);
