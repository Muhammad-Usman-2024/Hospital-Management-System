import {
  AdminLogin,
  AdminDetails,
  updateAdminProfile,
} from "./admin/adminController.js";
import {
  DoctorDetails,
  DoctorLogin,
  DoctorRegister,
  AllDoctorsData,
  updateDoctorProfile,
} from "./doctor/doctorController.js";
import {
  PatientDetails,
  PatientLogin,
  PatientRegister,
  updatePatientProfile,
} from "./patient/patientController.js";
import {
  BookDoctor,
  getBookings,
  updateBookingStatus,
} from "./common/bookingController.js";
export {
  AdminDetails,
  AdminLogin,
  updateAdminProfile,
  DoctorDetails,
  DoctorLogin,
  DoctorRegister,
  AllDoctorsData,
  updateDoctorProfile,
  PatientDetails,
  PatientLogin,
  PatientRegister,
  updatePatientProfile,
  BookDoctor,
  getBookings,
  updateBookingStatus,
};
