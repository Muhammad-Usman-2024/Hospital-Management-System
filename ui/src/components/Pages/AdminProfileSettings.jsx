import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

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
            <div className="row d-flex">
              {/* Profile Sidebar */}
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <AdminSidebar />
              </div>

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
                          value={profileFormData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={profileFormData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={profileFormData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                          value={profileFormData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Email ID</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={profileFormData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={profileFormData.password}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phoneNumber"
                          value={profileFormData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={profileFormData.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={profileFormData.city}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={profileFormData.state}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zipCode"
                          value={profileFormData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={profileFormData.country}
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
