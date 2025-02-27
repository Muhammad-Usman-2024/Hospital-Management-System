// bookingApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import API_URL from "../../../../config/apiConfig";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (formData) => ({
        url: "/api/doctor-booking",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Booking"],
    }),

    fetchBookings: builder.query({
      query: ({ userId, role }) => ({
        url: "/api/fetch-bookings",
        params: { userId, role },
      }),
      transformResponse: (response, meta, arg) => {
        const { role } = arg;
        const today = dayjs().format("YYYY-MM-DD");

        if (role === "doctor") {
          const doctorBookings = response.filter(
            (booking) => booking.status !== "Cancelled"
          );

          const todayBookings = doctorBookings.filter((booking) =>
            dayjs(booking.appointmentDate).isSame(today, "day")
          );

          const upcomingBookings = doctorBookings.filter((booking) =>
            dayjs(booking.appointmentDate).isAfter(today, "day")
          );

          const pastBookings = doctorBookings.filter((booking) =>
            dayjs(booking.appointmentDate).isBefore(today, "day")
          );

          const totalAppointments = doctorBookings.length;
          const todayPatientsCount = todayBookings.length;

          const uniquePatients = new Set(
            doctorBookings
              .filter((booking) =>
                dayjs(booking.appointmentDate).isBefore(today, "day")
              )
              .map((booking) => booking.patientId)
          );

          return {
            doctorBookings,
            todayBookings,
            pastBookings,
            upcomingBookings,
            totalAppointments,
            todayPatientsCount,
            totalPatientsTillToday: uniquePatients.size,
          };
        }

        // For patient role
        if (role === "patient") {
          return {
            patientBookings: response,
          };
        }

        //folr all patients
        if (role === "allpatients") {
          return {
            AllPatientsBookings: response,
            totalPatientsTillToday: response.length,
          };
        }
      },
      providesTags: ["Booking"],
    }),

    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/api/bookings/${bookingId}`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted(
        { bookingId, status },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            appointmentApi.util.updateQueryData(
              "fetchBookings",
              { userId: data.booking.doctorId, role: "doctor" },
              (draft) => {
                const index = draft.doctorBookings.findIndex(
                  (b) => b._id === bookingId
                );
                if (index !== -1) {
                  if (status === "Cancelled") {
                    draft.doctorBookings.splice(index, 1);
                  } else {
                    draft.doctorBookings[index] = data.booking;
                  }
                }
              }
            )
          );
        } catch (error) {
          console.error("Optimistic update failed:", error);
        }
      },
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useFetchBookingsQuery,
  useUpdateBookingStatusMutation,
} = appointmentApi;
