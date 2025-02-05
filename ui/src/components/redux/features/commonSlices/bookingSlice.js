// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import API_URL from "../../../../config/apiConfig";

// // Create a booking
// export const createBooking = createAsyncThunk(
//   "booking/create",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/api/doctor-booking`,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch bookings by role
// export const fetchBookings = createAsyncThunk(
//   "booking/fetch",
//   async ({ userId, role }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/api/fetch-bookings`, {
//         params: { userId, role },
//       });
//       console.log("this is the feched bookings data", response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Update booking status
// export const updateBookingStatus = createAsyncThunk(
//   "booking/updateStatus",
//   async ({ bookingId, status }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(
//         `${API_URL}/api/bookings/${bookingId}`,
//         {
//           status,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const bookingSlice = createSlice({
//   name: "doctorBooking",
//   initialState: {
//     doctorBookings: [], // Bookings for the doctor
//     patientBookings: [], // Bookings for the patient
//     formData: {
//       patientName: "",
//       doctorId: "",
//       patientId: "",
//       amount: "",
//       time: "",
//       appointmentDate: "",
//       purpose: "",
//       type: "",
//       symptoms: "",
//       message: "",
//       email: "",
//       phoneNumber: "",
//     },
//     doctorBooking: {
//       isLoading: false,
//       success: false,
//       error: null,
//     },
//     isLoading: false, // Global loading for fetching bookings
//     error: null, // Global error
//   },
//   reducers: {
//     updateFormData: (state, action) => {
//       const { name, value } = action.payload;
//       state.formData[name] = value;
//     },
//     resetFormData: (state) => {
//       state.formData = {
//         doctorId: "",
//         patientId: "",
//         patientName: "",
//         date: "",
//         time: "",
//         symptoms: "",
//         message: "",
//         email: "",
//         phoneNumber: "",
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Booking
//       .addCase(createBooking.pending, (state) => {
//         state.doctorBooking.isLoading = true;
//         state.doctorBooking.success = false;
//         state.doctorBooking.error = null;
//       })
//       .addCase(createBooking.fulfilled, (state, { payload }) => {
//         state.patientBookings.push(payload.booking); // Assume patient creates the booking
//         state.doctorBooking.isLoading = false;
//         state.doctorBooking.success = true;
//       })
//       .addCase(createBooking.rejected, (state, { payload }) => {
//         state.doctorBooking.isLoading = false;
//         state.doctorBooking.success = false;
//         state.doctorBooking.error = payload;
//       })

//       // Fetch Bookings
//       .addCase(fetchBookings.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchBookings.fulfilled, (state, { payload, meta }) => {
//         const { role } = meta.arg; // Use the role to determine which state to update
//         if (role === "doctor") {
//           console.log("this is payload", payload);
//           state.doctorBookings = payload.filter(
//             (booking) => booking.status !== "Cancelled" // Ensure canceled bookings are excluded for doctors
//           );
//           console.log("doctor bookings bro", state.doctorBookings);
//         } else if (role === "patient") {
//           state.patientBookings = payload; // Patients see all bookings
//         }
//         state.isLoading = false;
//       })
//       .addCase(fetchBookings.rejected, (state, { payload }) => {
//         state.isLoading = false;
//         state.error = payload;
//       })

//       // Update Booking Status
//       .addCase(updateBookingStatus.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
//         const updatedBooking = payload.booking;
//         console.log("this is the payload in updatebooking", payload);

//         // Update doctorBookings
//         const doctorIndex = state.doctorBookings.findIndex(
//           (b) => b._id === updatedBooking._id
//         );
//         if (doctorIndex !== -1) {
//           if (updatedBooking.status === "Cancelled") {
//             state.doctorBookings.splice(doctorIndex, 1); // Remove canceled booking for the doctor
//           } else {
//             state.doctorBookings[doctorIndex] = updatedBooking; // Update the booking
//           }
//         }

//         // Update patientBookings
//         const patientIndex = state.patientBookings.findIndex(
//           (b) => b._id === updatedBooking._id
//         );
//         if (patientIndex !== -1) {
//           state.patientBookings[patientIndex] = updatedBooking; // Always update for the patient
//         }

//         state.isLoading = false;
//       })
//       .addCase(updateBookingStatus.rejected, (state, { payload }) => {
//         state.isLoading = false;
//         state.error = payload;
//       });
//   },
// });

// // Export actions and reducer
// export const { updateFormData, resetFormData } = bookingSlice.actions;
// export default bookingSlice.reducer;

// // const bookingSlice = createSlice({
// //   name: "doctorBooking",
// //   initialState: {
// //     bookings: [], // All bookings
// //     formData: {
// //       patientName: "",
// //       doctorId: "",
// //       patientId: "",
// //       amount: "",
// //       time: "",
// //       appointmentDate: "", // Add this field for the appointment date
// //       purpose: "",
// //       type: "",
// //       symptoms: "",
// //       message: "",
// //       email: "",
// //       phoneNumber: "",
// //     },
// //     doctorBooking: {
// //       isLoading: false,
// //       success: false,
// //       error: null,
// //     },
// //     isLoading: false, // Global loading for fetching bookings
// //     error: null, // Global error
// //   },
// //   reducers: {
// //     updateFormData: (state, action) => {
// //       const { name, value } = action.payload;
// //       state.formData[name] = value;
// //     },
// //     // updateAvatar: (state, action) => {
// //     //   state.formData.patientAvatar = action.payload;
// //     // },
// //     resetFormData: (state) => {
// //       state.formData = {
// //         doctorId: "",
// //         patientId: "",
// //         patientName: "",
// //         date: "",
// //         time: "",
// //         symptoms: "",
// //         message: "",
// //         email: "",
// //         phoneNumber: "",
// //       };
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Create Booking
// //       .addCase(createBooking.pending, (state) => {
// //         state.doctorBooking.isLoading = true;
// //         state.doctorBooking.success = false;
// //         state.doctorBooking.error = null;
// //       })
// //       .addCase(createBooking.fulfilled, (state, { payload }) => {
// //         state.bookings.push(payload.booking);
// //         state.doctorBooking.isLoading = false;
// //         state.doctorBooking.success = true;
// //       })
// //       .addCase(createBooking.rejected, (state, { payload }) => {
// //         state.doctorBooking.isLoading = false;
// //         state.doctorBooking.success = false;
// //         state.doctorBooking.error = payload;
// //       })

// //       // Fetch Bookings
// //       .addCase(fetchBookings.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchBookings.fulfilled, (state, { payload }) => {
// //         state.bookings = payload;
// //         state.isLoading = false;
// //       })
// //       .addCase(fetchBookings.rejected, (state, { payload }) => {
// //         state.isLoading = false;
// //         state.error = payload;
// //       })

// //       // Update Booking Status
// //       .addCase(updateBookingStatus.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })

// //       .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
// //         const updatedBooking = payload.booking;
// //         // If the booking is canceled, remove it from the bookings list
// //         if (updatedBooking.status === "Cancelled") {
// //           state.bookings = state.bookings.filter(
// //             (b) => b._id !== updatedBooking._id
// //           );
// //         } else {
// //           // Otherwise, update the status in the existing bookings
// //           const index = state.bookings.findIndex(
// //             (b) => b._id === updatedBooking._id
// //           );
// //           if (index !== -1) {
// //             state.bookings[index] = updatedBooking;
// //           }
// //         }
// //         state.isLoading = false;
// //       })

// //       .addCase(updateBookingStatus.rejected, (state, { payload }) => {
// //         state.isLoading = false;
// //         state.error = payload;
// //       });
// //   },
// // });
// // // Export actions and reducer
// // export const { updateFormData, resetFormData } = bookingSlice.actions;
// // export default bookingSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";

// 🌟 Create a booking
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

// 🌟 Fetch bookings
export const fetchBookings = createAsyncThunk(
  "booking/fetch",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/fetch-bookings`, {
        params: { userId, role },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🌟 Update booking status
export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/bookings/${bookingId}`,
        { status }
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
    doctorBookings: [],
    patientBookings: [],
    formData: {
      patientName: "",
      doctorId: "",
      patientId: "",
      amount: "",
      time: "",
      appointmentDate: "",
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
    isLoading: false,
    error: null,
  },
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetFormData: (state) => {
      state.formData = {
        doctorId: "",
        patientId: "",
        patientName: "",
        appointmentDate: "",
        time: "",
        symptoms: "",
        message: "",
        email: "",
        phoneNumber: "",
      };
    },
    // 🌟 Reset `success` state after handling it
    resetBookingSuccess: (state) => {
      state.doctorBooking.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🌟 Create Booking
      .addCase(createBooking.pending, (state) => {
        state.doctorBooking.isLoading = true;
        state.doctorBooking.success = false;
        state.doctorBooking.error = null;
      })
      .addCase(createBooking.fulfilled, (state, { payload }) => {
        state.patientBookings.push(payload.booking);
        state.doctorBooking.isLoading = false;
        state.doctorBooking.success = true; // ✅ Set success to true when booking is created
      })
      .addCase(createBooking.rejected, (state, { payload }) => {
        state.doctorBooking.isLoading = false;
        state.doctorBooking.success = false;
        state.doctorBooking.error = payload;
      })

      // 🌟 Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, { payload, meta }) => {
        const { role } = meta.arg;
        if (role === "doctor") {
          state.doctorBookings = payload.filter(
            (booking) => booking.status !== "Cancelled"
          );
        } else if (role === "patient") {
          state.patientBookings = payload;
        }
        state.isLoading = false;
      })
      .addCase(fetchBookings.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // 🌟 Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
        const updatedBooking = payload.booking;
        const doctorIndex = state.doctorBookings.findIndex(
          (b) => b._id === updatedBooking._id
        );
        if (doctorIndex !== -1) {
          if (updatedBooking.status === "Cancelled") {
            state.doctorBookings.splice(doctorIndex, 1);
          } else {
            state.doctorBookings[doctorIndex] = updatedBooking;
          }
        }
        const patientIndex = state.patientBookings.findIndex(
          (b) => b._id === updatedBooking._id
        );
        if (patientIndex !== -1) {
          state.patientBookings[patientIndex] = updatedBooking;
        }
        state.isLoading = false;
      })
      .addCase(updateBookingStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

// 🌟 Export actions and reducer
export const { updateFormData, resetFormData, resetBookingSuccess } =
  bookingSlice.actions;
export default bookingSlice.reducer;
