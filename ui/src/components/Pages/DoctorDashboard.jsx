// import React, { useEffect } from "react";
// import dayjs from "dayjs";
// import { useDispatch, useSelector } from "react-redux";

// import API_URL from "../../config/apiConfig";
// import { fetchDoctorData } from "../redux/thunks/thunks";
// import {
//   fetchBookings,
//   updateBookingStatus,
// } from "../redux/features/commonSlices/bookingSlice";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { fetchDoctorRegisteredPatients } from "../redux/features/patientSlices/doctorPatientSlice";
// import DoctorSidebar from "./DoctorSidebar";
// import { toast } from "react-toastify";

// dayjs.extend(customParseFormat);

// const DoctorDashboard = () => {
//   const dispatch = useDispatch();
//   const { doctorBookings, isLoading } = useSelector(
//     (state) => state.doctorBooking
//   );

//   const { patients } = useSelector((state) => state.doctorPatients);

//   const { doctorData = {}, isLoading: doctorIsLoading } = useSelector(
//     (state) => state.doctorData
//   );
//   useEffect(() => {
//     if (doctorData && doctorData._id) {
//       dispatch(fetchBookings({ userId: doctorData._id, role: "doctor" }));
//     }
//   }, [dispatch, doctorData._id]);

//   useEffect(() => {
//     if (doctorData._id) {
//       dispatch(fetchDoctorRegisteredPatients(doctorData._id));
//     }
//   }, [dispatch, doctorData._id]);
//   console.log("doctorPatients fetched in doctordahsboard", patients);
//   // Define the handleBookingStatus function
//   const handleBookingStatus = async (
//     bookingId,
//     patientName,
//     patientEmail,
//     status
//   ) => {
//     try {
//       const response = await dispatch(
//         updateBookingStatus({ bookingId, status })
//       ).unwrap();
//       try {
//         // Use await with emailjs.send to ensure the promise is resolved
//         const result = await emailjs.send(
//           "service_n7y6qsb", // Service ID
//           "template_zbed7di", // Template ID
//           {
//             from_name: doctorData.name,
//             to_name: patientName,
//             from_email: doctorData.email,
//             to_email: patientEmail,
//             message: `Your booking is ${status}`,
//           },
//           "sXtf0zA4hLMiMmxp3" // User ID
//         );

//         toast.success("Your email sended successfully.");
//       } catch (error) {
//         console.error("Error sending email:", error);
//         alert("Something went wrong.");
//       }
//       if (status == "Cancelled") {
//         useEffect(() => {
//           if (doctorData && doctorData._id) {
//             dispatch(fetchBookings({ userId: doctorData._id, role: "doctor" }));
//           }
//         }, [dispatch, doctorData._id]);
//       }
//       alert(`Booking has been ${status.toLowerCase()} successfully.`);
//       console.log("Updated Booking:", response.booking);
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       alert("Failed to update booking status. Please try again.");
//     }
//   };

import React, { useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import API_URL from "../../config/apiConfig";
import { fetchDoctorData } from "../redux/thunks/thunks";
import {
  fetchBookings,
  updateBookingStatus,
} from "../redux/features/commonSlices/bookingSlice";
import { fetchDoctorRegisteredPatients } from "../redux/features/patientSlices/doctorPatientSlice";
import DoctorSidebar from "./DoctorSidebar";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const DoctorDashboard = () => {
  const dispatch = useDispatch();

  // 🌟 Extract Redux State
  const { doctorBookings, isLoading } = useSelector(
    (state) => state.doctorBooking
  );
  const { patients } = useSelector((state) => state.doctorPatients);
  const { doctorData = {}, isLoading: doctorIsLoading } = useSelector(
    (state) => state.doctorData
  );

  // 🌟 Fetch Bookings & Patients on Doctor Data Change
  useEffect(() => {
    if (doctorData?._id) {
      dispatch(fetchBookings({ userId: doctorData._id, role: "doctor" }));
      dispatch(fetchDoctorRegisteredPatients(doctorData._id));
    }
  }, [dispatch, doctorData._id]);

  console.log("Doctor Patients fetched in DoctorDashboard:", patients);

  // 🌟 Handle Booking Status Update
  const handleBookingStatus = async (
    bookingId,
    patientName,
    patientEmail,
    status
  ) => {
    try {
      // ✅ Update booking status in the database
      const response = await dispatch(
        updateBookingStatus({ bookingId, status })
      ).unwrap();
      console.log("Updated Booking:", response.booking);

      // ✅ Send email using EmailJS
      if (doctorData.email) {
        try {
          const emailResponse = await emailjs.send(
            "service_urux88x", // Service ID
            "template_zbed7di", // Template ID
            {
              from_name: doctorData.username,
              to_name: patientName,
              from_email: doctorData.email,
              to_email: patientEmail,
              message: `Your booking status is now: ${status}`,
            },
            "ehHcxWe090MKl-GFY" // User ID
          );

          console.log("EmailJS Response:", emailResponse);
          toast.success("Booking status email sent successfully.");
        } catch (emailError) {
          console.error("Email sending error:", emailError);
          toast.error("Failed to send status update email.");
        }
      }

      // ✅ Refresh Bookings if status is "Cancelled"
      if (status === "Cancelled" && doctorData._id) {
        dispatch(fetchBookings({ userId: doctorData._id, role: "doctor" }));
      }

      toast.success(`Booking has been ${status.toLowerCase()} successfully.`);
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status. Please try again.");
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
                                <h6>Today Patient</h6>
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
                      </ul>
                      {/* /Appointment Tab */}
                      <div className="tab-content">
                        {doctorBookings && (
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
                                      {doctorBookings.length > 0 ? (
                                        doctorBookings.map((booking) => (
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
                                                      booking.patientName,
                                                      booking.email,
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
                                                      booking.patientName,
                                                      booking.email,
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
