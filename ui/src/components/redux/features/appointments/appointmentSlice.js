import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    doctorId: "",
    patientId: "",
    amount: "",
    time: "",
    appointmentDate: "",
    purpose: "",
    type: "",
    symptoms: "",
    message: "",
  },
  hasBooked: false,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
    completeBooking: (state) => {
      state.hasBooked = true;
    },
  },
});

export const { updateFormData, resetFormData, completeBooking } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
