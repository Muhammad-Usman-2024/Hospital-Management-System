import { createSlice } from "@reduxjs/toolkit";
import { doctorRegister } from "../../thunks/thunks";
import { toast } from "react-toastify";

const doctorRegisterSlice = createSlice({
  name: "doctorRegister",
  initialState: {
    form: {
      username: "",
      email: "",
      password: "",
    },
    isLoading: false,
    isRegistered: false,
    error: null,
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetIsRegistered: (state) => {
      state.isRegistered = false; // Reset isRegistered to false
    },
    resetForm: (state) => {
      state.form = {
        username: "",
        email: "",
        password: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Doctor Registration Pending
      .addCase(doctorRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.info("Registering doctor...");
      })
      // Doctor Registration Fulfilled
      .addCase(doctorRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegistered = true;
        toast.success("Doctor registration successful!");
      })
      // Doctor Registration Rejected
      .addCase(doctorRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Doctor registration failed!");
      });
  },
});

export const { setForm, resetForm, resetIsRegistered } =
  doctorRegisterSlice.actions;
export default doctorRegisterSlice.reducer;
