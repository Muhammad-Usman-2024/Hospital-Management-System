import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Login
  loginForm: { email: "", password: "" },
  isAuthenticated: false,

  // Registration
  registerForm: { name: "", email: "", password: "", doctorId: null },
  isRegistered: false,

  // Profile
  profileForm: {
    name: "",
    avatar: null,
    dateOfBirth: "",
    bloodGroup: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    // Login
    setLoginForm: (state, action) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
    resetLoginForm: (state) => {
      state.loginForm = initialState.loginForm;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    // Registration
    setRegisterForm: (state, action) => {
      state.registerForm = { ...state.registerForm, ...action.payload };
    },
    setDoctorId: (state, action) => {
      state.registerForm.doctorId = action.payload;
    },
    resetIsRegistered: (state, action) => {
      state.isRegistered = action.payload;
    },

    // Profile
    updateProfileFormData: (state, action) => {
      const { key, value } = action.payload;
      state.profileForm[key] = value;
    },
    clearProfileFormData: (state) => {
      state.profileForm = initialState.profileForm;
    },
  },
});

export const {
  setLoginForm,
  resetLoginForm,
  setAuthenticated,
  setRegisterForm,
  setDoctorId,
  resetIsRegistered,
  updateProfileFormData,
  clearProfileFormData,
} = patientSlice.actions;

export default patientSlice.reducer;
