<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBooking,
  resetFormData,
  updateFormData,
} from "../redux/features/commonSlices/bookingSlice";
=======
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useFetchPatientDataQuery } from "../redux/features/patient/patientApi";
import { useFetchAllDoctorsDataQuery } from "../redux/features/doctor/doctorApi";
import { useCreateBookingMutation } from "../redux/features/appointments/appointmentApi";
import {
  completeBooking,
  resetFormData,
  updateFormData,
} from "../redux/features/appointments/appointmentSlice";
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { patientData = {} } = useSelector((state) => state.patientData);
  const patientId = patientData?._id;
  const { formData, isLoading, success, error } = useSelector(
    (state) => state.doctorBooking
  );
  const { doctorId } = useParams(); // Get doctorId from URL

  // Set the doctorId in the form data when component mounts
  useEffect(() => {
    if (doctorId) {
      dispatch(updateFormData({ name: "doctorId", value: doctorId }));
    }
  }, [doctorId, dispatch]);
  useEffect(() => {
    if (patientId) {
      dispatch(updateFormData({ name: "patientId", value: patientId }));
    }
  }, [patientId, dispatch]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  // const handleAvatarChange = (e) => {
  //   const selectedFile = e.target.files[0]; // Store the File object
  //   setFile(selectedFile);

  //   // Create a URL for displaying the image on the frontend (not to store in Redux)
  //   const frontendUrl = URL.createObjectURL(selectedFile);
  //   setFileUrl(frontendUrl);

  //   // Dispatch to update Redux formData with the file object directly
  //   dispatch(updateFormData({ name: "patientAvatar", value: selectedFile }));
  // };
  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      bookingDate: new Date().toISOString(), // Automatically set booking date
    };
    console.log(formData);
    dispatch(createBooking(bookingData));
  };

  // Redirect to dashboard after successful booking (or display error)
  // useEffect(() => {
  //   if (formData.doctorId && formData.success) {
  //     navigate(`/dashboard/${formData.doctorId}`);
  //   }
  // }, [formData, navigate]);

  // Reset Form
  const handleReset = () => {
    dispatch(resetFormData());
  };

  useEffect(() => {
    if (success) {
      navigate("/PatientDashboard");
    }
  }, [success]);
=======
  const { doctorId } = useParams();
  const [createBooking, { isLoading, isSuccess, error }] =
    useCreateBookingMutation();

  // 🌟 Extract Redux State
  const { data: patientData, isLoading: ispatientFetching } =
    useFetchPatientDataQuery();
  const { formData } = useSelector((state) => state.appointment);
  const { data: allDoctors, isLoading: isallDoctorsFetching } =
    useFetchAllDoctorsDataQuery();
  const doctorsData = allDoctors?.data;
  // 🌟 Derived Data
  const doctorData =
    doctorsData.find((doctor) => doctor._id === doctorId) || {};
  const patientId = patientData?._id;

  // 🌟 Set Form Data on Mount
  useEffect(() => {
    if (doctorId)
      dispatch(updateFormData({ name: "doctorId", value: doctorId }));
    if (patientId)
      dispatch(updateFormData({ name: "patientId", value: patientId }));
  }, [doctorId, patientId, dispatch]);

  // 🌟 Send Booking Confirmation Email
  const sendBookingEmail = async () => {
    if (!doctorData.email) {
      console.error("Doctor email missing. Email not sent.");
      return;
    }

    try {
      await emailjs.send(
        "service_urux88x",
        "template_zbed7di",
        {
          from_name: patientData.name,
          to_name: doctorData.username,
          from_email: patientData.email,
          to_email: doctorData.email,
          message: `You have a new booking with name ${patientData.name}`,
        },
        "ehHcxWe090MKl-GFY"
      );
      toast.success("Booking confirmation email sent.");
    } catch (error) {
      console.error("Email error:", error);
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

    try {
      await createBooking(bookingData).unwrap();
      navigate("/PatientDashboard");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  // 🌟 Handle Success/Error
  useEffect(() => {
    if (isSuccess) {
      sendBookingEmail();
      toast.success("Booking submitted successfully.");
      dispatch(completeBooking());
      dispatch(resetFormData());
    }
    if (error) {
      toast.error(error.data?.message || "Error while booking.");
    }
  }, [isSuccess, error, dispatch]);

  const handleInputChange = (e) => {
    dispatch(updateFormData({ name: e.target.name, value: e.target.value }));
  };

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
<<<<<<< HEAD

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

=======
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
<<<<<<< HEAD

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

=======
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                      {/* Submit and Reset Buttons */}
                      <div className="d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? "Booking..." : "Save & Send"}
                        </button>
<<<<<<< HEAD
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
=======
                      </div>

                      {/* Success/Error Messages */}
                      {isSuccess && (
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
