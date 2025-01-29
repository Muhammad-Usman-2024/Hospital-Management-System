import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchPatientData } from "../../thunks/thunks"; // Import the common thunk

const patientDataSlice = createSlice({
  name: "patientData",
  initialState: {
    isLoading: false,
    error: null,
    patientData: {}, // To store the single patient data
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // Optionally, show loading toast here
        // toast.info("Fetching patient details...");
      })
      .addCase(fetchPatientData.fulfilled, (state, action) => {
        state.patientData = action.payload.data;
        console.log(
          "this is the patient data in the patientDetials slice",
          state.patientData
        );
        state.isLoading = false;
      })
      .addCase(fetchPatientData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Error in patient data", state.error);
        // Optionally, show error toast here
        // toast.error(action.payload || "Failed to fetch patient details");
      });
  },
});

export const { clearError } = patientDataSlice.actions; // Clear error action
export default patientDataSlice.reducer; // Export the reducer
