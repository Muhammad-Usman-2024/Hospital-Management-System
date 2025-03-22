<<<<<<< HEAD
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import API_URL from "../../config/apiConfig";
import { fetchDoctorData } from "../redux/thunks/thunks";
import {
  fetchBookings,
  updateBookingStatus,
} from "../redux/features/commonSlices/bookingSlice";
import customParseFormat from "dayjs/plugin/customParseFormat";
=======
import React, { useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import API_URL from "../../config/apiConfig";
import DoctorSidebar from "./DoctorSidebar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  useFetchAllDoctorsDataQuery,
  useFetchDoctorDataQuery,
} from "../redux/features/doctor/doctorApi";
import {
  useFetchBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../redux/features/appointments/appointmentApi";
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f

dayjs.extend(customParseFormat);

const DoctorDashboard = () => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.doctorBooking);

  const { doctorData = {}, isLoading: doctorIsLoading } = useSelector(
    (state) => state.doctorData
  );
  useEffect(() => {
    if (doctorData && doctorData._id) {
      dispatch(fetchBookings({ userId: doctorData._id, role: "doctor" }));
    }
  }, [dispatch, doctorData._id]);
  console.log(bookings);

  // Define the handleBookingStatus function
  const handleBookingStatus = async (bookingId, status) => {
    try {
      const response = await dispatch(
        updateBookingStatus({ bookingId, status })
      ).unwrap();
      if (status == "Cancelled") {
        useEffect(() => {
          if (doctorData && doctorData._id) {
            dispatch(fetchBookings({ userId: doctorData._id, role: "doctor" }));
          }
        }, [dispatch, doctorData._id]);
      }
      alert(`Booking has been ${status.toLowerCase()} successfully.`);
      console.log("Updated Booking:", response.booking);
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking status. Please try again.");
=======
  const { data: singleDoctorData, isLoading: isdoctorFetching } =
    useFetchDoctorDataQuery();
  const { data: allDoctorsData, isLoading: allDoctorsLoading } =
    useFetchAllDoctorsDataQuery();
  const doctorData = singleDoctorData?.data;
  console.log("this is single doctor data in doctor dashboard:", doctorData);
  console.log(
    "this is all doctors data in the doctor dashboard:",
    allDoctorsData?.data
  );

  const [updateStatus] = useUpdateBookingStatusMutation();

  // 🌟 Fetch Bookings
  const { data: bookingsData, isLoading: isbookingFetching } =
    useFetchBookingsQuery({
      userId: doctorData?._id,
      role: "doctor",
    });
  const { data: allbookingsData } = useFetchBookingsQuery({
    userId: doctorData?._id,
    role: "allpatients",
  });
  const totalPatientsTillToday = allbookingsData?.totalPatientsTillToday || 0;
  // 🌟 Destructure booking data
  const {
    doctorBookings = [],
    todayBookings = [],
    upcomingBookings = [],
    pastBookings = [],
    totalAppointments = 0,
    todayPatientsCount = 0,
  } = bookingsData || {};
  console.log(
    "this is the data in the doctordashboard and of bookings",
    bookingsData
  );
  console.log("Fetching bookings for:", {
    userId: doctorData?._id,
    role: "doctor",
  });
  // 🌟 Handle Booking Status Update
  const handleBookingStatus = async (
    bookingId,
    patientName,
    patientEmail,
    status
  ) => {
    try {
      await updateStatus({ bookingId, status }).unwrap();

      // Send email
      if (doctorData.email) {
        await emailjs.send(
          "service_urux88x",
          "template_zbed7di",
          {
            from_name: doctorData.username,
            to_name: patientName,
            from_email: doctorData.email,
            to_email: patientEmail,
            message: `Your booking status is now: ${status}`,
          },
          "ehHcxWe090MKl-GFY"
        );
        toast.success("Status email sent.");
      }

      toast.success(`Booking ${status.toLowerCase()} successfully.`);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.data?.message || "Update failed.");
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
    }
  };

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
<<<<<<< HEAD
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src={`${API_URL}/${doctorData.avatar}`}
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>{doctorData.username}</h3>
                        <div className="patient-details">
                          <h5 className="mb-0">
                            {doctorData.servicesAndSpecialization
                              ?.specializations?.[0] ||
                              "Specialization not available"}
                          </h5>
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
                          <a href="Register?redirect=dashboard">
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
=======
                <DoctorSidebar />
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
                                <h6>Total Patient</h6>
<<<<<<< HEAD
                                <h3>1500</h3>
=======
                                <h3>{totalPatientsTillToday}</h3>
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
                                <h6>Today Patient</h6>
<<<<<<< HEAD
                                <h3>160</h3>
                                <p className="text-muted">06, Nov 2019</p>
=======
                                <h3>{todayBookings.length}</h3>
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
<<<<<<< HEAD
                                <h3>85</h3>
                                <p className="text-muted">06, Apr 2019</p>
=======
                                <h3>{doctorBookings.length}</h3>
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
                    <h4 className="mb-4">Patient Appoinment</h4>
                    <div className="appointment-tab">
                      {/* Appointment Tab */}
                      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#upcoming-appointments"
                            data-toggle="tab"
                          >
                            Upcoming
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#today-appointments"
                            data-toggle="tab"
                          >
                            Today
                          </a>
                        </li>
<<<<<<< HEAD
                      </ul>
                      {/* /Appointment Tab */}
                      <div className="tab-content">
                        {/* Upcoming Appointment Tab */}
                        {/* <div
=======
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#prev-appointments"
                            data-toggle="tab"
                          >
                            Past Bookings
                          </a>
                        </li>
                      </ul>
                      {/* /Appointment Tab */}
                      <div className="tab-content">
                        {/* {doctorBookings && (
                          
                        )} */}
                        <div
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          className="tab-pane show active"
                          id="upcoming-appointments"
                        >
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Patient Name</th>
                                      <th>Appt Date</th>
                                      <th>Purpose</th>
                                      <th>Type</th>
                                      <th className="text-center">
                                        Paid Amount
                                      </th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
<<<<<<< HEAD
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Richard Wilson <span>#PT0016</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        11 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          10.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$150</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient1.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Charlene Reed <span>#PT0001</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        3 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          11.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$200</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient2.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Travis Trimble <span>#PT0002</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        1 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          1.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$75</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient3.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Carl Kelly <span>#PT0003</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        30 Oct 2019{" "}
                                        <span className="d-block text-info">
                                          9.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$100</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient4.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Michelle Fairfax{" "}
                                            <span>#PT0004</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        28 Oct 2019{" "}
                                        <span className="d-block text-info">
                                          6.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$350</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient5.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Gina Moore <span>#PT0005</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        27 Oct 2019{" "}
                                        <span className="d-block text-info">
                                          8.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$250</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
=======
                                    {upcomingBookings.length > 0 ? (
                                      upcomingBookings?.map((booking) => (
                                        <tr key={booking._id}>
                                          <td>
                                            <h2 className="table-avatar">
                                              <a
                                                href={`PatientProfile`}
                                                className="avatar avatar-sm mr-2"
                                              >
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={`${API_URL}/${booking.patientId.avatar}
                                                      `} // Ensure patient has avatar URL
                                                  alt="User Image"
                                                />
                                              </a>
                                              <a href={`PatientProfile}`}>
                                                {booking.patientId.name}
                                                <span>{booking.customId}</span>
                                              </a>
                                            </h2>
                                          </td>
                                          <td>
                                            {dayjs(
                                              booking.appointmentDate
                                            ).format("DD MMM YYYY")}
                                            <span className="d-block text-info">
                                              {dayjs(
                                                booking.time,
                                                "HH:mm"
                                              ).format("hh:mm A")}
                                            </span>
                                          </td>
                                          <td>{booking.purpose}</td>
                                          <td>{booking.type}</td>
                                          <td className="text-center">
                                            {booking.amount}
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
                                                className="btn btn-sm bg-success-light"
                                                onClick={() =>
                                                  handleBookingStatus(
                                                    booking._id,
                                                    booking.patientId.name,
                                                    booking.patientId.email,
                                                    "Confirm"
                                                  )
                                                }
                                              >
                                                <i className="fas fa-check" />
                                                {booking.status == "Confirm"
                                                  ? "Accepted"
                                                  : "Accept"}
                                              </a>

                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-danger-light"
                                                onClick={() =>
                                                  handleBookingStatus(
                                                    booking._id,
                                                    booking.patientId.name,
                                                    booking.patientId.email,
                                                    "Cancelled"
                                                  )
                                                }
                                              >
                                                <i className="fas fa-trash" />
                                                Cancel
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="6" className="text-center">
                                          No upcoming appointments.
                                        </td>
                                      </tr>
                                    )}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
<<<<<<< HEAD
                        </div> */}
                        {bookings && (
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
                                        <th>Patient Name</th>
                                        <th>Appt Date</th>
                                        <th>Purpose</th>
                                        <th>Type</th>
                                        <th className="text-center">
                                          Paid Amount
                                        </th>
                                        <th />
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookings.length > 0 ? (
                                        bookings.map((booking) => (
                                          <tr key={booking._id}>
                                            <td>
                                              <h2 className="table-avatar">
                                                <a
                                                  href={`PatientProfile`}
                                                  className="avatar avatar-sm mr-2"
                                                >
                                                  <img
                                                    className="avatar-img rounded-circle"
                                                    src={`${API_URL}/${booking.patientId.avatar}
                                                      `} // Ensure patient has avatar URL
                                                    alt="User Image"
                                                  />
                                                </a>
                                                <a href={`PatientProfile}`}>
                                                  {booking.patientName}
                                                  <span>
                                                    {booking.customId}
                                                  </span>
                                                </a>
                                              </h2>
                                            </td>
                                            <td>
                                              {dayjs(
                                                booking.appointmentDate
                                              ).format("DD MMM YYYY")}
                                              <span className="d-block text-info">
                                                {dayjs(
                                                  booking.time,
                                                  "HH:mm"
                                                ).format("hh:mm A")}
                                              </span>
                                            </td>
                                            <td>{booking.purpose}</td>
                                            <td>{booking.type}</td>
                                            <td className="text-center">
                                              {booking.amount}
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
                                                  className="btn btn-sm bg-success-light"
                                                  onClick={() =>
                                                    handleBookingStatus(
                                                      booking._id,
                                                      "Confirm"
                                                    )
                                                  }
                                                >
                                                  <i className="fas fa-check" />{" "}
                                                  Accept
                                                </a>

                                                <a
                                                  href="javascript:void(0);"
                                                  className="btn btn-sm bg-danger-light"
                                                  onClick={() =>
                                                    handleBookingStatus(
                                                      booking._id,
                                                      "Cancelled"
                                                    )
                                                  }
                                                >
                                                  <i className="fas fa-trash" />
                                                  Cancel
                                                </a>
                                              </div>
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td
                                            colSpan="6"
                                            className="text-center"
                                          >
                                            No upcoming appointments.
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
=======
                        </div>
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f

                        {/* /Upcoming Appointment Tab */}
                        {/* Today Appointment Tab */}
                        <div className="tab-pane" id="today-appointments">
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Patient Name</th>
                                      <th>Appt Date</th>
                                      <th>Purpose</th>
                                      <th>Type</th>
                                      <th className="text-center">
                                        Paid Amount
                                      </th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
<<<<<<< HEAD
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient6.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Elsie Gilley <span>#PT0006</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          6.00 PM
                                        </span>
                                      </td>
                                      <td>Fever</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$300</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient7.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Joan Gardner <span>#PT0006</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          5.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$100</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient8.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Daniel Griffing <span>#PT0007</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          3.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$75</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient9.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Walter Roberson <span>#PT0008</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          1.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$350</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient10.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Robert Rhodes <span>#PT0010</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          10.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$175</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient11.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Harry Williams <span>#PT0011</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          11.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$450</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
=======
                                    {todayBookings.length > 0 ? (
                                      todayBookings.map((booking) => (
                                        <tr key={booking._id}>
                                          <td>
                                            <h2 className="table-avatar">
                                              <a
                                                href={`PatientProfile`}
                                                className="avatar avatar-sm mr-2"
                                              >
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={`${API_URL}/${booking.patientId.avatar}
                                                      `} // Ensure patient has avatar URL
                                                  alt="User Image"
                                                />
                                              </a>
                                              <a href={`PatientProfile}`}>
                                                {booking.patientId.name}
                                                <span>{booking.customId}</span>
                                              </a>
                                            </h2>
                                          </td>
                                          <td>
                                            {dayjs(
                                              booking.appointmentDate
                                            ).format("DD MMM YYYY")}
                                            <span className="d-block text-info">
                                              {dayjs(
                                                booking.time,
                                                "HH:mm"
                                              ).format("hh:mm A")}
                                            </span>
                                          </td>
                                          <td>{booking.purpose}</td>
                                          <td>{booking.type}</td>
                                          <td className="text-center">
                                            {booking.amount}
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
                                                className="btn btn-sm bg-success-light"
                                                onClick={
                                                  booking.status !== "Confirm"
                                                    ? () =>
                                                        handleBookingStatus(
                                                          booking._id,
                                                          booking.patientId
                                                            .name,
                                                          booking.patientId
                                                            .email,
                                                          "Confirm"
                                                        )
                                                    : undefined
                                                }
                                              >
                                                <i className="fas fa-check" />
                                                {booking.status == "Confirm"
                                                  ? "Accepted"
                                                  : "Accept"}
                                              </a>

                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-danger-light"
                                                onClick={() =>
                                                  handleBookingStatus(
                                                    booking._id,
                                                    booking.patientId.name,
                                                    booking.patientId.email,
                                                    "Cancelled"
                                                  )
                                                }
                                              >
                                                <i className="fas fa-trash" />
                                                Cancel
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="6" className="text-center">
                                          No todays appointments.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="prev-appointments">
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Patient Name</th>
                                      <th>Appt Date</th>
                                      <th>Purpose</th>
                                      <th>Type</th>
                                      <th className="text-center">
                                        Paid Amount
                                      </th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pastBookings.length > 0 ? (
                                      pastBookings?.map((booking) => (
                                        <tr key={booking._id}>
                                          <td>
                                            <h2 className="table-avatar">
                                              <a
                                                href={`PatientProfile`}
                                                className="avatar avatar-sm mr-2"
                                              >
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={`${API_URL}/${booking.patientId.avatar}
                                                      `} // Ensure patient has avatar URL
                                                  alt="User Image"
                                                />
                                              </a>
                                              <a href={`PatientProfile}`}>
                                                {booking.patientId.name}
                                                <span>{booking.customId}</span>
                                              </a>
                                            </h2>
                                          </td>
                                          <td>
                                            {dayjs(
                                              booking.appointmentDate
                                            ).format("DD MMM YYYY")}
                                            <span className="d-block text-info">
                                              {dayjs(
                                                booking.time,
                                                "HH:mm"
                                              ).format("hh:mm A")}
                                            </span>
                                          </td>
                                          <td>{booking.purpose}</td>
                                          <td>{booking.type}</td>
                                          <td className="text-center">
                                            {booking.amount}
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
                                                className="btn btn-sm bg-success-light"
                                                onClick={() =>
                                                  handleBookingStatus(
                                                    booking._id,
                                                    booking.patientId.name,
                                                    booking.patientId.email,
                                                    "Confirm"
                                                  )
                                                }
                                              >
                                                <i className="fas fa-check" />
                                                {booking.status == "Confirm"
                                                  ? "Accepted"
                                                  : "Accept"}
                                              </a>

                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-danger-light"
                                                onClick={() =>
                                                  handleBookingStatus(
                                                    booking._id,
                                                    booking.patientId.name,
                                                    booking.patientId.email,
                                                    "Cancelled"
                                                  )
                                                }
                                              >
                                                <i className="fas fa-trash" />
                                                Cancel
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="6" className="text-center">
                                          No past appointments.
                                        </td>
                                      </tr>
                                    )}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default DoctorDashboard;
