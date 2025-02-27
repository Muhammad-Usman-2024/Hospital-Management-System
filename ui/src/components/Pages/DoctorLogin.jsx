import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import {
  resetLoginForm,
  setLoginForm,
} from "../redux/features/doctor/doctorSlice";

import { toast } from "react-toastify";
import {
  useDoctorLoginMutation,
  useVerifyDoctorTokenQuery,
} from "../redux/features/doctor/doctorApi";

const DoctorLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginForm } = useSelector((state) => state.doctor);
  const [doctorLogin, { isLoading, isSuccess, error }] =
    useDoctorLoginMutation();

  // Redirect only on explicit success
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      dispatch(resetLoginForm());
      navigate("/DoctorDashboard");
    }
  }, [isSuccess, navigate, dispatch]);

  // Log and show error toast immediately in handleSubmit (like PatientLogin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doctorLogin(loginForm).unwrap();
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.data?.message || "Login failed"); // Show toast immediately
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginForm({ [name]: value }));
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
                {/* Login Tab Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src="assets/img/login-banner.png"
                        className="img-fluid"
                        alt="Doccure Login"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>
                          Login <span>Doctor</span>
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating"
                            name="email"
                            value={loginForm.email}
                            onChange={handleChange}
                            required
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        <div className="form-group form-focus">
                          <input
                            type="password"
                            className="form-control floating"
                            name="password"
                            value={loginForm.password}
                            onChange={handleChange}
                            required
                          />
                          <label className="focus-label">Password</label>
                        </div>
                        <div className="text-right">
                          <a className="forgot-link" href="ForgotPassword">
                            Forgot Password ?
                          </a>
                        </div>
                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Login"}
                        </button>

                        <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or">or</span>
                        </div>
                        <div className="row form-row social-login">
                          <div className="col-6">
                            <a href="#" className="btn btn-facebook btn-block">
                              <i className="fab fa-facebook-f mr-1" /> Login
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="#" className="btn btn-google btn-block">
                              <i className="fab fa-google mr-1" /> Login
                            </a>
                          </div>
                        </div>
                        <div className="text-center dont-have">
                          Don’t have an account?{" "}
                          <a href="DoctorRegister">Register</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* /Login Tab Content */}
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

export default DoctorLogin;
