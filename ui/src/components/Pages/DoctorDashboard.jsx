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

dayjs.extend(customParseFormat);

const DoctorDashboard = () => {
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
                <DoctorSidebar />
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
                                <h3>{totalPatientsTillToday}</h3>
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
                                <h3>{todayBookings.length}</h3>
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
                                <h3>{doctorBookings.length}</h3>
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
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

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
