import {
  fetchAdminData,
  fetchAllDoctorsData,
  fetchDoctorData,
} from "../thunks/thunks";

export const fetchInitialData = () => async (dispatch) => {
  try {
    await dispatch(fetchAllDoctorsData());
    await dispatch(fetchAdminData());
    await dispatch(fetchDoctorData());
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};
