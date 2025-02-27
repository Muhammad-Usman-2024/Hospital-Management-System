import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  adminApi,
  useAdminLogoutMutation,
  useGetAdminDataQuery,
} from "../redux/features/admin/adminApi";
import API_URL from "../../config/apiConfig";
import { useDispatch } from "react-redux"; // Added for dispatching actions

const AdminSidebar = () => {
  const { data: adminData, isLoading: isAdminFetching } =
    useGetAdminDataQuery();
  const [adminLogout, { isLoading }] = useAdminLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // For invalidating cache
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/AdminDashboard");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await adminLogout().unwrap();
      // Invalidate the VerifyAdminToken tag
      dispatch(adminApi.util.resetApiState());
      toast.success("Logged out successfully!");
      navigate("/AdminLogin", { replace: true }); // Force redirect
    } catch (error) {
      console.error("Admin logout failed:", error);
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
                adminData?.avatar
                  ? `${API_URL}/${adminData.avatar}`
                  : "assets/img/admins/qamar.jpeg"
              }
              alt="User Image"
            />
          </NavLink>
          <div className="profile-det-info">
            <h3>{adminData?.username || "Admin Name"}</h3>
            <div className="patient-details">
              <h5 className="mb-0">
                {adminData?.email || "admin@example.com"}
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
                path: "/AdminDashboard",
                icon: "fas fa-columns",
                label: "Dashboard",
              },
              {
                path: "/DoctorRegister?redirect=adminDashboard",
                icon: "fas fa-calendar-check",
                label: "Register",
              },
              {
                path: "/ChatDoctor",
                icon: "fas fa-comments",
                label: "Message",
                unreadMsg: 23,
              },
              {
                path: "/AdminProfileSettings",
                icon: "fas fa-user-cog",
                label: "Profile Settings",
              },
              {
                path: "/AdminChangePassword",
                icon: "fas fa-lock",
                label: "Change Password",
              },
              {
                path: "/AdminLogin",
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
                    {isLoading && item.label === "Logout"
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

export default AdminSidebar;
