import React, { useState } from "react";
import { updateFormData } from "../redux/features/patientSlices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { patientProfileSettings } from "../redux/thunks/thunks";
import PatientSidebar from "./PatientSidebar";

const ProfileSettings = () => {
  const [file, setFile] = useState(null); // To store the file object
  const [fileUrl, setFileUrl] = useState(""); // To store the frontend URL for display purposes
  const dispatch = useDispatch();
  const { formData = {}, status } = useSelector(
    (state) => state.patientProfile
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ key: name, value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Store the File object
    setFile(selectedFile);

    // Create a URL for displaying the image on the frontend (not to store in Redux)
    const frontendUrl = URL.createObjectURL(selectedFile);
    setFileUrl(frontendUrl);

    // Dispatch to update Redux formData with the file object directly
    dispatch(updateFormData({ key: "avatar", value: selectedFile }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(patientProfileSettings(formData));
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
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Blood Group</label>
                        <select
                          className="form-control"
                          name="bloodGroup"
                          value={formData.bloodGroup}
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
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                        >
                          Save Changes
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
