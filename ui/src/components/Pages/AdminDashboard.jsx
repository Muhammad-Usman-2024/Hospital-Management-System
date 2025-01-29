import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../config/apiConfig";
import { fetchAdminData } from "../redux/thunks/thunks";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // ----Getting admin and doctors data state from the slices----

  const {
    adminData,
    isLoading: isAdminLoading,
    error: adminError,
  } = useSelector((state) => state.adminDetails);
  const {
    doctorsData = [],
    isLoading: isDoctorLoading,
    error: doctorError,
  } = useSelector((state) => state.allDoctorsData);

  // ----useEffect function to fetch admin and doctors data get apis from thunk----

  // ------------------------Error and Loading Handling-----------------------------

  if (isAdminLoading || isDoctorLoading) {
    return <p>Loading data...</p>;
  }
  if (adminError || doctorError) {
    return <p>Error: {adminError || doctorError}</p>;
  }
  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Dashboard
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                {/* Profile Sidebar */}
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src={
                            `${API_URL}/${adminData?.avatar}` ||
                            "assets/img/admins/qamar.jpeg"
                          }
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>{adminData?.username}</h3>
                        <div className="patient-details">
                          <h5 className="mb-0">{adminData?.email}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li className="active">
                          <a href="DoctorDashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </a>
                        </li>
                        <li>
                          <a href="Appointments">
                            <i className="fas fa-calendar-check" />
                            <span>Appointments</span>
                          </a>
                        </li>
                        <li>
                          <a href="DoctorRegister?redirect=adminDashboard">
                            <i className="fas fa-calendar-check" />
                            <span>Register</span>
                          </a>
                        </li>
                        <li>
                          <a href="MyPatients">
                            <i className="fas fa-user-injured" />
                            <span>My Patients</span>
                          </a>
                        </li>
                        <li>
                          <a href="ScheduleTimings">
                            <i className="fas fa-hourglass-start" />
                            <span>Schedule Timings</span>
                          </a>
                        </li>
                        <li>
                          <a href="Invoices">
                            <i className="fas fa-file-invoice" />
                            <span>Invoices</span>
                          </a>
                        </li>
                        <li>
                          <a href="Reviews">
                            <i className="fas fa-star" />
                            <span>Reviews</span>
                          </a>
                        </li>
                        <li>
                          <a href="ChatDoctor">
                            <i className="fas fa-comments" />
                            <span>Message</span>
                            <small className="unread-msg">23</small>
                          </a>
                        </li>
                        <li>
                          <a href="DoctorProfileSettings">
                            <i className="fas fa-user-cog" />
                            <span>Profile Settings</span>
                          </a>
                        </li>
                        <li>
                          <a href="SocialMedia">
                            <i className="fas fa-share-alt" />
                            <span>Social Media</span>
                          </a>
                        </li>
                        <li>
                          <a href="DoctorChangePassword">
                            <i className="fas fa-lock" />
                            <span>Change Password</span>
                          </a>
                        </li>
                        <li>
                          <a href="Home">
                            <i className="fas fa-sign-out-alt" />
                            <span>Logout</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                {/* /Profile Sidebar */}
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card dash-card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 col-lg-4">
                            <div className="dash-widget dct-border-rht">
                              <div className="circle-bar circle-bar1">
                                <div
                                  className="circle-graph1"
                                  data-percent={75}
                                >
                                  <img
                                    src="assets/img/icon-01.png"
                                    className="img-fluid"
                                    alt="patient"
                                  />
                                </div>
                              </div>
                              <div className="dash-widget-info">
                                <h6>Total Doctors</h6>
                                <h3>1500</h3>
                                <p className="text-muted">Till Today</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4">
                            <div className="dash-widget dct-border-rht">
                              <div className="circle-bar circle-bar2">
                                <div
                                  className="circle-graph2"
                                  data-percent={65}
                                >
                                  <img
                                    src="assets/img/icon-02.png"
                                    className="img-fluid"
                                    alt="Patient"
                                  />
                                </div>
                              </div>
                              <div className="dash-widget-info">
                                <h6>Today Doctors</h6>
                                <h3>160</h3>
                                <p className="text-muted">06, Nov 2019</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4">
                            <div className="dash-widget">
                              <div className="circle-bar circle-bar3">
                                <div
                                  className="circle-graph3"
                                  data-percent={50}
                                >
                                  <img
                                    src="assets/img/icon-03.png"
                                    className="img-fluid"
                                    alt="Patient"
                                  />
                                </div>
                              </div>
                              <div className="dash-widget-info">
                                <h6>Appoinments</h6>
                                <h3>85</h3>
                                <p className="text-muted">06, Apr 2019</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="mb-4">Registered Doctors</h4>
                    <div className="appointment-tab">
                      {/* Appointment Tab */}

                      {/* /Appointment Tab */}
                      <div className="tab-content">
                        {/* Upcoming Appointment Tab */}
                        <div
                          className="tab-pane show active"
                          id="upcoming-appointments"
                        >
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Name Name</th>
                                      <th>Email</th>
                                      <th>PhoneNumber</th>
                                      <th>Specialization</th>

                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(doctorsData) &&
                                    doctorsData.length > 0 ? (
                                      doctorsData.map((data, index) => (
                                        <tr key={data._id}>
                                          <td>
                                            <h2 className="table-avatar">
                                              <a
                                                href="PatientProfile"
                                                className="avatar avatar-sm mr-2"
                                              >
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={`${API_URL}/${data.avatar}`}
                                                  alt="User Image"
                                                />
                                              </a>
                                              <a href="PatientProfile">
                                                {data.username}
                                              </a>
                                            </h2>
                                          </td>
                                          <td>{data.email}</td>
                                          <td>{data.phoneNumber}</td>
                                          <td>
                                            {
                                              data.servicesAndSpecialization
                                                .specializations[0]
                                            }
                                          </td>
                                          <td className="text-right">
                                            <div className="table-action">
                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-info-light"
                                              >
                                                <i className="far fa-eye" />{" "}
                                                View
                                              </a>

                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-danger-light"
                                              >
                                                <i className="fas fa-times" />{" "}
                                                Delete
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="5">No data available</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Upcoming Appointment Tab */}
                        {/* Today Appointment Tab */}

                        {/* /Today Appointment Tab */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default AdminDashboard;
