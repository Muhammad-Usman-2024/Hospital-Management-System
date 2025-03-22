import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../../../config/apiConfig";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  // Added extra tag types for profile and data invalidation
  tagTypes: ["Auth", "Doctor", "Doctors", "DoctorProfile", "DoctorData"],

  endpoints: (builder) => ({
    // ✅ Doctor Registration
    doctorRegister: builder.mutation({
      query: (credentials) => ({
        url: "/api/doctor-register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Doctor", "Doctors"],
    }),

    // ✅ Doctor Login
    doctorLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/doctor-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Doctor", "DoctorProfile", "DoctorData"],
    }),

    doctorLogout: builder.mutation({
      query: () => ({
        url: "/api/doctor-logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    // ✅ Token Verification
    verifyDoctorToken: builder.query({
      query: () => "/api/doctor-verify",
      providesTags: ["Auth"],
      transformResponse: (response) => ({
        isAuthenticated: response?.isAuthenticated || false,
      }),
    }),

    // ✅ Fetch Single Doctor Data
    fetchDoctorData: builder.query({
      query: () => "/api/doctor-details",
      providesTags: ["DoctorData"],
    }),

    // ✅ Fetch All Doctors Data
    fetchAllDoctorsData: builder.query({
      query: () => "/api/doctors-data",
      providesTags: ["Doctors"],
    }),

    // ✅ Update Doctor Profile Settings (with onQueryStarted)
    updateDoctorProfile: builder.mutation({
      query: (formData) => {
        const formattedData = new FormData();

        for (const key in formData) {
          if (key === "avatar" && formData[key]) {
            formattedData.append("avatar", formData[key]);
          } else if (key === "clinicInfo" && formData[key]?.images) {
            formData[key].images.forEach((image) => {
              formattedData.append("clinicInfo.images", image);
            });

            const { images, ...restClinicInfo } = formData[key];
            formattedData.append("clinicInfo", JSON.stringify(restClinicInfo));
          } else if (Array.isArray(formData[key])) {
            formattedData.append(key, JSON.stringify(formData[key]));
          } else if (typeof formData[key] === "object") {
            for (const subKey in formData[key]) {
              formattedData.append(`${key}.${subKey}`, formData[key][subKey]);
            }
          } else {
            formattedData.append(key, formData[key]);
          }
        }

        return {
          url: "/api/update-doctor-profile",
          method: "PUT",
          body: formattedData,
          credentials: "include",
        };
      },
      // Invalidate the DoctorProfile tag so that any cached profile data is refreshed.
      invalidatesTags: ["DoctorProfile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Invalidate both DoctorProfile and DoctorData caches to ensure fresh data.
          dispatch(
            doctorApi.util.invalidateTags(["DoctorProfile", "DoctorData"])
          );
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },
    }),
  }),
});

export const {
  useDoctorRegisterMutation,
  useDoctorLoginMutation,
  useDoctorLogoutMutation,
  useVerifyDoctorTokenQuery,
  useFetchDoctorDataQuery,
  useFetchAllDoctorsDataQuery,
  useUpdateDoctorProfileMutation,
} = doctorApi;
