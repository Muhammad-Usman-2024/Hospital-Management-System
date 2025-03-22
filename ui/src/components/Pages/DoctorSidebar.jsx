import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useFetchDoctorDataQuery,
  useDoctorLogoutMutation,
  doctorApi,
} from "../redux/features/doctor/doctorApi";
import API_URL from "../../config/apiConfig";
import { useDispatch } from "react-redux";

const DoctorSidebar = () => {
  const { data: doctorData, isLoading: isDoctorFetching } =
    useFetchDoctorDataQuery();
  const [doctorLogout, { isLoading: isLogoutLoading }] =
    useDoctorLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/DoctorDashboard");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await doctorLogout().unwrap();
      // Reset the entire doctorApi state to clear all caches
      dispatch(doctorApi.util.resetApiState());
      toast.success("Logged out successfully!");
      navigate("/DoctorLogin", { replace: true });
    } catch (error) {
      console.error("Doctor logout failed:", error);
      toast.error(error?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div className="profile-sidebar">
      <div className="widget-profile pro-widget-content">
        <div className="profile-info-widget">
          <NavLink to="#" className="booking-doc-img">
            <img
              src={`${API_URL}/${doctorData?.data?.avatar}`}
              alt="User Image"
            />
          </NavLink>
          <div className="profile-det-info">
            <h3>{doctorData?.data?.username || "Doctor Name"}</h3>
            <div className="patient-details">
              <h5 className="mb-0">
                {doctorData?.data?.servicesAndSpecialization
                  ?.specializations?.[0] || "Specialization not available"}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-widget">
        <nav className="dashboard-menu">
          <ul className="nav flex-column">
            {[
              {
                path: "/DoctorDashboard",
                icon: "fas fa-columns",
                label: "Dashboard",
              },
              {
                path: "/Appointments",
                icon: "fas fa-calendar-check",
                label: "Appointments",
              },
              {
                path: "/Register?redirect=dashboard",
                icon: "fas fa-user-plus",
                label: "Register",
              },
              {
                path: "/DoctorPatients",
                icon: "fas fa-users",
                label: "Registered Patients",
              },
              {
                path: "/MyPatients",
                icon: "fas fa-user-injured",
                label: "My Patients",
              },
              {
                path: "/ScheduleTimings",
                icon: "fas fa-hourglass-start",
                label: "Schedule Timings",
              },
              {
                path: "/Invoices",
                icon: "fas fa-file-invoice",
                label: "Invoices",
              },
              { path: "/Reviews", icon: "fas fa-star", label: "Reviews" },
              {
                path: "/ChatDoctor",
                icon: "fas fa-comments",
                label: "Message",
              },
              {
                path: "/DoctorProfileSettings",
                icon: "fas fa-user-cog",
                label: "Profile Settings",
              },
              {
                path: "/SocialMedia",
                icon: "fas fa-share-alt",
                label: "Social Media",
              },
              {
                path: "/DoctorChangePassword",
                icon: "fas fa-lock",
                label: "Change Password",
              },
              {
                path: "/DoctorLogin",
                icon: "fas fa-sign-out-alt",
                label: "Logout",
                onClick: handleLogout,
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
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DoctorSidebar;
