import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminProfileSettings } from "../../thunks/thunks";

const initialState = {
  formData: {
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
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "adminProfile",
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
      .addCase(adminProfileSettings.pending, (state) => {
        state.status = "pending";
        toast.info("Updating admin profile...");
      })
      .addCase(adminProfileSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Admin profile updated successfully!");
      })
      .addCase(adminProfileSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to update admin profile.");
      });
  },
});

export const { updateFormData, uploadImage, clearFormData } =
  profileSlice.actions;

export default profileSlice.reducer;
