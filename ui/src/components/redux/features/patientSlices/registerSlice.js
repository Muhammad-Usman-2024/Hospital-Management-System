import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { patientRegister } from "../../thunks/thunks";

const patientRegisterSlice = createSlice({
  name: "patientRegister",
  initialState: {
    form: {
      name: "",
      email: "",
      password: "",
    },
    isLoading: false,
    isRegistered: true,
    error: null,
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetIsRegistered: (state) => {
      state.isRegistered = false; // Reset isRegistered to false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(patientRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.info("Registering patient...");
      })
      .addCase(patientRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        toast.success("Patient registration successful!");
      })
      .addCase(patientRegister.rejected, (state, action) => {
        state.isRegistered = false;
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Patient registration failed!");
      });
  },
});

export const { setForm, resetIsRegistered } = patientRegisterSlice.actions;
export default patientRegisterSlice.reducer;
