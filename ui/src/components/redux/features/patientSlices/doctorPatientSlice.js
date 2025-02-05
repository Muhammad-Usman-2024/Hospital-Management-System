import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";

// Fetch registered patients
export const fetchDoctorRegisteredPatients = createAsyncThunk(
  "doctorPatients/fetch",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/doctor-registered-patients`,
        { params: { doctorId } }
      );
      console.log("doctor patients in thunk", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const doctorPatientsSlice = createSlice({
  name: "doctorPatients",
  initialState: {
    patients: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorRegisteredPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctorRegisteredPatients.fulfilled,
        (state, { payload }) => {
          state.patients = payload;
          console.log("doctorRegisterpatients are here", state.patients);
          state.isLoading = false;
        }
      )
      .addCase(fetchDoctorRegisteredPatients.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default doctorPatientsSlice.reducer;
