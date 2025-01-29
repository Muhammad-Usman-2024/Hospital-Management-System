import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import { toast } from "react-toastify";

// ---------------------------------Post Requests for storing data on database--------------------------------

// --------------Admin Login Thunk---------------
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin-login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Request failed");
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "Request failed");
      }
    }
  }
);
// --------------Doctor Login Thunk--------------
export const doctorLogin = createAsyncThunk(
  "doctor/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/doctor-login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Request failed");
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "Request failed");
      }
    }
  }
);
// -------------Patient Login Thunk--------------
export const patientLogin = createAsyncThunk(
  "patient/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/patient-login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Request failed");
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "Request failed");
      }
    }
  }
);
// -------------Doctor Register Thunk------------
export const doctorRegister = createAsyncThunk(
  "doctor/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/doctor-register`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Request failed");
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "Request failed");
      }
    }
  }
);
// -------------Patient Register Thunk------------
export const patientRegister = createAsyncThunk(
  "patient/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/patient-register`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Request failed");
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "Request failed");
      }
    }
  }
);

// -------------------------------Get Requests for fetching data from database--------------------------------

// ------Fetch Single Doctor Data from Backend-----
export const fetchAdminData = createAsyncThunk(
  "admin/fetchAdminData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin-data`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch user data"
        );
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "An error occurred");
      }
    }
  }
);
// -------Fetch All Doctors Data from Backend------
export const fetchAllDoctorsData = createAsyncThunk(
  "doctors/fetchAllDoctorsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/doctors-data`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch user data"
        );
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "An error occurred");
      }
    }
  }
);
// ------Fetch Single Doctor Data from Backend-----
export const fetchDoctorData = createAsyncThunk(
  "doctor/fetchSingleDoctorData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/doctor-details`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch user data"
        );
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "An error occurred");
      }
    }
  }
);
// ------Fetch Single Patient Data from Backend-----
export const fetchPatientData = createAsyncThunk(
  "patient/fetchSinglePatientData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/patient-details`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch patient data"
        );
      } else if (error.request) {
        return rejectWithValue("No response received from the server");
      } else {
        return rejectWithValue(error.message || "An error occurred");
      }
    }
  }
);

// --------------Admin verify token----------------
export const verifyAdminToken = createAsyncThunk(
  "admin/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      // Sending the request with credentials
      const response = await axios.get(`${API_URL}/api/admin-verify`, {
        withCredentials: true,
      });

      // Check the expected response
      if (response?.data?.isAuthenticated !== undefined) {
        return { isAuthenticated: response.data.isAuthenticated };
      } else {
        return rejectWithValue("Unexpected response format for admin");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Admin token verification failed";
      return rejectWithValue(errorMessage);
    }
  }
);
// -------------Doctor verify token----------------
export const verifyDoctorToken = createAsyncThunk(
  "doctor/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      // Sending the request with credentials
      const response = await axios.get(`${API_URL}/api/doctor-verify`, {
        withCredentials: true,
      });

      // Check the expected response
      if (response?.data?.isAuthenticated !== undefined) {
        return { isAuthenticated: response.data.isAuthenticated };
      } else {
        return rejectWithValue("Unexpected response format for doctor");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Doctor token verification failed";
      return rejectWithValue(errorMessage);
    }
  }
);
// -------------Patient verify token---------------
export const verifyPatientToken = createAsyncThunk(
  "patient/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      // Sending the request with credentials
      const response = await axios.get(`${API_URL}/api/patient-verify`, {
        withCredentials: true,
      });

      // Check the expected response
      if (response?.data?.isAuthenticated !== undefined) {
        return { isAuthenticated: response.data.isAuthenticated };
      } else {
        return rejectWithValue("Unexpected response format for doctor");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Doctor token verification failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// ---------------------------------Put Requests for Updating Data on database---------------------------------

// --------------Admin profile Settings--------------
export const adminProfileSettings = createAsyncThunk(
  "adminProfile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const formattedData = new FormData();

      // Append fields to FormData individually
      if (formData.avatar) formattedData.append("avatar", formData.avatar);
      formData.username;
      formattedData.append("username", formData.username);
      if (formData.firstName)
        formattedData.append("firstName", formData.firstName);
      if (formData.lastName)
        formattedData.append("lastName", formData.lastName);
      if (formData.dateOfBirth)
        formattedData.append("dateOfBirth", formData.dateOfBirth);
      if (formData.bloodGroup)
        formattedData.append("bloodGroup", formData.bloodGroup);
      if (formData.email) formattedData.append("email", formData.email);
      if (formData.phoneNumber)
        formattedData.append("phoneNumber", formData.phoneNumber);
      if (formData.address) formattedData.append("address", formData.address);
      if (formData.city) formattedData.append("city", formData.city);
      if (formData.state) formattedData.append("state", formData.state);
      if (formData.zipCode) formattedData.append("zipCode", formData.zipCode);
      if (formData.country) formattedData.append("country", formData.country);

      // Send API request to upload the profile and files
      const response = await axios.put(
        `${API_URL}/api/update-admin-profile`, // Adjust API URL as per your backend
        formattedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      toast.success("Admin profile updated successfully!");
      return response.data; // Return data for Redux state update
    } catch (error) {
      toast.error("Error updating profile.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// --------------Doctor profile Settings-------------
// export const doctorProfileSettings = createAsyncThunk(
//   "doctorProfile/update",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const formattedData = new FormData();

//       // Process fields and append them to FormData
//       for (const key in formData) {
//         if (key === "avatar" && formData[key]) {
//           // Append avatar file
//           formattedData.append("avatar", formData[key]);
//         } else if (key === "clinicInfo" && formData[key]?.images) {
//           // Append multiple images for clinicInfo
//           formData[key].images.forEach((image) => {
//             formattedData.append("clinicInfo.images", image);
//           });

//           // Append other clinicInfo data as a JSON string
//           const { images, ...restClinicInfo } = formData[key];
//           formattedData.append("clinicInfo", JSON.stringify(restClinicInfo));
//         } else if (Array.isArray(formData[key])) {
//           // Append array data
//           formData[key].forEach((item, index) => {
//             for (const subKey in item) {
//               formattedData.append(`${key}[${index}].${subKey}`, item[subKey]);
//             }
//           });
//         } else if (typeof formData[key] === "object") {
//           // Append object fields
//           for (const subKey in formData[key]) {
//             formattedData.append(`${key}.${subKey}`, formData[key][subKey]);
//           }
//         } else {
//           // Append primitive fields
//           formattedData.append(key, formData[key]);
//         }
//       }

//       // Make the API request
//       const response = await axios.patch(
//         `${API_URL}/api/update-doctor-profile`,
//         formattedData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       toast.success("Profile updated successfully!");
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Error updating profile.";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
// export const doctorProfileSettings = createAsyncThunk(
//   "doctorProfile/update",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const formattedData = new FormData();

//       for (const key in formData) {
//         if (key === "avatar" && formData[key]) {
//           // Append single file (avatar)
//           formattedData.append("avatar", formData[key]);
//         } else if (key === "clinicInfo" && formData[key]?.images) {
//           // Append clinicInfo images
//           formData[key].images.forEach((image) => {
//             formattedData.append("clinicInfo.images", image);
//           });

//           // Append other clinicInfo fields as JSON
//           const { images, ...restClinicInfo } = formData[key];
//           formattedData.append("clinicInfo", JSON.stringify(restClinicInfo));
//         } else if (Array.isArray(formData[key])) {
//           // Append array items (e.g., education, experience)
//           formData[key].forEach((item, index) => {
//             if (typeof item === "object" && item !== null) {
//               // For nested objects in the array
//               for (const subKey in item) {
//                 formattedData.append(
//                   `${key}[${index}].${subKey}`,
//                   item[subKey]
//                 );
//               }
//             } else {
//               // For primitive array values
//               formattedData.append(`${key}[${index}]`, item);
//             }
//           });
//         } else if (typeof formData[key] === "object") {
//           // Append object fields
//           for (const subKey in formData[key]) {
//             formattedData.append(`${key}.${subKey}`, formData[key][subKey]);
//           }
//         } else {
//           // Append primitive fields
//           formattedData.append(key, formData[key]);
//         }
//       }

//       // Make the API request
//       const response = await axios.patch(
//         `${API_URL}/api/update-doctor-profile`,
//         formattedData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       toast.success("Profile updated successfully!");
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Error updating profile.";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
export const doctorProfileSettings = createAsyncThunk(
  "doctorProfile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const formattedData = new FormData();

      for (const key in formData) {
        if (key === "avatar" && formData[key]) {
          formattedData.append("avatar", formData[key]);
        } else if (key === "clinicInfo" && formData[key]?.images) {
          formData[key].images.forEach((image) => {
            formattedData.append("clinicInfo.images", image);
          });

          const { images, ...restClinicInfo } = formData[key];
          formattedData.append("clinicInfo", JSON.stringify(restClinicInfo));
        } else if (Array.isArray(formData[key])) {
          // Stringify the arrays like education, experience, awards
          formattedData.append(key, JSON.stringify(formData[key]));
        } else if (typeof formData[key] === "object") {
          for (const subKey in formData[key]) {
            formattedData.append(`${key}.${subKey}`, formData[key][subKey]);
          }
        } else {
          formattedData.append(key, formData[key]);
        }
      }

      // Make the API request
      const response = await axios.patch(
        `${API_URL}/api/update-doctor-profile`,
        formattedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error updating profile.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
// -------------Patient profile Settings-------------
export const patientProfileSettings = createAsyncThunk(
  "patientProfile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const formattedData = new FormData();

      // Append fields to FormData individually
      if (formData.avatar) formattedData.append("avatar", formData.avatar);
      if (formData.name) formattedData.append("name", formData.name);
      if (formData.dateOfBirth)
        formattedData.append("dateOfBirth", formData.dateOfBirth);
      if (formData.bloodGroup)
        formattedData.append("bloodGroup", formData.bloodGroup);
      if (formData.email) formattedData.append("email", formData.email);
      if (formData.phoneNumber)
        formattedData.append("phoneNumber", formData.phoneNumber);
      if (formData.address) formattedData.append("address", formData.address);
      if (formData.city) formattedData.append("city", formData.city);
      if (formData.state) formattedData.append("state", formData.state);
      if (formData.zipCode) formattedData.append("zipCode", formData.zipCode);
      if (formData.country) formattedData.append("country", formData.country);

      // Send API request to upload the profile and files
      const response = await axios.put(
        `${API_URL}/api/update-patient-profile`,
        formattedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      toast.success("Profile updated successfully!");
      return response.data; // Return data for Redux state update
    } catch (error) {
      toast.error("Error updating profile.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
