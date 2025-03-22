import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllDoctorsData } from "../../thunks/thunks";

const allDoctorsDataSlice = createSlice({
  name: "allDoctorsData",
  initialState: {
    isLoading: false,
    error: null,
    doctorsData: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctorsData.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // toast.info("Fetching doctor details...");
      })
      .addCase(fetchAllDoctorsData.fulfilled, (state, action) => {
        state.doctorsData = action.payload.data;
        console.log("this is all doctors data slice", state.doctorsData);
        state.isLoading = false;
      })
      .addCase(fetchAllDoctorsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Error in all doctors data", state.error);
        // toast.error(message || "Failed to fetch doctor details");
      });
  },
});

export const { clearError } = allDoctorsDataSlice.actions; // Clear error action
export default allDoctorsDataSlice.reducer; // Export the reducer
