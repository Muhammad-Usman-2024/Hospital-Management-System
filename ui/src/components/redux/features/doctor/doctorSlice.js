import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerForm: {
    username: "",
    email: "",
    password: "",
  },
  loginForm: {
    email: "",
    password: "",
  },
  formData: {
    avatar: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    aboutMe: { biography: "" },
    clinicInfo: { name: "", address: "", images: [] },
    contactDetails: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    pricing: { type: "free", customPrice: null },
    servicesAndSpecialization: {
      services: [],
      specializations: [],
    },
    education: [{ degree: "", college: "", yearOfCompletion: "" }],
    experience: [{ hospitalName: "", from: "", to: "", designation: "" }],
    awards: [{ title: "", year: "" }],
    memberships: [{ name: "" }],
  },
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,

  reducers: {
    // ✅ Set Register Form
    setRegisterForm: (state, action) => {
      state.registerForm = { ...state.registerForm, ...action.payload };
    },
    resetRegisterForm: (state) => {
      state.registerForm = {
        username: "",
        email: "",
        password: "",
      };
    },

    // ✅ Set Login Form
    setLoginForm: (state, action) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
    resetLoginForm: (state) => {
      state.loginForm = {
        email: "",
        password: "",
      };
    },

    // ✅ Set update profile functionality
    updateFormData: (state, action) => {
      const { section, key, value, index } = action.payload;

      if (!section) {
        state.formData[key] = value;
      } else if (Array.isArray(state.formData[section])) {
        if (index !== null && index >= 0) {
          state.formData[section][index] = {
            ...state.formData[section][index],
            [key]: value,
          };
        } else {
          state.formData[section].push({ [key]: value });
        }
      } else {
        state.formData[section][key] = value;
      }
    },

    deleteFormData: (state, action) => {
      const { section, index } = action.payload;
      if (
        Array.isArray(state.formData[section]) &&
        state.formData[section].length > 1
      ) {
        state.formData[section].splice(index, 1);
      }
    },

    uploadImage: (state, action) => {
      const { section, key, file, index } = action.payload;
      if (key === "avatar") {
        state.formData[key] = file;
      } else if (
        section &&
        key === "images" &&
        Array.isArray(state.formData[section][key])
      ) {
        state.formData[section][key].push(file);
      }
    },

    removeImage: (state, action) => {
      const { section, key, index } = action.payload;
      if (key === "images" && Array.isArray(state.formData[section][key])) {
        state.formData[section][key].splice(index, 1);
      }
    },

    clearFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const {
  setRegisterForm,
  resetRegisterForm,
  setLoginForm,
  resetLoginForm,
  updateFormData,
  deleteFormData,
  uploadImage,
  removeImage,
  clearFormData,
} = doctorSlice.actions;
export default doctorSlice.reducer;
