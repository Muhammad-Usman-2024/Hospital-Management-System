import React, { useState } from "react";
<<<<<<< HEAD
import { updateFormData } from "../redux/features/patientSlices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { patientProfileSettings } from "../redux/thunks/thunks";

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
=======
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
<<<<<<< HEAD
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>Richard Wilson</h3>
                        <div className="patient-details">
                          <h5>
                            <i className="fas fa-birthday-cake" /> 24 Jul 1983,
                            38 years
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-map-marker-alt" /> Newyork, USA
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </a>
                        </li>
                        <li>
                          <a href="Favourites">
                            <i className="fas fa-bookmark" />
                            <span>Favourites</span>
                          </a>
                        </li>
                        <li>
                          <a href="Chat">
                            <i className="fas fa-comments" />
                            <span>Message</span>
                            <small className="unread-msg">23</small>
                          </a>
                        </li>
                        <li className="active">
                          <a href="ProfileSettings">
                            <i className="fas fa-user-cog" />
                            <span>Profile Settings</span>
                          </a>
                        </li>
                        <li>
                          <a href="ChangePassword">
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
                <PatientSidebar />
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
<<<<<<< HEAD
                          value={formData.name}
=======
                          value={profileForm.name}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
<<<<<<< HEAD
                          value={formData.dateOfBirth}
=======
                          value={profileForm.dateOfBirth}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Blood Group</label>
                        <select
                          className="form-control"
                          name="bloodGroup"
<<<<<<< HEAD
                          value={formData.bloodGroup}
=======
                          value={profileForm.bloodGroup}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
<<<<<<< HEAD
                          value={formData.email}
=======
                          value={profileForm.email}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phoneNumber"
<<<<<<< HEAD
                          value={formData.phoneNumber}
=======
                          value={profileForm.phoneNumber}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
<<<<<<< HEAD
                          value={formData.address}
=======
                          value={profileForm.address}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
<<<<<<< HEAD
                          value={formData.city}
=======
                          value={profileForm.city}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
<<<<<<< HEAD
                          value={formData.state}
=======
                          value={profileForm.state}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zipCode"
<<<<<<< HEAD
                          value={formData.zipCode}
=======
                          value={profileForm.zipCode}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
<<<<<<< HEAD
                          value={formData.country}
=======
                          value={profileForm.country}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                        >
<<<<<<< HEAD
                          Save Changes
=======
                          {isLoading ? "Updating..." : "Update Profile"}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
