import {
  AdminLogin,
  AdminLogout,
  AdminDetails,
  updateAdminProfile,
} from "./admin/adminController.js";
import {
  DoctorDetails,
  DoctorLogin,
  DoctorLogout,
  DoctorRegister,
  AllDoctorsData,
  updateDoctorProfile,
} from "./doctor/doctorController.js";
import {
  PatientDetails,
  PatientLogin,
  PatientLogout,
  PatientRegister,
  updatePatientProfile,
  getDoctorRegisteredPatients,
} from "./patient/patientController.js";
import {
  BookDoctor,
  getBookings,
  updateBookingStatus,
} from "./common/bookingController.js";
export {
  AdminDetails,
  AdminLogin,
  AdminLogout,
  updateAdminProfile,
  DoctorDetails,
  DoctorLogin,
  DoctorLogout,
  DoctorRegister,
  AllDoctorsData,
  updateDoctorProfile,
  PatientDetails,
  PatientLogin,
  PatientLogout,
  PatientRegister,
  updatePatientProfile,
  getDoctorRegisteredPatients,
  BookDoctor,
  getBookings,
  updateBookingStatus,
};
