import React from "react";
<<<<<<< HEAD

const MyPatients = () => {
=======
import DoctorSidebar from "./DoctorSidebar";
import { useFetchBookingsQuery } from "../redux/features/appointments/appointmentApi";
import { useFetchDoctorDataQuery } from "../redux/features/doctor/doctorApi";

const MyPatients = () => {
  const { data: singleDoctorData, isLoading: isdoctorFetching } =
    useFetchDoctorDataQuery();
  const { data: bookingsData, isLoading: isbookingFetching } =
    useFetchBookingsQuery({
      userId: singleDoctorData?.data?._id,
      role: "allpatients",
    });
  const allPatients = bookingsData?.AllPatientsBookings || [];
  console.log("these are all the patients:", allPatients);
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
                      My Patients
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">My Patients</h2>
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
<<<<<<< HEAD
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src="assets/img/doctors/doctor-thumb-02.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>Dr. Darren Elder</h3>
                        <div className="patient-details">
                          <h5 className="mb-0">
                            BDS, MDS - Oral &amp; Maxillofacial Surgery
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li>
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
                        <li className="active">
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
                          <a href="doctor-ChangePassword">
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
=======
                <DoctorSidebar />
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                {/* /Profile Sidebar */}
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="row row-grid">
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a
                              href="PatientProfile"
                              className="booking-doc-img"
                            >
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>
                                <a href="PatientProfile">Richard Wilson</a>
                              </h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> P0016
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Alabama, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 952 001 8563</span>
                            </li>
                            <li>
                              Age <span>38 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>AB+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a
                              href="PatientProfile"
                              className="booking-doc-img"
                            >
                              <img
                                src="assets/img/patients/patient1.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>
                                <a href="PatientProfile">Charlene Reed</a>
                              </h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> P0001
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" /> North
                                  Carolina, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 828 632 9170</span>
                            </li>
                            <li>
                              Age <span>29 Years, Female</span>
                            </li>
                            <li>
                              Blood Group <span>O+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient2.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Travis Trimble </h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0002
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" /> Maine,
                                  USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 207 729 9974</span>
                            </li>
                            <li>
                              Age <span>23 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>B+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient3.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Carl Kelly</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0003
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Indiana, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 260 724 7769</span>
                            </li>
                            <li>
                              Age <span>32 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>A+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient4.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Michelle Fairfax</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0004
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Indiana, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 504 368 6874</span>
                            </li>
                            <li>
                              Age <span>25 Years, Female</span>
                            </li>
                            <li>
                              Blood Group <span>B+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient5.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Gina Moore</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0005
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Florida, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 954 820 7887</span>
                            </li>
                            <li>
                              Age <span>25 Years, Female</span>
                            </li>
                            <li>
                              Blood Group <span>AB-</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient6.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Elsie Gilley</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0006
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Kentucky, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 315 384 4562</span>
                            </li>
                            <li>
                              Age <span>14 Years, Female</span>
                            </li>
                            <li>
                              Blood Group <span>O-</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient7.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Joan Gardner</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0007
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  California, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 707 2202 603</span>
                            </li>
                            <li>
                              Age <span>25 Years, Female</span>
                            </li>
                            <li>
                              Blood Group <span>A-</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient8.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Daniel Griffing</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0007
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" /> New
                                  Jersey, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 973 773 9497</span>
                            </li>
                            <li>
                              Age <span>28 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>O+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient9.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Walter Roberson</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0009
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Florida, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 850 358 4445</span>
                            </li>
                            <li>
                              Age <span>28 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>A+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient10.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Robert Rhodes</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0010
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  California, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 858 259 5285</span>
                            </li>
                            <li>
                              Age <span>19 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>B+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                      <div className="card-body">
                        <div className="pro-widget-content">
                          <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                              <img
                                src="assets/img/patients/patient11.jpg"
                                alt="User Image"
                              />
                            </a>
                            <div className="profile-det-info">
                              <h3>Harry Williams</h3>
                              <div className="patient-details">
                                <h5>
                                  <b>Patient ID :</b> PT0011
                                </h5>
                                <h5 className="mb-0">
                                  <i className="fas fa-map-marker-alt" />{" "}
                                  Colorado, USA
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="patient-info">
                          <ul>
                            <li>
                              Phone <span>+1 303 607 7075</span>
                            </li>
                            <li>
                              Age <span>9 Years, Male</span>
                            </li>
                            <li>
                              Blood Group <span>A-</span>
                            </li>
                          </ul>
                        </div>
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
      {/* /Main Wrapper */}
    </>
  );
};

export default MyPatients;
