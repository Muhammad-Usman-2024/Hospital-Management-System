import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";

// Create a booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/doctor-booking`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch bookings by role
export const fetchBookings = createAsyncThunk(
  "booking/fetch",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/fetch-bookings`, {
        params: { userId, role },
      });
      console.log("this is the feched bookings data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update booking status
export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/bookings/${bookingId}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "doctorBooking",
  initialState: {
    bookings: [], // All bookings
    formData: {
      patientName: "",
      doctorId: "",
      patientId: "",
      amount: "",
      time: "",
      appointmentDate: "", // Add this field for the appointment date
      purpose: "",
      type: "",
      symptoms: "",
      message: "",
      email: "",
      phoneNumber: "",
    },
    doctorBooking: {
      isLoading: false,
      success: false,
      error: null,
    },
    isLoading: false, // Global loading for fetching bookings
    error: null, // Global error
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
        date: "",
        time: "",
        symptoms: "",
        message: "",
        email: "",
        phoneNumber: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.doctorBooking.isLoading = true;
        state.doctorBooking.success = false;
        state.doctorBooking.error = null;
      })
      .addCase(createBooking.fulfilled, (state, { payload }) => {
        state.bookings.push(payload.booking);
        state.doctorBooking.isLoading = false;
        state.doctorBooking.success = true;
      })
      .addCase(createBooking.rejected, (state, { payload }) => {
        state.doctorBooking.isLoading = false;
        state.doctorBooking.success = false;
        state.doctorBooking.error = payload;
      })

      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, { payload }) => {
        state.bookings = payload;
        state.isLoading = false;
      })
      .addCase(fetchBookings.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
      //   const index = state.bookings.findIndex(
      //     (b) => b._id === payload.booking._id
      //   );
      //   if (index !== -1) {
      //     state.bookings[index].status = payload.booking.status;
      //   }
      //   state.isLoading = false;
      // })
      .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
        const updatedBooking = payload.booking;
        // If the booking is canceled, remove it from the bookings list
        if (updatedBooking.status === "Cancelled") {
          state.bookings = state.bookings.filter(
            (b) => b._id !== updatedBooking._id
          );
        } else {
          // Otherwise, update the status in the existing bookings
          const index = state.bookings.findIndex(
            (b) => b._id === updatedBooking._id
          );
          if (index !== -1) {
            state.bookings[index] = updatedBooking;
          }
        }
        state.isLoading = false;
      })

      .addCase(updateBookingStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
// Export actions and reducer
export const { updateFormData, resetFormData } = bookingSlice.actions;
export default bookingSlice.reducer;
