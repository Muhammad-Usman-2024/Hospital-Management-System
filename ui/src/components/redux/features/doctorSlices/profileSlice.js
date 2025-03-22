import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { doctorProfileSettings } from "../../thunks/thunks";

const initialState = {
  formData: {
    avatar: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    aboutMe: { biography: "" },
    clinicInfo: { name: "", address: "", images: [] },
    contactDetails: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    pricing: { type: "free", customPrice: null },
    servicesAndSpecialization: {
      services: [],
      specializations: [],
    },
    education: [{ degree: "", college: "", yearOfCompletion: "" }],
    experience: [{ hospitalName: "", from: "", to: "", designation: "" }],
    awards: [{ title: "", year: "" }],
    memberships: [{ name: "" }],
  },
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "doctorProfile",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { section, key, value, index } = action.payload;

      // Update the relevant section with new data
      if (!section) {
        state.formData[key] = value;
      } else if (Array.isArray(state.formData[section])) {
        // If section is an array, update an item or push a new one
        if (index !== null && index >= 0) {
          state.formData[section][index] = {
            ...state.formData[section][index],
            [key]: value,
          };
        } else {
          state.formData[section].push({ [key]: value });
        }
      } else {
        // For simple key-value pairs inside objects
        state.formData[section][key] = value;
      }
    },

    deleteFormData: (state, action) => {
      const { section, index } = action.payload;

      if (
        Array.isArray(state.formData[section]) &&
        state.formData[section].length > 1
      ) {
        state.formData[section].splice(index, 1);
      }
    },
    uploadImage: (state, action) => {
      const { section, key, file, index } = action.payload;

      if (key === "avatar") {
        // Directly assign the file to the state
        state.formData[key] = file;
      } else if (
        section &&
        key === "images" &&
        Array.isArray(state.formData[section][key])
      ) {
        // Directly push the file into the array
        state.formData[section][key].push(file);
      }
    },

    removeImage: (state, action) => {
      const { section, key, index } = action.payload;

      if (key === "images" && Array.isArray(state.formData[section][key])) {
        state.formData[section][key].splice(index, 1);
      }
    },

    clearFormData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorProfileSettings.pending, (state) => {
        state.status = "pending";
        toast.info("Updating doctor profile...");
      })
      .addCase(doctorProfileSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Doctor profile updated successfully!");
      })
      .addCase(doctorProfileSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to update doctor profile.");
      });
  },
});

export const {
  updateFormData,
  deleteFormData,
  uploadImage,
  removeImage,
  clearFormData,
} = profileSlice.actions;

export default profileSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { doctorProfileSettings } from "../../thunks/thunks";
// import { toast } from "react-toastify";

// const initialState = {
//   formData: {
//     avatar: "",
//     username: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     gender: "",
//     dateOfBirth: "",
//     aboutMe: { biography: "" },
//     clinicInfo: { name: "", address: "", images: [] },
//     contactDetails: {
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       country: "",
//       postalCode: "",
//     },
//     pricing: { type: "free", customPrice: null },
//     servicesAndSpecialization: {
//       services: [],
//       specializations: [],
//     },
//     education: [{ degree: "", college: "", yearOfCompletion: "" }],
//     experience: [{ hospitalName: "", from: "", to: "", designation: "" }],
//     awards: [{ title: "", year: "" }],
//     memberships: [{ name: "" }],
//   },
//   status: "idle",
//   error: null,
// };

// const profileSlice = createSlice({
//   name: "doctorProfile",
//   initialState,
//   reducers: {
//     updateFormData: (state, action) => {
//       const { section, key, value, index } = action.payload;

//       if (!section) {
//         state.formData[key] = value;
//       } else if (Array.isArray(state.formData[section])) {
//         if (index !== null && index >= 0) {
//           state.formData[section][index] = {
//             ...state.formData[section][index],
//             [key]: value,
//           };
//         } else {
//           state.formData[section].push({ [key]: value });
//         }
//       } else {
//         state.formData[section][key] = value;
//       }
//     },
//     deleteFormData: (state, action) => {
//       const { section, index } = action.payload;

//       if (
//         Array.isArray(state.formData[section]) &&
//         state.formData[section].length > 1
//       ) {
//         state.formData[section].splice(index, 1);
//       }
//     },
//     uploadImage: (state, action) => {
//       const { section, key, file } = action.payload;

//       if (key === "avatar") {
//         state.formData.avatar = file;
//       } else if (
//         section &&
//         key === "images" &&
//         Array.isArray(state.formData[section]?.images)
//       ) {
//         state.formData[section].images.push(file);
//       }
//     },
//     removeImage: (state, action) => {
//       const { section, index } = action.payload;

//       if (section === "clinicInfo" && state.formData[section]?.images) {
//         state.formData[section].images.splice(index, 1);
//       }
//     },
//     clearFormData: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(doctorProfileSettings.pending, (state) => {
//         state.status = "loading";
//         toast.info("Updating profile...");
//       })
//       .addCase(doctorProfileSettings.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.formData = action.payload;
//         toast.success("Profile updated successfully!");
//       })
//       .addCase(doctorProfileSettings.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//         toast.error(action.payload || "Failed to update profile.");
//       });
//   },
// });

// export const {
//   updateFormData,
//   deleteFormData,
//   uploadImage,
//   removeImage,
//   clearFormData,
// } = profileSlice.actions;

// export default profileSlice.reducer;
