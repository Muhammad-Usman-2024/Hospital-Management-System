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
  getDoctorRegisteredPatients,
  AdminLogout,
  DoctorLogout,
  PatientLogout,
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
router.post("/admin-logout", AdminLogout);
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
router.post("/doctor-logout", DoctorLogout);
router.get("/doctors-data", AllDoctorsData);
router.get("/doctor-details", doctorAuthToken, DoctorDetails);
router.put(
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
router.post("/patient-logout", PatientLogout);
router.get("/patient-details", patientAuthToken, PatientDetails);
router.put(
  "/update-patient-profile",
  patientAuthToken,
  uploadFields.fields([{ name: "avatar", maxCount: 1 }]),
  updatePatientProfile
);
router.get("/doctor-registered-patients", getDoctorRegisteredPatients);

// ----- Verify Tokens of Admin,Doctor and Patient -----
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
