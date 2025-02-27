import React, { useEffect, useState } from "react";
import {
  updateFormData,
  deleteFormData,
  uploadImage,
  removeImage,
  clearFormData,
} from "../redux/features/doctor/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import API_URL from "../../config/apiConfig";
import DoctorSidebar from "./DoctorSidebar";
import {
  useFetchDoctorDataQuery,
  useUpdateDoctorProfileMutation,
} from "../redux/features/doctor/doctorApi";
import { useNavigate } from "react-router-dom";

const DoctorProfileSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.doctor);
  const { data: doctorData, isLoading, refetch } = useFetchDoctorDataQuery();

  const [fileUrl, setFileUrl] = useState("");
  const { services = [], specializations = [] } =
    formData.servicesAndSpecialization || {};

  const { education, experience, awards, memberships } = formData;
  const [updateDoctorProfile, { isLoading: isUpdating }] =
    useUpdateDoctorProfileMutation();

  // Handle Input Change
  const handleInputChange = (section, key, e, index = null) => {
    const value = e.target.value;
    dispatch(updateFormData({ section, key: key.trim(), value, index }));
  };

  // Handle File Upload
  const handleFileChange = (key, e) => {
    const file = e.target.files[0];
    const frontendUrl = URL.createObjectURL(file);
    setFileUrl(frontendUrl);
    dispatch(uploadImage({ key, file }));
  };

  // Handle Multiple Image Uploads
  const handleClinicImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file instanceof File) {
        dispatch(uploadImage({ section: "clinicInfo", key: "images", file }));
      }
    });
  };

  // Handle Image Remove
  const handleImageRemove = (section, key, index) => {
    dispatch(removeImage({ section, key, index }));
  };

  // Handle Pricing Radio Button Change
  const handleRadioChange = (value) => {
    dispatch(updateFormData({ section: "pricing", key: "type", value }));
  };

  // Handle Custom Price Input
  const handleCustomPriceChange = (e) => {
    dispatch(
      updateFormData({
        section: "pricing",
        key: "customPrice",
        value: e.target.value,
      })
    );
  };

  // Handle Tag Input (Services & Specializations)
  const handleTagInputChange = (e, section) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const updatedList = [
        ...(section === "services" ? services : specializations),
        e.target.value.trim(),
      ];
      dispatch(
        updateFormData({
          section: "servicesAndSpecialization",
          key: section,
          value: updatedList,
        })
      );
      e.target.value = ""; // Clear input field
    }
  };

  // Remove Tag (Services & Specializations)
  const handleTagRemove = (index, section) => {
    const updatedList =
      section === "services"
        ? services.filter((_, i) => i !== index)
        : specializations.filter((_, i) => i !== index);
    dispatch(
      updateFormData({
        section: "servicesAndSpecialization",
        key: section,
        value: updatedList,
      })
    );
  };

  // Add More Items (Education, Experience, Awards, Memberships)
  const handleAddMore = (section, arrayKey, newItem) => {
    dispatch(
      updateFormData({
        section,
        key: arrayKey,
        value: newItem,
        index: null,
      })
    );
  };

  // Remove Item (Education, Experience, Awards, Memberships)
  const handleRemove = (section, index) => {
    dispatch(deleteFormData({ section, index }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      toast.error("Username is required.");
    } else if (!formData.email) {
      toast.error("Email is required.");
    } else {
      try {
        const result = await updateDoctorProfile(formData).unwrap();
        console.log("Update successful:", result);
        refetch();
        toast.success("Profile updated successfully!");
        dispatch(clearFormData());
        navigate("/DoctorDashboard");
        // rest of success logic...
      } catch (error) {
        console.error("Error in updateDoctorProfile:", error);
        toast.error(error.data?.message || "Failed to update doctor profile.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                {/* Profile Sidebar */}
                <DoctorSidebar />
                {/* /Profile Sidebar */}
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <form onSubmit={handleSubmit}>
                  {/* /Basic Information */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Basic Information</h4>
                      <div className="row form-row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="change-avatar">
                              <div className="profile-img">
                                <img
                                  src={
                                    fileUrl ||
                                    "assets/img/doctors/doctor-thumb-02.jpg"
                                  }
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
                                    onChange={(e) =>
                                      handleFileChange("avatar", e)
                                    }
                                  />
                                </div>
                                <small className="form-text text-muted">
                                  Allowed JPG, GIF or PNG. Max size of 2MB
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Username <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.username}
                              onChange={(e) =>
                                handleInputChange(null, "username", e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange(null, "email", e)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.phoneNumber}
                              onChange={(e) =>
                                handleInputChange(null, "phoneNumber", e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Gender</label>
                            <select
                              className="form-control select"
                              value={formData.gender}
                              onChange={(e) =>
                                handleInputChange(null, "gender", e)
                              }
                            >
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-0">
                            <label>Date of Birth</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.dateOfBirth}
                              onChange={(e) =>
                                handleInputChange(null, "dateOfBirth", e)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Basic Information */}
                  {/* About Me */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">About Me</h4>
                      <div className="form-group mb-0">
                        <label>Biography</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          value={formData.aboutMe.biography}
                          onChange={(e) =>
                            handleInputChange("aboutMe", "biography", e)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* /About Me */}
                  {/* Clinic Info */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Clinic Info</h4>
                      <div className="row form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Clinic Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.clinicInfo.name}
                              onChange={(e) =>
                                handleInputChange("clinicInfo", "name", e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Clinic Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.clinicInfo.address}
                              onChange={(e) =>
                                handleInputChange("clinicInfo", "address", e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Clinic Images</label>
                            <div
                              className="upload-area d-flex justify-content-center align-items-center"
                              onClick={() =>
                                document
                                  .getElementById("clinicImageUpload")
                                  .click()
                              } // Trigger file input click on div click
                              style={{
                                backgroundColor: "#e0e0e0", // Gray background
                                padding: "20px", // Padding around
                                height: "200px", // Fixed height
                                borderRadius: "8px", // Optional: Rounded corners
                                cursor: "pointer", // Pointer cursor to show clickability
                              }}
                            >
                              <i
                                className="fa fa-upload"
                                style={{ fontSize: "24px" }}
                              ></i>{" "}
                              {/* Icon */}
                              <input
                                id="clinicImageUpload"
                                type="file"
                                className="upload"
                                multiple
                                style={{ display: "none" }} // Hide the input element
                                onChange={handleClinicImagesUpload} // Handler for uploading images
                              />
                            </div>

                            <small className="form-text text-muted">
                              Allowed JPG, GIF or PNG. Max size of 2MB.
                            </small>
                          </div>

                          {/* Display uploaded images */}
                          {/* <div className="upload-wrap d-flex flex-wrap gap-1">
                            {formData.clinicInfo.images.length > 0 &&
                              formData.clinicInfo.images.map((image, index) => {
                                return (
                                  <div key={index} className="upload-images ">
                                    
                                    <img
                                      
                                      alt={`Uploaded Clinic Image ${index + 1}`}
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                      }} 
                                    />
                                    <a
                                      href="javascript:void(0);"
                                      className="btn btn-icon btn-danger btn-sm"
                                      onClick={() =>
                                        handleImageRemove(
                                          "clinicInfo",
                                          "images",
                                          index
                                        )
                                      } 
                                    >
                                      <i className="far fa-trash-alt" />
                                    </a>
                                  </div>
                                );
                              })}
                          </div>  */}
                          <div className="upload-wrap d-flex flex-wrap gap-1">
                            {formData.clinicInfo.images.length > 0 &&
                              formData.clinicInfo.images.map((image, index) => {
                                // Generate the object URL for the file
                                const frontendUrl = URL.createObjectURL(image); // Create the object URL for each image

                                return (
                                  <div key={index} className="upload-images">
                                    {/* Use the generated blob URL as the source */}
                                    <img
                                      alt={`Uploaded Clinic Image ${index + 1}`}
                                      src={frontendUrl} // Set the blob URL here
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                      }} // You can adjust styles as needed
                                    />
                                    <a
                                      href="javascript:void(0);"
                                      className="btn btn-icon btn-danger btn-sm"
                                      onClick={() =>
                                        handleImageRemove(
                                          "clinicInfo",
                                          "images",
                                          index
                                        )
                                      } // Handler to remove the image
                                    >
                                      <i className="far fa-trash-alt" />
                                    </a>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Clinic Info */}
                  {/* Contact Details */}
                  <div className="card contact-card">
                    <div className="card-body">
                      <h4 className="card-title">Contact Details</h4>
                      <div className="row form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.contactDetails.addressLine1 || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "contactDetails",
                                  "addressLine1",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.contactDetails.addressLine2 || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "contactDetails",
                                  "addressLine2",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.contactDetails.city || ""}
                              onChange={(e) =>
                                handleInputChange("contactDetails", "city", e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>State / Province</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.contactDetails.state || ""}
                              onChange={(e) =>
                                handleInputChange("contactDetails", "state", e)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.contactDetails.country || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "contactDetails",
                                  "country",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.contactDetails.postalCode || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "contactDetails",
                                  "postalCode",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Contact Details */}
                  {/* Pricing */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Pricing</h4>
                      <div className="form-group mb-0">
                        <div id="pricing_select">
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="price_free"
                              name="rating_option"
                              className="custom-control-input"
                              value="free"
                              checked={formData.pricing.type === "free"}
                              onChange={() => handleRadioChange("free")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price_free"
                            >
                              Free
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="price_custom"
                              name="rating_option"
                              className="custom-control-input"
                              value="custom"
                              checked={formData.pricing.type === "custom"}
                              onChange={() => handleRadioChange("custom")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price_custom"
                            >
                              Custom Price (per hour)
                            </label>
                          </div>
                        </div>
                      </div>
                      {formData.pricing.type === "custom" && (
                        <div className="row custom_price_cont mt-3">
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              id="custom_rating_input"
                              name="custom_rating_count"
                              value={formData.pricing.customPrice || ""}
                              onChange={handleCustomPriceChange}
                              placeholder="Enter custom price"
                            />
                            <small className="form-text text-muted">
                              Custom price you can add
                            </small>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* /Pricing */}
                  {/* Services and Specialization */}
                  <div className="card services-card">
                    <div className="card-body">
                      <h4 className="card-title">
                        Services and Specialization
                      </h4>

                      {/* Services */}
                      <div className="form-group">
                        <label>Services</label>
                        <div
                          className="d-flex flex-wrap align-items-center p-2 gap-2"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                        >
                          {/* Render Default Service Badges */}
                          {services.map((service, index) => (
                            <span
                              key={index}
                              className="badge bg-primary text-white d-flex align-items-center"
                            >
                              {service}
                              <button
                                type="button"
                                className="btn-close btn-sm ms-2"
                                aria-label="Remove"
                                style={{
                                  filter: "invert(1)",
                                  fontSize: "0.8rem",
                                }}
                                onClick={() =>
                                  handleTagRemove(index, "services")
                                }
                              ></button>
                            </span>
                          ))}
                          {/* Input Field */}
                          <input
                            type="text"
                            className="border-0 flex-grow-1"
                            placeholder="Enter Services"
                            style={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            onKeyDown={(e) =>
                              handleTagInputChange(e, "services")
                            }
                          />
                        </div>
                        <small className="form-text text-muted">
                          Note: Type &amp; Press enter to add new services
                        </small>
                      </div>

                      {/* Specializations */}
                      <div className="form-group">
                        <label>Specialization</label>
                        <div
                          className="d-flex flex-wrap align-items-center p-2 gap-2"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                        >
                          {/* Render Default Specialization Badges */}
                          {specializations.map((specialization, index) => (
                            <span
                              key={index}
                              className="badge bg-primary text-white d-flex align-items-center"
                            >
                              {specialization}
                              <button
                                type="button"
                                className="btn-close btn-sm ms-2"
                                aria-label="Remove"
                                style={{
                                  filter: "invert(1)",
                                  fontSize: "0.8rem",
                                }}
                                onClick={() =>
                                  handleTagRemove(index, "specializations")
                                }
                              ></button>
                            </span>
                          ))}
                          {/* Input Field */}
                          <input
                            type="text"
                            className="border-0 flex-grow-1"
                            placeholder="Enter Specialization"
                            style={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            onKeyDown={(e) =>
                              handleTagInputChange(e, "specializations")
                            }
                          />
                        </div>
                        <small className="form-text text-muted">
                          Note: Type &amp; Press enter to add new specialization
                        </small>
                      </div>
                    </div>
                  </div>
                  {/* /Services and Specialization */}
                  {/* Education */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Education</h4>
                      <div className="education-info">
                        {education.map((item, index) => (
                          <div
                            key={index}
                            className="row form-row education-cont"
                          >
                            <div className="col-12 col-md-10 col-lg-11">
                              <div className="row form-row">
                                {/* Degree Input */}
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>Degree</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.degree}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "education",
                                          "degree",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                {/* College/Institute Input */}
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>College/Institute</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.college}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "education",
                                          "college",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                {/* Year of Completion Input */}
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>Year of Completion</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.yearOfCompletion}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "education",
                                          "yearOfCompletion",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                {index > 0 && (
                                  <div className="text-right mt-2">
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleRemove("education", index)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Add More Button */}
                      <div className="add-more">
                        {/* <button
                          type="button"
                          className="btn btn-primary add-education"
                          onClick={handleAddMore}
                        >
                          <i className="fa fa-plus-circle" /> Add More
                        </button> */}
                        <div className="add-more">
                          <a
                            href="javascript:void(0);"
                            className="add-education"
                            onClick={() =>
                              handleAddMore("education", "education", {
                                degree: "",
                                college: "",
                                yearOfCompletion: "",
                              })
                            }
                          >
                            <i className="fa fa-plus-circle" /> Add More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Education */}
                  {/* Experience */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Experience</h4>
                      <div className="experience-info">
                        {experience.map((item, index) => (
                          <div
                            key={index}
                            className="row form-row experience-cont"
                          >
                            <div className="col-12 col-md-10 col-lg-11">
                              <div className="row form-row">
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>Hospital Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.hospitalName}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "experience",
                                          "hospitalName",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>From</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.from}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "experience",
                                          "from",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>To</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.to}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "experience",
                                          "to",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                  <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.designation}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "experience",
                                          "designation",
                                          e,
                                          index
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                {index > 0 && (
                                  <div className="text-right mt-2">
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleRemove("experience", index)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="add-more">
                        <a
                          href="javascript:void(0);"
                          className="add-experience"
                          onClick={() =>
                            handleAddMore("experience", "experience", {
                              hospitalName: "",
                              from: "",
                              to: "",
                              designation: "",
                            })
                          }
                        >
                          <i className="fa fa-plus-circle" /> Add More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* /Experience */}
                  {/* Awards */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Awards</h4>
                      <div className="awards-info">
                        {awards.map((item, index) => (
                          <div key={index} className="row form-row awards-cont">
                            <div className="col-12 col-md-5">
                              <div className="form-group">
                                <label>Awards</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={item.title}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "awards",
                                      "title",
                                      e,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-5">
                              <div className="form-group">
                                <label>Year</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={item.year}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "awards",
                                      "year",
                                      e,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </div>

                            {index > 0 && (
                              <div className="text-right mt-2">
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleRemove("awards", index)}
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="add-more">
                        <a
                          href="javascript:void(0);"
                          className="add-award"
                          onClick={() =>
                            handleAddMore("awards", "awards", {
                              title: "",
                              year: "",
                            })
                          }
                        >
                          <i className="fa fa-plus-circle" /> Add More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* /Awards */}
                  {/* Memberships */}
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Memberships</h4>
                      <div className="membership-info">
                        {memberships.map((item, index) => (
                          <div
                            key={index}
                            className="row form-row membership-cont"
                          >
                            <div className="col-12 col-md-10 col-lg-5">
                              <div className="form-group">
                                <label>Memberships</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={item.name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "memberships",
                                      "name",
                                      e,
                                      index
                                    )
                                  }
                                />
                              </div>
                              {index > 0 && (
                                <div className="text-right mt-2">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleRemove("memberships", index)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="add-more">
                        <a
                          href="javascript:void(0);"
                          className="add-membership"
                          onClick={() =>
                            handleAddMore("memberships", "memberships", {
                              name: "",
                            })
                          }
                        >
                          <i className="fa fa-plus-circle" /> Add More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* /Memberships */}
                  <div className="submit-section submit-btn-bottom">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
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

export default DoctorProfileSettings;
