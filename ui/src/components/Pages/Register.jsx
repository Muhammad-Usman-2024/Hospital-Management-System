import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetIsRegistered,
  setForm,
} from "../redux/features/patientSlices/registerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { patientRegister } from "../redux/thunks/thunks";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
                            value={form.name}
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
                            value={form.email}
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
                            value={form.password}
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
