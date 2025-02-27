import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PatientSidebar from "./PatientSidebar";
import {
  useFetchPatientDataQuery,
  usePatientProfileSettingsMutation,
} from "../redux/features/patient/patientApi";
import {
  clearProfileFormData,
  updateProfileFormData,
} from "../redux/features/patient/patientSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileForm = useSelector((state) => state.patient.profileForm);
  const [patientProfileSettings, { isLoading }] =
    usePatientProfileSettingsMutation();
  const {
    data: patientData,
    isLoading: isFetchingPatientData,
    refetch,
  } = useFetchPatientDataQuery();

  const [fileUrl, setFileUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfileFormData({ key: name, value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateProfileFormData({ key: "avatar", value: file }));
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "this is the profile form data in the paitent profile settings:",
      profileForm
    );
    try {
      await patientProfileSettings(profileForm).unwrap();
      refetch(); // Refresh data manually after update
      toast.success("Profile updated successfully!");
      dispatch(clearProfileFormData());
      navigate("/PatientDashboard");
    } catch (error) {
      toast.error(error.data?.message || "Update failed");
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
                      Profile Settings
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Profile Settings</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              {/* Profile Sidebar */}
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <PatientSidebar />
              </div>
              {/* /Profile Sidebar */}
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body">
                    {/* Profile Settings Form */}
                    <form onSubmit={handleSubmit}>
                      {/* Profile Image */}
                      <div className="form-group">
                        <div className="change-avatar">
                          <div className="profile-img">
                            <img
                              src={fileUrl || "assets/img/patients/patient.jpg"}
                              alt="User Avatar"
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
                                onChange={handleFileChange}
                              />
                            </div>
                            <small className="form-text text-muted">
                              Allowed JPG, GIF or PNG. Max size of 2MB
                            </small>
                          </div>
                        </div>
                      </div>

                      {/* Text Fields */}
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={profileForm.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                          value={profileForm.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Blood Group</label>
                        <select
                          className="form-control"
                          name="bloodGroup"
                          value={profileForm.bloodGroup}
                          onChange={handleInputChange}
                        >
                          <option>A-</option>
                          <option>A+</option>
                          <option>B-</option>
                          <option>B+</option>
                          <option>AB-</option>
                          <option>AB+</option>
                          <option>O-</option>
                          <option>O+</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Email ID</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={profileForm.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phoneNumber"
                          value={profileForm.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={profileForm.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={profileForm.city}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={profileForm.state}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zipCode"
                          value={profileForm.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={profileForm.country}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                        >
                          {isLoading ? "Updating..." : "Update Profile"}
                        </button>
                      </div>
                    </form>
                    {/* /Profile Settings Form */}
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

export default ProfileSettings;
