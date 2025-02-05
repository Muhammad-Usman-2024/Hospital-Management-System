import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import API_URL from "../../config/apiConfig";

const PatientSidebar = () => {
  const { patientData = {} } = useSelector((state) => state.patientData);
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
            <img
              src={
                patientData.avatar
                  ? `${API_URL}/${patientData.avatar}`
                  : "assets/img/patients/patient.jpg"
              }
              alt="User Image"
            />
          </NavLink>
          <div className="profile-det-info">
            <h3>{patientData.name || "Richard Wilson"}</h3>
            <div className="patient-details">
              <h5>
                <i className="fas fa-birthday-cake" />{" "}
                {patientData.dob || "24 Jul 1983"}, {patientData.age || "38"}{" "}
                years
              </h5>
              <h5 className="mb-0">
                <i className="fas fa-map-marker-alt" />{" "}
                {patientData.location || "New York, USA"}
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
