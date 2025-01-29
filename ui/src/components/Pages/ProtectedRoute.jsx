import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, redirectTo, role }) => {
  // Select the appropriate authentication state based on the role
  const isAuthenticated = useSelector((state) => {
    switch (role) {
      case "admin":
        return state.admin.isAuthenticated; // From adminSlice
      case "doctor":
        return state.doctorLogin.isAuthenticated; // From doctorSlice
      case "patient":
        return (
          state.patientLogin.isAuthenticated || state.doctorBooking.success
        ); // From patientSlice
      default:
        return false;
    }
  });

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // Render the element if authenticated
  return element;
};
export default ProtectedRoute;
