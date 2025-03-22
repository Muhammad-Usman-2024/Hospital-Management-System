import express from "express";
import {
  AdminDetails,
  AdminLogin,
  DoctorDetails,
  DoctorLogin,
  DoctorRegister,
  AllDoctorsData,
  PatientDetails,
  PatientLogin,
  PatientRegister,
  updateDoctorProfile,
  updatePatientProfile,
  updateAdminProfile,
  BookDoctor,
  getBookings,
  updateBookingStatus,
<<<<<<< HEAD
=======
  getDoctorRegisteredPatients,
  AdminLogout,
  DoctorLogout,
  PatientLogout,
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
} from "../controllers/index.js";
import {
  adminAuthToken,
  doctorAuthToken,
  patientAuthToken,
  uploadFields,
} from "../middlewares/index.js";
const router = express.Router();

// ---- Admin all routes including Post,Get,Put ----
router.post("/admin-login", AdminLogin);
<<<<<<< HEAD
=======
router.post("/admin-logout", AdminLogout);
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
router.get("/admin-data", adminAuthToken, AdminDetails);
router.put(
  "/update-admin-profile",
  adminAuthToken,
  uploadFields.fields([{ name: "avatar", maxCount: 1 }]),
  updateAdminProfile
);

// ---- Doctor all routes including Post,Get,Put ----
router.post("/doctor-register", DoctorRegister);
router.post("/doctor-login", DoctorLogin);
<<<<<<< HEAD
router.get("/doctors-data", AllDoctorsData);
router.get("/doctor-details", doctorAuthToken, DoctorDetails);
router.patch(
=======
router.post("/doctor-logout", DoctorLogout);
router.get("/doctors-data", AllDoctorsData);
router.get("/doctor-details", doctorAuthToken, DoctorDetails);
router.put(
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
  "/update-doctor-profile",
  doctorAuthToken,
  uploadFields.fields([
    { name: "avatar", maxCount: 1 },
    { name: "clinicInfo.images" },
  ]),
  updateDoctorProfile
);

// ---- Patient all routes including Post,Get,Put ----
router.post("/patient-register", PatientRegister);
router.post("/patient-login", PatientLogin);
<<<<<<< HEAD
=======
router.post("/patient-logout", PatientLogout);
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
router.get("/patient-details", patientAuthToken, PatientDetails);
router.put(
  "/update-patient-profile",
  patientAuthToken,
  uploadFields.fields([{ name: "avatar", maxCount: 1 }]),
  updatePatientProfile
);
<<<<<<< HEAD

// ---- Verify Tokens of Admin,Doctor and Patient ----
=======
router.get("/doctor-registered-patients", getDoctorRegisteredPatients);

// ----- Verify Tokens of Admin,Doctor and Patient -----
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
router.get("/admin-verify", adminAuthToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});
router.get("/doctor-verify", doctorAuthToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});
router.get("/patient-verify", patientAuthToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

// --------------------------------------------All other routes------------------------------------------------

// ----Doctor booking route----
router.post("/doctor-booking", BookDoctor);
router.get("/fetch-bookings", getBookings);
router.patch("/bookings/:bookingId", updateBookingStatus);

export default router;
