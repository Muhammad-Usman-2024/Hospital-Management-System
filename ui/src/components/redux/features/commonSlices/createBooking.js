import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../../../../config/apiConfig";

// Thunk for Doctor Booking
export const doctorBooking = createAsyncThunk(
  "doctor/booking",
  async (formData, { rejectWithValue }) => {
    try {
      const formattedData = new FormData();

      // Append fields to FormData individually
      if (formData.patientName)
        formattedData.append("patientName", formData.patientName);
      if (formData.doctorId)
        formattedData.append("doctorId", formData.doctorId);
      if (formData.patientId)
        formattedData.append("patientId", formData.patientId);
      if (formData.patientAvatar)
        formattedData.append("patientAvatar", formData.patientAvatar);
      if (formData.amount) formattedData.append("amount", formData.amount);
      if (formData.date) formattedData.append("date", formData.date);
      if (formData.time) formattedData.append("time", formData.time);
      if (formData.purpose) formattedData.append("purpose", formData.purpose);
      if (formData.type) formattedData.append("type", formData.type);
      if (formData.symptoms)
        formattedData.append("symptoms", formData.symptoms);
      if (formData.message) formattedData.append("message", formData.message);
      if (formData.email) formattedData.append("email", formData.email);
      if (formData.phoneNumber)
        formattedData.append("phoneNumber", formData.phoneNumber);

      // Send API request to submit the booking data
      const response = await axios.post(
        `${API_URL}/api/doctor-booking`,
        formattedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      toast.success("Doctor booked successfully!");
      return response.data; // Return data for Redux state update
    } catch (error) {
      toast.error("Failed to book doctor!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Doctor Booking Slice
const bookingSlice = createSlice({
  name: "doctorBooking",
  initialState: {
    formData: {
      patientName: "",
      doctorId: "",
      patientId: "",
      patientAvatar: "",
      amount: "",
      date: "",
      time: "",
      purpose: "",
      type: "",
      symptoms: "",
      message: "",
      email: "",
      phoneNumber: "",
    },
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    // updateAvatar: (state, action) => {
    //   state.formData.patientAvatar = action.payload;
    // },
    resetFormData: (state) => {
      state.formData = {
        doctorId: "",
        patientId: "",
        patientName: "",
        patientAvatar: "",
        date: "",
        time: "",
        symptoms: "",
        message: "",
        email: "",
        phoneNumber: "",
      };
    },
    resetBookingState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorBooking.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(doctorBooking.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(doctorBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {
  updateFormData,

  resetFormData,
  resetBookingState,
} = bookingSlice.actions;
export default bookingSlice.reducer;
