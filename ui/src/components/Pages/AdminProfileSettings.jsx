import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import {
  clearFormData,
  updateFormData,
} from "../redux/features/adminSlices/profileSlice";
import { adminProfileSettings, fetchAdminData } from "../redux/thunks/thunks";
import API_URL from "../../config/apiConfig";

const AdminProfileSettings = () => {
  const [file, setFile] = useState(null); // To store the file object
  const [fileUrl, setFileUrl] = useState(""); // To store the frontend URL for display purposes
  const dispatch = useDispatch();
  const { formData = {}, status } = useSelector((state) => state.adminProfile);
  const {
    adminData,
    isLoading: isAdminLoading,
    error: adminError,
  } = useSelector((state) => state.adminDetails);

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
    dispatch(clearFormData());
    dispatch(adminProfileSettings(formData));
  };
  if (isAdminLoading) {
    return <div>Loading...</div>;
  }
=======

import API_URL from "../../config/apiConfig";
import {
  clearProfileFormData,
  updateProfileFormData,
} from "../redux/features/admin/adminSlice";
import {
  useGetAdminDataQuery,
  useUpdateAdminProfileMutation,
} from "../redux/features/admin/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminProfileSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileFormData = useSelector((state) => state.admin.profileFormData);
  const { data: adminData, refetch } = useGetAdminDataQuery();

  // Local state for file preview
  const [fileUrl, setFileUrl] = useState("");

  // RTK Query mutation hook
  const [updateAdminProfile, { isLoading }] = useUpdateAdminProfileMutation();

  // Handle input change and update Redux store
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfileFormData({ key: name, value }));
  };

  // Handle file upload (for avatar)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFileUrl(previewUrl); // Set preview image
      dispatch(updateProfileFormData({ key: "avatar", value: selectedFile })); // Store file in Redux
    }
  };

  // Handle form submission with toast notifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdminProfile(profileFormData).unwrap();
      refetch(); // Refresh data manually after update
      toast.success("Profile updated successfully!");
      navigate("/AdminDashboard");
      dispatch(clearProfileFormData());
    } catch (error) {
      console.log("Error in profile settings", error);
      toast.error(error?.data?.message || "Failed to update profile!");
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
<<<<<<< HEAD
            <div className="row">
              {/* Profile Sidebar */}
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src={
                            `${API_URL}/${adminData?.avatar}` ||
                            "assets/img/admins/qamar.jpeg"
                          }
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>{adminData?.username}</h3>
                        <div className="admin-details">{adminData.email}</div>
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
              </div>
=======
            <div className="row d-flex">
              {/* Profile Sidebar */}
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <AdminSidebar />
              </div>

>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
              {/* /Profile Sidebar */}
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {/* Profile Image */}
                      <div className="form-group">
                        <div className="change-avatar">
                          <div className="profile-img">
                            <img
                              src={
                                fileUrl || "assets/img/admins/qamar.jpeg" // Replace with admin default image
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
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
<<<<<<< HEAD
                          value={formData.username}
=======
                          value={profileFormData.username}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
<<<<<<< HEAD
                          value={formData.firstName}
=======
                          value={profileFormData.firstName}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
<<<<<<< HEAD
                          value={formData.lastName}
=======
                          value={profileFormData.lastName}
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
                          value={profileFormData.dateOfBirth}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
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
                          value={profileFormData.email}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
<<<<<<< HEAD
                          value={formData.password}
=======
                          value={profileFormData.password}
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
                          value={profileFormData.phoneNumber}
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
                          value={profileFormData.address}
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
                          value={profileFormData.city}
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
                          value={profileFormData.state}
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
                          value={profileFormData.zipCode}
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
                          value={profileFormData.country}
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

export default AdminProfileSettings;
