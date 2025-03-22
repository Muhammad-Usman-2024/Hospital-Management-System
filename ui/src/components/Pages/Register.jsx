import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import {
  resetIsRegistered,
  setForm,
} from "../redux/features/patientSlices/registerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { patientRegister } from "../redux/thunks/thunks";
=======
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFetchDoctorRegisteredPatientsQuery,
  usePatientRegisterMutation,
} from "../redux/features/patient/patientApi";
import { useFetchDoctorDataQuery } from "../redux/features/doctor/doctorApi";
import {
  resetIsRegistered,
  setDoctorId,
  setRegisterForm,
} from "../redux/features/patient/patientSlice";
import { toast } from "react-toastify";
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
<<<<<<< HEAD

  // Extract the "redirect" query parameter
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const {
    form = {},
    isLoading,
    isRegistered,
  } = useSelector((state) => state.patientRegister);
  useEffect(() => {
    if (isRegistered) {
      // Redirect based on the "redirect" query parameter
      if (redirect === "dashboard") {
        navigate("/DoctorDashboard");
      } else if (redirect === "search") {
        navigate("/Search");
      }
      // Reset isRegistered after redirection
      dispatch(resetIsRegistered());
    }
  }, [isRegistered, redirect, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setForm({ [name]: value })); // Update the form in Redux state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(patientRegister(form)); // Dispatch the thunk
=======
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");
  const { data: doctorData, isLoading: isdoctorFetching } =
    useFetchDoctorDataQuery();
  const { registerForm, isRegistered } = useSelector((state) => state.patient);
  const [patientRegister, { isLoading, isSuccess, error }] =
    usePatientRegisterMutation();

  const { data: doctorRegistered, refetch } =
    useFetchDoctorRegisteredPatientsQuery(doctorData?.data?._id);
  useEffect(() => {
    if (isRegistered) {
      navigate(redirect === "dashboard" ? "/DoctorDashboard" : "/Search");
      dispatch(resetIsRegistered(false));
    }
  }, [isRegistered, navigate, dispatch, redirect]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful!");
      dispatch(resetIsRegistered(true));
    }
    if (error) {
      toast.error(error.data?.message || "Registration failed");
    }
  }, [isSuccess, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setRegisterForm({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = {
        ...registerForm,
        doctorId:
          redirect === "dashboard" ? doctorData?.data._id || null : null,
      };
      dispatch(setDoctorId(updatedForm.doctorId));
      await patientRegister(updatedForm).unwrap();
      refetch();
    } catch (error) {
      console.error("Registration error:", error);
    }
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Register Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src="assets/img/login-banner.png"
                        className="img-fluid"
                        alt="Doccure Register"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>
                          Patient Register
                          {redirect !== "dashboard" && (
                            <a href="DoctorRegister">Are you a Doctor?</a>
                          )}
                        </h3>
                      </div>
                      {/* Register Form */}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            name="name"
<<<<<<< HEAD
                            value={form.name}
=======
                            value={registerForm.name}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                            onChange={handleInputChange}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Name</label>
                        </div>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            name="email"
<<<<<<< HEAD
                            value={form.email}
=======
                            value={registerForm.email}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                            onChange={handleInputChange}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Email</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            name="password"
<<<<<<< HEAD
                            value={form.password}
=======
                            value={registerForm.password}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                            onChange={handleInputChange}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Create Password</label>
                        </div>

                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Registering..." : "Signup"}
                        </button>
                        {redirect !== "dashboard" && (
                          <div className="text-center dont-have">
                            Already have an account?
                            <a href="/patientLogin">Login</a>
                          </div>
                        )}
                      </form>
                      {/* /Register Form */}
                    </div>
                  </div>
                </div>
                {/* /Register Content */}
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
export default Register;
