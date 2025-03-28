import React from "react";
<<<<<<< HEAD
=======
import DoctorSidebar from "./DoctorSidebar";
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f

const Appointments = () => {
  return (
    <>
      <div class="main-wrapper">
        <div class="breadcrumb-bar">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-md-12 col-12">
                <nav aria-label="breadcrumb" class="page-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="Home">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Appointments
                    </li>
                  </ol>
                </nav>
                <h2 class="breadcrumb-title">Appointments</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
<<<<<<< HEAD
                <div class="profile-sidebar">
                  <div class="widget-profile pro-widget-content">
                    <div class="profile-info-widget">
                      <a href="#" class="booking-doc-img">
                        <img
                          src="assets/img/doctors/doctor-thumb-02.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>Dr. Darren Elder</h3>

                        <div class="patient-details">
                          <h5 class="mb-0">
                            BDS, MDS - Oral & Maxillofacial Surgery
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dashboard-widget">
                    <nav class="dashboard-menu">
                      <ul>
                        <li>
                          <a href="DoctorDashboard">
                            <i class="fas fa-columns"></i>
                            <span>Dashboard</span>
                          </a>
                        </li>
                        <li class="active">
                          <a href="Appointments">
                            <i class="fas fa-calendar-check"></i>
                            <span>Appointments</span>
                          </a>
                        </li>
                        <li>
                          <a href="MyPatients">
                            <i class="fas fa-user-injured"></i>
                            <span>My Patients</span>
                          </a>
                        </li>
                        <li>
                          <a href="ScheduleTimings">
                            <i class="fas fa-hourglass-start"></i>
                            <span>Schedule Timings</span>
                          </a>
                        </li>
                        <li>
                          <a href="Invoices">
                            <i class="fas fa-file-invoice"></i>
                            <span>Invoices</span>
                          </a>
                        </li>
                        <li>
                          <a href="Reviews">
                            <i class="fas fa-star"></i>
                            <span>Reviews</span>
                          </a>
                        </li>
                        <li>
                          <a href="ChatDoctor">
                            <i class="fas fa-comments"></i>
                            <span>Message</span>
                            <small class="unread-msg">23</small>
                          </a>
                        </li>
                        <li>
                          <a href="DoctorProfileSettings">
                            <i class="fas fa-user-cog"></i>
                            <span>Profile Settings</span>
                          </a>
                        </li>
                        <li>
                          <a href="SocialMedia">
                            <i class="fas fa-share-alt"></i>
                            <span>Social Media</span>
                          </a>
                        </li>
                        <li>
                          <a href="DoctorChangePassword">
                            <i class="fas fa-lock"></i>
                            <span>Change Password</span>
                          </a>
                        </li>
                        <li>
                          <a href="Home">
                            <i class="fas fa-sign-out-alt"></i>
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
              </div>

              <div class="col-md-7 col-lg-8 col-xl-9">
                <div class="appointments">
                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Richard Wilson</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 14 Nov 2019, 10.00 AM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Newyork,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i> richard@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 923 782 4575
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient1.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Charlene Reed </a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 12 Nov 2019, 5.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> North
                            Carolina, United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            charlenereed@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 828 632 9170
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>
                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient2.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Travis Trimble</a>
                        </h3>

                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 11 Nov 2019, 8.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Maine, United
                            States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            travistrimble@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 207 729 9974
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>

                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient3.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Carl Kelly</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 9 Nov 2019, 9.00 AM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Newyork,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            carlkelly@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 260 724 7769
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient4.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Michelle Fairfax</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 9 Nov 2019, 1.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Indiana,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            michellefairfax@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 504 368 6874
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient5.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Gina Moore</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 8 Nov 2019, 3.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Florida,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            ginamoore@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 954 820 7887
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient6.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Elsie Gilley</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 6 Nov 2019, 9.00 AM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Kentucky,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            elsiegilley@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 315 384 4562
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>
                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient7.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Joan Gardner</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 5 Nov 2019, 12.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> California,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            joangardner@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 707 2202 603
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient8.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Daniel Griffing</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 5 Nov 2019, 7.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> New Jersey,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            danielgriffing@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 973 773 9497
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient9.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Walter Roberson</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 4 Nov 2019, 10.00 AM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Florida,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            walterroberson@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 850 358 4445
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient10.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Robert Rhodes</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 4 Nov 2019, 11.00 AM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> California,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            robertrhodes@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 858 259 5285
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>

                  <div class="appointment-list">
                    <div class="profile-info-widget">
                      <a href="PatientProfile" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient11.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>
                          <a href="PatientProfile">Harry Williams</a>
                        </h3>
                        <div class="patient-details">
                          <h5>
                            <i class="far fa-clock"></i> 3 Nov 2019, 6.00 PM
                          </h5>
                          <h5>
                            <i class="fas fa-map-marker-alt"></i> Colorado,
                            United States
                          </h5>
                          <h5>
                            <i class="fas fa-envelope"></i>{" "}
                            harrywilliams@example.com
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-phone"></i> +1 303 607 7075
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="appointment-action">
                      <a
                        href="#"
                        class="btn btn-sm bg-info-light"
                        data-toggle="modal"
                        data-target="#appt_details"
                      >
                        <i class="far fa-eye"></i> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-success-light"
                      >
                        <i class="fas fa-check"></i> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-sm bg-danger-light"
                      >
                        <i class="fas fa-times"></i> Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade custom-modal" id="appt_details">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Appointment Details</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="info-details">
                <li>
                  <div class="details-header">
                    <div class="row">
                      <div class="col-md-6">
                        <span class="title">#APT0001</span>
                        <span class="text">21 Oct 2019 10:00 AM</span>
                      </div>
                      <div class="col-md-6">
                        <div class="text-right">
                          <button
                            type="button"
                            class="btn bg-success-light btn-sm"
                            id="topup_status"
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <span class="title">Status:</span>
                  <span class="text">Completed</span>
                </li>
                <li>
                  <span class="title">Confirm Date:</span>
                  <span class="text">29 Jun 2019</span>
                </li>
                <li>
                  <span class="title">Paid Amount</span>
                  <span class="text">$450</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
