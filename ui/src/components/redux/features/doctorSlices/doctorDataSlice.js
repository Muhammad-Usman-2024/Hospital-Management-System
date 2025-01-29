import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchDoctorData } from "../../thunks/thunks"; // Import the common thunk

const doctorDataSlice = createSlice({
  name: "doctorData",
  initialState: {
    isLoading: false,
    error: null,
    doctorData: {}, // To store the single doctor data
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // Optionally, show loading toast here
        // toast.info("Fetching doctor details...");
      })
      .addCase(fetchDoctorData.fulfilled, (state, action) => {
        state.doctorData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchDoctorData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Error in doctor data", state.error);
        // Optionally, show error toast here
        // toast.error(action.payload || "Failed to fetch doctor details");
      });
  },
});

export const { clearError } = doctorDataSlice.actions; // Clear error action
export default doctorDataSlice.reducer; // Export the reducer
