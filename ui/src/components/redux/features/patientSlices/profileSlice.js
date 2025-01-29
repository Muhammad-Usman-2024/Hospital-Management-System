import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { patientProfileSettings } from "../../thunks/thunks";

const initialState = {
  formData: {
    name: "",
    avatar: "",
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
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "patientProfile",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { key, value } = action.payload;
      state.formData[key] = value;
    },

    clearFormData: () => initialState, // Reset to initial state
  },
  extraReducers: (builder) => {
    builder
      .addCase(patientProfileSettings.pending, (state) => {
        state.status = "pending";
        toast.info("Updating patient profile...");
      })
      .addCase(patientProfileSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Patient profile updated successfully!");
      })
      .addCase(patientProfileSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to update patient profile.");
      });
  },
});

export const { updateFormData, uploadImage, clearFormData } =
  profileSlice.actions;

export default profileSlice.reducer;
