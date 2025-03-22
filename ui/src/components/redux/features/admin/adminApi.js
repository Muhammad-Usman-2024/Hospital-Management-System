import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../../../config/apiConfig";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  tagTypes: ["Auth", "AdminData", "AdminProfile"], // Add AdminProfile tag

  endpoints: (builder) => ({
    verifyAdminToken: builder.query({
      query: () => "/api/admin-verify",
      providesTags: ["Auth"],
      transformResponse: (response) => ({
        isAuthenticated: response?.isAuthenticated || false,
      }),
    }),

    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/admin-login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "AdminData", "AdminProfile"], // Invalidate profile after login
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: "/api/admin-logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    getAdminData: builder.query({
      query: () => "/api/admin-data",
      providesTags: ["AdminData"],
      transformResponse: (response) => response.data,
    }),

    updateAdminProfile: builder.mutation({
      query: (formData) => {
        const formattedData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) formattedData.append(key, value);
        });

        return {
          url: "/api/update-admin-profile",
          method: "PUT",
          body: formattedData,
          credentials: "include",
        };
      },
      invalidatesTags: ["AdminProfile"], // Refresh profile data
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            adminApi.util.invalidateTags(["AdminProfile", "AdminData"]) // Refresh cache
          );
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      },
    }),
  }),
});

export const {
  useVerifyAdminTokenQuery,
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetAdminDataQuery,
  useUpdateAdminProfileMutation, // Export new mutation
} = adminApi;
