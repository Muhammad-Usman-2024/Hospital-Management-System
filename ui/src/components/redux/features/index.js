//admin slices imports
import adminReducer from "../features/adminSlices/loginSlice";
import adminDetailsReducer from "../features/adminSlices/detailsSlice";
import adminProfileSettings from "../features/adminSlices/profileSlice";
//doctor slices imports
import doctorRegisterReducer from "../features/doctorSlices/registerSlice";
import allDoctorsDataReducer from "../features/doctorSlices/allDoctorsDataSlice";
import doctorLoginReducer from "../features/doctorSlices/loginSlice";
import doctorProfileSettings from "../features/doctorSlices/profileSlice";
import doctorDataReducer from "../features/doctorSlices/doctorDataSlice";
//patient slices imports
import patientRegisterReducer from "../features/patientSlices/registerSlice";
import patientLoginReducer from "../features/patientSlices/loginSlice";
import patientProfileSettings from "../features/patientSlices/profileSlice";
import patientDataReducer from "../features/patientSlices/patientDataSlice";
//common
import bookingReducer from "../features/commonSlices/bookingSlice";

export {
  adminReducer,
  adminDetailsReducer,
  adminProfileSettings,
  doctorRegisterReducer,
  allDoctorsDataReducer,
  doctorLoginReducer,
  doctorProfileSettings,
  doctorDataReducer,
  patientRegisterReducer,
  patientLoginReducer,
  patientProfileSettings,
  bookingReducer,
  patientDataReducer,
};
