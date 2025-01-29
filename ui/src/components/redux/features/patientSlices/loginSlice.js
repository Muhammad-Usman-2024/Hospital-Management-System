import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { patientLogin, verifyPatientToken } from "../../thunks/thunks";

const patientLoginSlice = createSlice({
  name: "patientLogin",
  initialState: {
    form: {
      email: "",
      password: "",
    },
    isLoading: false,
    isAuthenticated: false,
    error: null,
    token: null,
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
      .addCase(verifyPatientToken.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(verifyPatientToken.rejected, (state) => {
        state.isAuthenticated = false;
      })
      //patientLogin
      .addCase(patientLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.info("Logging in...");
      })
      .addCase(patientLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.patientToken;
        state.isAuthenticated = true;
        toast.success("Login successful!");
      })
      .addCase(patientLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed!");
      });
  },
});

export const { setForm, resetForm } = patientLoginSlice.actions;
export default patientLoginSlice.reducer;
