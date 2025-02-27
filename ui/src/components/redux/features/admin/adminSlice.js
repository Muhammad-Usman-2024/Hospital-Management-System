import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    form: { email: "", password: "" },
    profileFormData: {
      username: "",
      avatar: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = { email: "", password: "" };
    },
    updateProfileFormData: (state, action) => {
      const { key, value } = action.payload;
      state.profileFormData[key] = value;
    },
    clearProfileFormData: (state) => {
      state.profileFormData = {
        username: "",
        avatar: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      };
    },
  },
});

export const {
  setForm,
  resetForm,
  updateProfileFormData,
  clearProfileFormData,
} = adminSlice.actions;
export default adminSlice.reducer;
