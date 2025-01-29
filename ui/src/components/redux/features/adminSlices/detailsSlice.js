import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAdminData } from "../../thunks/thunks";

const detailsSlice = createSlice({
  name: "adminDetails",
  initialState: {
    isLoading: false,
    error: null,
    adminData: {},
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.adminData = action.payload.data;
        console.log(state.adminData);
        state.isLoading = false;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "failed to fetch data");
      });
  },
});

export const { clearError } = detailsSlice.actions;
export default detailsSlice.reducer;
