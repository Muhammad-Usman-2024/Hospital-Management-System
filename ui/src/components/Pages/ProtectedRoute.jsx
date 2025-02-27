import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVerifyAdminTokenQuery } from "../redux/features/admin/adminApi";
import { useVerifyDoctorTokenQuery } from "../redux/features/doctor/doctorApi";
import {
  useFetchPatientDataQuery,
  useVerifyPatientTokenQuery,
} from "../redux/features/patient/patientApi";
import { useFetchBookingsQuery } from "../redux/features/appointments/appointmentApi";

const ProtectedLayout = ({ role, redirectTo }) => {
  const location = useLocation();

  // Token verification queries
  const { data: adminTokenData, isFetching: isAdminVerifying } =
    useVerifyAdminTokenQuery();
  const { data: doctorTokenData, isFetching: isDoctorVerifying } =
    useVerifyDoctorTokenQuery();
  const { data: patientTokenData, isFetching: isPatientVerifying } =
    useVerifyPatientTokenQuery();

  // Patient-specific data (only fetch if authenticated and patient role)
  const { data: patientData, isLoading: isPatientFetching } =
    useFetchPatientDataQuery(undefined, {
      skip: role !== "patient" || !patientTokenData?.isAuthenticated,
    });
  const { data: bookingsData, isLoading: isBookingFetching } =
    useFetchBookingsQuery(
      { userId: patientData?._id, role: "patient" },
      { skip: role !== "patient" || !patientData }
    );

  const isAdminAuthenticated = adminTokenData?.isAuthenticated || false;
  const isDoctorAuthenticated = doctorTokenData?.isAuthenticated || false;
  const isPatientAuthenticated = patientTokenData?.isAuthenticated || false;

  const isFetching =
    role === "admin"
      ? isAdminVerifying
      : role === "doctor"
      ? isDoctorVerifying
      : role === "patient"
      ? isPatientVerifying
      : false;

  const isAuthenticated = useSelector((state) => {
    switch (role) {
      case "admin":
        return isAdminAuthenticated;
      case "doctor":
        return isDoctorAuthenticated;
      case "patient":
        return isPatientAuthenticated;
      default:
        return false;
    }
  });

  const patientBookings = bookingsData?.patientBookings || [];
  const appointmentHasBooked = useSelector(
    (state) => state.appointment.hasBooked
  );
  const hasBooked =
    isPatientAuthenticated && patientBookings.length > 0
      ? true
      : appointmentHasBooked;

  // Show loading state while verifying token
  if (
    isFetching ||
    (role === "patient" && (isPatientFetching || isBookingFetching))
  ) {
    return <div>Loading...</div>;
  }

  // Redirect patient to /Search if not booked yet
  if (
    role === "patient" &&
    isAuthenticated &&
    !hasBooked &&
    location.pathname === "/PatientDashboard"
  ) {
    return <Navigate to="/Search" replace />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Render protected route if authenticated
  return <Outlet />;
};

export default ProtectedLayout;
