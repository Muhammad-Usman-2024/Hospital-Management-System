import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import API_URL from "../../../../config/apiConfig";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth", "Patient", "Patients", "PatientProfile", "PatientData"],
  endpoints: (builder) => ({
    // Doctor's registered patients
    fetchDoctorRegisteredPatients: builder.query({
      query: (doctorId) => ({
        url: "/api/doctor-registered-patients",
        params: { doctorId },
      }),
      providesTags: ["Patients"],
      transformResponse: (response) => response,
    }),

    // Patient login
    patientLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/patient-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Patient", "PatientProfile", "PatientData"],
    }),

    patientLogout: builder.mutation({
      query: () => ({
        url: "/api/patient-logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    //  Token Verification
    verifyPatientToken: builder.query({
      query: () => "/api/patient-verify",
      providesTags: ["Auth"],
      transformResponse: (response) => ({
        isAuthenticated: response?.isAuthenticated || false,
      }),
    }),

    // Patient details

    fetchPatientData: builder.query({
      query: () => "/api/patient-details",
      providesTags: ["PatientData"],
      transformResponse: (response) => response.data,
    }),

    // Update patient profile
    patientProfileSettings: builder.mutation({
      query: (formData) => {
        const formattedData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) formattedData.append(key, value);
        });
        return {
          url: "/api/update-patient-profile",
          method: "PUT",
          body: formattedData,
          credentials: "include",
        };
      },
      invalidatesTags: ["PatientProfile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            patientApi.util.invalidateTags(["PatientProfile", "PatientData"])
          );
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },
    }),

    patientRegister: builder.mutation({
      query: (payload) => {
        // Only include doctorId if provided
        const finalPayload = {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          ...(payload.doctorId && { doctorId: payload.doctorId }),
        };

        return {
          url: "/api/patient-register",
          method: "POST",
          body: finalPayload,
        };
      },
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const {
  useFetchDoctorRegisteredPatientsQuery,
  usePatientLoginMutation,
  usePatientLogoutMutation,
  useVerifyPatientTokenQuery,
  useFetchPatientDataQuery,
  usePatientProfileSettingsMutation,
  usePatientRegisterMutation,
} = patientApi;
