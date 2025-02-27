import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../config/apiConfig";
import {
  useFetchPatientDataQuery,
  usePatientLogoutMutation,
  patientApi,
} from "../redux/features/patient/patientApi";
import { useDispatch } from "react-redux"; // Added for dispatching actions

const PatientSidebar = () => {
  const { data: patientData, isLoading: isPatientFetching } =
    useFetchPatientDataQuery();
  const [patientLogout, { isLoading: isLogoutLoading }] =
    usePatientLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // For invalidating cache
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/PatientDashboard"); // Default to Dashboard

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent NavLink navigation
    try {
      await patientLogout().unwrap();
      // Reset the entire patientApi state to clear all caches
      dispatch(patientApi.util.resetApiState());
      toast.success("Logged out successfully!");
      navigate("/PatientLogin", { replace: true });
    } catch (error) {
      console.error("Patient logout failed:", error);
      toast.error(error?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div className="profile-sidebar">
      {/* Profile Section */}
      <div className="widget-profile pro-widget-content">
        <div className="profile-info-widget">
          <NavLink to="#" className="booking-doc-img">
            <img
              src={
                patientData?.avatar
                  ? `${API_URL}/${patientData.avatar}`
                  : "assets/img/patients/patient.jpg"
              }
              alt="User Image"
            />
          </NavLink>
          <div className="profile-det-info">
            <h3>{patientData?.name || "Richard Wilson"}</h3>
            <div className="patient-details">
              <h5>
                <i className="fas fa-birthday-cake" />{" "}
                {patientData?.dob || "24 Jul 1983"}, {patientData?.age || "38"}{" "}
                years
              </h5>
              <h5 className="mb-0">
                <i className="fas fa-map-marker-alt" />{" "}
                {patientData?.location || "New York, USA"}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="dashboard-widget">
        <nav className="dashboard-menu">
          <ul className="nav flex-column">
            {[
              {
                path: "/PatientDashboard",
                icon: "fas fa-columns",
                label: "Dashboard",
              },
              {
                path: "/Favourites",
                icon: "fas fa-bookmark",
                label: "Favourites",
              },
              {
                path: "/Chat",
                icon: "fas fa-comments",
                label: "Message",
                unreadMsg: 23,
              },
              {
                path: "/ProfileSettings",
                icon: "fas fa-user-cog",
                label: "Profile Settings",
              },
              {
                path: "/ChangePassword",
                icon: "fas fa-lock",
                label: "Change Password",
              },
              {
                path: "/Login", // Changed from /Home to /Login
                icon: "fas fa-sign-out-alt",
                label: "Logout",
                onClick: handleLogout, // Added logout handler
              },
            ].map((item) => (
              <li className="nav-item" key={item.path || item.label}>
                <NavLink
                  to={item.path}
                  className={`sidebar-link ${
                    item.label !== "Logout" && activeLink === item.path
                      ? "active"
                      : ""
                  }`}
                  onClick={item.onClick || null}
                >
                  <i className={item.icon} />{" "}
                  <span>
                    {isLogoutLoading && item.label === "Logout"
                      ? "Logging out..."
                      : item.label}
                  </span>
                  {item.unreadMsg && (
                    <small className="unread-msg">{item.unreadMsg}</small>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PatientSidebar;
