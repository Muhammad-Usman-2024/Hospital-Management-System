import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import API_URL from "../../config/apiConfig";

const DoctorSidebar = () => {
  const { doctorData = {} } = useSelector((state) => state.doctorData);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="profile-sidebar">
      {/* Profile Section */}
      <div className="widget-profile pro-widget-content">
        <div className="profile-info-widget">
          <NavLink to="#" className="booking-doc-img">
            <img src={`${API_URL}/${doctorData.avatar}`} alt="User Image" />
          </NavLink>
          <div className="profile-det-info">
            <h3>{doctorData.username}</h3>
            <div className="patient-details">
              <h5 className="mb-0">
                {doctorData.servicesAndSpecialization?.specializations?.[0] ||
                  "Specialization not available"}
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
              { path: "/Home", icon: "fas fa-sign-out-alt", label: "Logout" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={`sidebar-link ${
                    activeLink === item.path ? "active" : ""
                  }`}
                >
                  <i className={item.icon} /> <span>{item.label}</span>
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
