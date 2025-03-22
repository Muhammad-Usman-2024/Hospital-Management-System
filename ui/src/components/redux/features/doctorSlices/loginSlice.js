import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { doctorLogin, verifyDoctorToken } from "../../thunks/thunks";

const doctorLoginSlice = createSlice({
  name: "doctorLogin",
  initialState: {
    form: {
      email: "",
      password: "",
    },
    isLoading: false,
    isAuthenticated: false, // Default to false for security
    error: null,
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = { email: "", password: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      // Token verification
      .addCase(verifyDoctorToken.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(verifyDoctorToken.rejected, (state) => {
        state.isAuthenticated = false;
      })

      // Handle doctor login
      .addCase(doctorLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.info("Logging in as Doctor...");
      })
      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Doctor Login successful!");
        state.isAuthenticated = true;
      })
      .addCase(doctorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Doctor Login failed!");
      });
  },
});

export const { setForm, resetForm } = doctorLoginSlice.actions;
export default doctorLoginSlice.reducer;
