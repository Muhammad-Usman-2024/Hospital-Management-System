import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBooking,
  resetBookingSuccess,
  resetFormData,
  updateFormData,
} from "../redux/features/commonSlices/bookingSlice";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorId } = useParams();

  // 🌟 Extract Redux State
  const { patientData = {} } = useSelector((state) => state.patientData);
  const { formData, doctorBooking } = useSelector(
    (state) => state.doctorBooking
  );
  const { success, error, isLoading } = doctorBooking;
  const { doctorsData = [] } = useSelector((state) => state.allDoctorsData);

  // 🌟 Derived Data
  const doctorData =
    doctorsData.find((doctor) => doctor._id === doctorId) || {};
  const patientId = patientData?._id;
  console.log("yaar this is the doctor qamar data", doctorData);

  // 🌟 Set Form Data on Mount
  useEffect(() => {
    if (doctorId)
      dispatch(updateFormData({ name: "doctorId", value: doctorId }));
    if (patientId)
      dispatch(updateFormData({ name: "patientId", value: patientId }));
  }, [doctorId, patientId, dispatch]);

  // 🌟 Handle Input Change
  const handleInputChange = (e) => {
    dispatch(updateFormData({ name: e.target.name, value: e.target.value }));
  };

  // 🌟 Send Booking Confirmation Email
  const sendBookingEmail = async () => {
    if (!doctorData.email) {
      console.error("Doctor email is missing. Email not sent.");
      return;
    }

    try {
      await emailjs.send(
        "service_urux88x", // Service ID
        "template_zbed7di", // Template ID
        {
          from_name: patientData.name,
          to_name: doctorData.username,
          from_email: patientData.email,
          to_email: doctorData.email,
          message: `You have a new booking with name ${patientData.name}`,
        },
        "ehHcxWe090MKl-GFY" // User ID
      );

      toast.success("Booking confirmation email sent successfully.");
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error("Failed to send confirmation email.");
    }
  };

  // 🌟 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      bookingDate: new Date().toISOString(),
    };

    dispatch(createBooking(bookingData));
  };

  // 🌟 Handle Success with useEffect
  useEffect(() => {
    if (success) {
      sendBookingEmail();
      toast.success("Booking submitted successfully.");
      dispatch(resetFormData()); // ✅ Reset form after success
      dispatch(resetBookingSuccess()); // ✅ Reset success to prevent auto-toast
      navigate("/PatientDashboard"); // ✅ Redirect after success
    }
    if (error) {
      toast.error("Error while booking.");
    }
  }, [success, error, navigate, dispatch]);

  const handleReset = () => dispatch(resetFormData());
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { doctorId } = useParams();

  // // 🌟 Extract Redux State
  // const { patientData = {} } = useSelector((state) => state.patientData);
  // const { formData, doctorBooking } = useSelector(
  //   (state) => state.doctorBooking
  // );

  // const { success, error, isLoading } = doctorBooking;
  // console.log("this is success", success);
  // toast.success(success);
  // const { doctorsData = [] } = useSelector((state) => state.allDoctorsData);

  // // 🌟 Derived Data
  // const doctorData =
  //   doctorsData.find((doctor) => doctor._id === doctorId) || {};
  // const patientId = patientData?._id;

  // // 🌟 Set Form Data on Mount
  // useEffect(() => {
  //   doctorId && dispatch(updateFormData({ name: "doctorId", value: doctorId }));
  //   patientId &&
  //     dispatch(updateFormData({ name: "patientId", value: patientId }));
  // }, [doctorId, patientId, dispatch]);

  // // 🌟 Handle Input Change
  // const handleInputChange = (e) =>
  //   dispatch(updateFormData({ name: e.target.name, value: e.target.value }));

  // // 🌟 Send Booking Confirmation Email
  // const sendBookingEmail = useCallback(async () => {
  //   if (!doctorData.email) return;
  //   try {
  //     await emailjs.send(
  //       "service_urux88x", // Service ID
  //       "template_zbed7di", // Template ID
  //       {
  //         from_name: patientData.name,
  //         to_name: doctorData.username,
  //         from_email: patientData.email,
  //         to_email: doctorData.email,
  //         message: `You have a new booking with name ${patientData.name}`,
  //       },
  //       "ehHcxWe090MKl-GFY" // User ID
  //     );
  //     toast.success("Booking confirmation email sent successfully.");
  //   } catch (error) {
  //     console.error("Email sending error:", error);
  //     toast.error("Failed to send confirmation email.");
  //   }
  // }, [doctorData, patientData]);

  // // 🌟 Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   const bookingData = {
  //     ...formData,
  //     bookingDate: new Date().toISOString(), // Automatically set booking date
  //   };
  //   console.log(formData);
  //   dispatch(createBooking(bookingData));
  //   // dispatch(
  //   //   createBooking({ ...formData, bookingDate: new Date().toISOString() })
  //   // );
  //   success && sendBookingEmail();
  //   success && toast.success("Booking data submitted successfully.");
  //   error && toast.error("Error while booking data submission.");
  // };

  // // 🌟 Reset Form
  // const handleReset = () => dispatch(resetFormData(formData));

  // // 🌟 Redirect on Success
  // useEffect(() => {
  //   success && navigate("/PatientDashboard");
  //   success == false;
  // }, [success, navigate]);

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
                      Booking
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Doctor Booking</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <h4 className="mb-4 text-center">
                        Book Doctor Appointment
                      </h4>

                      {/* <div className="form-group">
                        <div className="change-avatar">
                          <div className="profile-img">
                            <img
                              src={
                                fileUrl || "/assets/img/patients/patient.jpg" // Replace with admin default image
                              }
                              alt="Admin Avatar"
                            />
                          </div>
                          <div className="upload-img">
                            <div className="change-photo-btn">
                              <span>
                                <i className="fa fa-upload" /> Upload Photo
                              </span>
                              <input
                                type="file"
                                className="upload"
                                onChange={handleAvatarChange}
                              />
                            </div>
                            <small className="form-text text-muted">
                              Allowed JPG, GIF or PNG. Max size of 2MB
                            </small>
                          </div>
                        </div>
                      </div> */}

                      {/* Patient Name */}
                      <div className="form-group mb-3">
                        <label>Patient Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="patientName"
                          value={formData.patientName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="form-group mb-3">
                        <label>Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Amount */}
                      <div className="form-group mb-3">
                        <label>Amount:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* Purpose */}
                      <div className="form-group mb-3">
                        <label>Pupose:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* Type */}
                      <div className="form-group mb-3">
                        <label>Type:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Date */}
                      <div className="form-group mb-3">
                        <label>Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Time */}
                      <div className="form-group mb-3">
                        <label>Time:</label>
                        <input
                          type="time"
                          className="form-control"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Symptoms */}
                      <div className="form-group mb-3">
                        <label>Symptoms:</label>
                        <textarea
                          className="form-control"
                          name="symptoms"
                          value={formData.symptoms}
                          rows="3"
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>

                      {/* Message */}
                      <div className="form-group mb-3">
                        <label>Message:</label>
                        <textarea
                          className="form-control"
                          name="message"
                          value={formData.message}
                          rows="3"
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      {/* Phone Number */}
                      <div className="form-group mb-4">
                        <label>Phone Number:</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Submit and Reset Buttons */}
                      <div className="d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? "Booking..." : "Save & Send"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleReset}
                        >
                          Reset Form
                        </button>
                      </div>

                      {/* Success/Error Messages */}
                      {success && (
                        <p className="mt-3 text-success">
                          Doctor booked successfully!
                        </p>
                      )}
                      {error && <p className="mt-3 text-danger">{error}</p>}
                    </form>
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

export default Booking;
