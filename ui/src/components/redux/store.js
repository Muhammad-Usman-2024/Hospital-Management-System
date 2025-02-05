import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage
import { createTransform } from "redux-persist";
import {
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
  doctorPatientsReducer,
} from "./features/index.js";

// Custom Transform: Persist only the `isAuthenticated` field
const authTransform = createTransform(
  (inboundState, key) => {
    if (key === "admin" || key === "doctorLogin" || key === "patientLogin") {
      return { isAuthenticated: inboundState.isAuthenticated };
    }
    // if (key === "doctorRegister") {
    //   return { isRegister: inboundState.isRegister };
    // }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === "admin" || key === "doctorLogin" || key === "patientLogin") {
      return { isAuthenticated: outboundState.isAuthenticated };
    }
    // if (key === "doctorRegister") {
    //   return { isRegister: outboundState.isRegister };
    // }

    return outboundState;
  },
  {
    whitelist: ["admin", "doctorLogin", "patientLogin"],
  }
);

// Root reducer
const rootReducer = combineReducers({
  //admin
  admin: adminReducer,
  adminDetails: adminDetailsReducer,
  adminProfile: adminProfileSettings,
  //doctor
  doctorRegister: doctorRegisterReducer,
  doctorLogin: doctorLoginReducer,
  allDoctorsData: allDoctorsDataReducer,
  doctorProfile: doctorProfileSettings,
  doctorData: doctorDataReducer,
  //patient
  patientLogin: patientLoginReducer,
  patientRegister: patientRegisterReducer,
  patientProfile: patientProfileSettings,
  patientData: patientDataReducer,
  doctorPatients: doctorPatientsReducer,
  //common
  doctorBooking: bookingReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  transforms: [authTransform],
  blacklist: [
    "doctorProfile",
    "patientProfile",
    "adminProfile",
    "doctorBooking",
    "doctorData",
    "doctorBooking",
  ], // Use the custom transform
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific paths in the state
        ignoredPaths: [
          "doctorProfile.formData.avatar",
          "doctorProfile.formData.clinicInfo.images",
        ],
        // Ignore specific action types if necessary
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
export default store;
