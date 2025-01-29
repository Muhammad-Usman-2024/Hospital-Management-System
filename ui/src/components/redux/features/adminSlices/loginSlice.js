import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { adminLogin, verifyAdminToken } from "../../thunks/thunks";
const loginSlice = createSlice({
  name: "admin",
  initialState: {
    form: { email: "", password: "" },
    isLoading: false,
    isAuthenticated: false,
    error: null,
    verifyLoading: false,
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = { email: "", password: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      // Token verification
      .addCase(verifyAdminToken.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(verifyAdminToken.rejected, (state) => {
        state.isAuthenticated = false;
      })

      // Admin login
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.info("Logging in...");
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        toast.success("Login successful!");
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed!");
      });
  },
});

export const { setForm, resetForm } = loginSlice.actions;
export default loginSlice.reducer;
