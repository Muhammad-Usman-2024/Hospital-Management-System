import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginModel from "../Pages/LoginModel";
import API_URL from "../../config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData, fetchDoctorData } from "../redux/thunks/thunks";

const Navbar = ({
  adminAuthenticated,
  doctorAuthenticated,
  patientAuthenticated,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOptions, setMenuOptions] = useState({
    img: "",
    dashboard_link: "",
    profile_link: "",
    name: "",
    role: "",
  });
  const { doctorData = {}, isLoading } = useSelector(
    (state) => state.doctorData
  );
  const { adminData, isLoading: isAdminLoading } = useSelector(
    (state) => state.adminDetails
  );

  // useEffect(() => {
  //   dispatch(fetchDoctorData());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchAdminData());
  // }, [dispatch]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
    closePopup();
  };

  useEffect(() => {
    if (patientAuthenticated) {
      // If patient is authenticated, always prioritize patient settings
      setMenuOptions({
        img: `${API_URL}/${doctorData.avatar}`,
        dashboard_link: "/PatientDashboard",
        profile_link: "/ProfileSettings",
        name: `${doctorData.username}`,
        role: "Patient",
      });
    } else if (doctorAuthenticated) {
      // Show doctor settings if no patient is authenticated
      setMenuOptions({
        img: `${API_URL}/${doctorData.avatar}`,
        dashboard_link: "/DoctorDashboard",
        profile_link: "/DoctorProfileSettings",
        name: `${doctorData.username}`,
        role: "Doctor",
      });
    } else if (adminAuthenticated) {
      // Show admin settings if no doctor or patient is authenticated
      setMenuOptions({
        img: `${API_URL}/${adminData?.avatar}`,
        dashboard_link: "/AdminDashboard",
        profile_link: "/AdminProfileSettings",
        name: `${adminData?.username}`,
        role: "Admin",
      });
    }
  }, [
    adminAuthenticated,
    doctorAuthenticated,
    patientAuthenticated,
    doctorData,
    adminData,
  ]);
  if (isLoading || isAdminLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <Link id="mobile_btn" to="#">
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </Link>
            <Link to="/Home" className="navbar-brand logo">
              <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/Home" className="menu-logo">
                <img
                  src="assets/img/logo.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <Link id="menu_close" className="menu-close" to="#">
                <i className="fas fa-times" />
              </Link>
            </div>
            <ul className="main-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="has-submenu active">
                <Link to="#">
                  Doctors <i className="fas fa-chevron-down" />
                </Link>
                <ul className="submenu">
                  <li className="active">
                    <Link to="/DoctorDashboard">Doctor Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/Appointments">Appointments</Link>
                  </li>
                  <li>
                    <Link to="/ScheduleTimings">Schedule Timing</Link>
                  </li>
                  <li>
                    <Link to="/MyPatients">Patients List</Link>
                  </li>
                  <li>
                    <Link to="/PatientProfile">Patients Profile</Link>
                  </li>
                  <li>
                    <Link to="/ChatDoctor">Chat</Link>
                  </li>
                  <li>
                    <Link to="/Invoices">Invoices</Link>
                  </li>
                  <li>
                    <Link to="/DoctorProfileSettings">Profile Settings</Link>
                  </li>
                  <li>
                    <Link to="/Reviews">Reviews</Link>
                  </li>
                  <li>
                    <Link to="/DoctorRegister?redirect=registerLink">
                      Doctor Register
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-submenu">
                <Link to="#">
                  Patients <i className="fas fa-chevron-down" />
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/Search">Search Doctor</Link>
                  </li>
                  <li>
                    <Link to="/DoctorProfile">Doctor Profile</Link>
                  </li>
                  <li>
                    <Link to="/Booking">Booking</Link>
                  </li>
                  <li>
                    <Link to="/Checkout">Checkout</Link>
                  </li>
                  <li>
                    <Link to="/BookingSuccess">Booking Success</Link>
                  </li>
                  <li>
                    <Link to="/PatientDashboard">Patient Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/Favourites">Favourites</Link>
                  </li>
                  <li>
                    <Link to="/Chat">Chat</Link>
                  </li>
                  <li>
                    <Link to="/ProfileSettings">Profile Settings</Link>
                  </li>
                  <li>
                    <Link to="/ChangePassword">Change Password</Link>
                  </li>
                </ul>
              </li>
              <li className="has-submenu">
                <Link to="#">
                  Pages <i className="fas fa-chevron-down" />
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/VoiceCall">Voice Call</Link>
                  </li>
                  <li>
                    <Link to="/VideoCall">Video Call</Link>
                  </li>
                  <li>
                    <Link to="/Search">Search Doctors</Link>
                  </li>
                  <li>
                    <Link to="/Calendar">Calendar</Link>
                  </li>
                  <li>
                    <Link to="/Components">Components</Link>
                  </li>
                  <li className="has-submenu">
                    <Link to="/Invoices">Invoices</Link>
                    <ul className="submenu">
                      <li>
                        <Link to="/Invoices">Invoices</Link>
                      </li>
                      <li>
                        <Link to="/InvoiceView">Invoice View</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/BlankPage">Starter Page</Link>
                  </li>
                  <li>
                    <Link to="/Login">Login</Link>
                  </li>
                  <li>
                    <Link to="/Register?redirect=search">Register</Link>
                  </li>
                  <li>
                    <Link to="/ForgotPassword">Forgot Password</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/AdminDashboard">Admin</Link>
              </li>
              <li className="login-link">
                <Link to="/Login">Login / Signup</Link>
              </li>
            </ul>
          </div>
          <ul className="nav header-navbar-rht">
            <li className="nav-item contact-item">
              <div className="header-contact-img">
                <i className="far fa-hospital"></i>
              </div>
              <div className="header-contact-detail">
                <p className="contact-header">Contact</p>
                <p className="contact-info-header"> +1 315 369 5943</p>
              </div>
            </li>
            {adminAuthenticated ||
            patientAuthenticated ||
            doctorAuthenticated ? (
              <li className="nav-item dropdown has-arrow logged-item">
                <a
                  href="#"
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <span className="user-img">
                    {menuOptions.img && (
                      <img
                        src={menuOptions.img}
                        alt="Profile"
                        width="31"
                        className="rounded-circle"
                      />
                    )}
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      {menuOptions.img && (
                        <img
                          src={menuOptions.img}
                          alt="Profile"
                          width="31"
                          className="rounded-circle"
                        />
                      )}
                    </div>
                    <div className="user-text">
                      <h6>{menuOptions.name}</h6>
                      <p className="text-muted mb-0">{menuOptions.role}</p>
                    </div>
                  </div>

                  {menuOptions.dashboard_link && (
                    <Link
                      className="dropdown-item"
                      to={menuOptions.dashboard_link}
                    >
                      Dashboard
                    </Link>
                  )}

                  {menuOptions.profile_link && (
                    <Link
                      className="dropdown-item"
                      to={menuOptions.profile_link}
                    >
                      Profile Settings
                    </Link>
                  )}
                  <a className="dropdown-item" href="Login">
                    Logout
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  onClick={openPopup}
                  className="btn btn-outline-primary px-4 py-2"
                >
                  Login / Signup
                </button>
                <LoginModel
                  isOpen={isOpen}
                  onClose={closePopup}
                  onSubmit={handleSubmit}
                />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
