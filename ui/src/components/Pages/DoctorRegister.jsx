import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDoctorRegisterMutation } from "../redux/features/doctor/doctorApi";
import {
  resetRegisterForm,
  setRegisterForm,
} from "../redux/features/doctor/doctorSlice";
import { toast } from "react-toastify";

const DoctorRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const { registerForm } = useSelector((state) => state.doctor);
  const [doctorRegister, { isLoading, isSuccess, error }] =
    useDoctorRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Doctor registration successful!");
      dispatch(resetRegisterForm());
      navigate(
        redirect === "adminDashboard" ? "/AdminDashboard" : "/DoctorDashboard"
      );
    }
  }, [isSuccess, redirect, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setRegisterForm({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doctorRegister(registerForm).unwrap();
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="main-wrapper">
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Account Content */}
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
                          Register as a <span>Doctor</span>
                        </h3>
                      </div>
                      {isLoading && <p>Loading...</p>}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            name="username"
                            value={registerForm.username || ""} // Ensure a fallback value
                            onChange={handleChange} // Handle input change
                          />
                          <label className="focus-label">Name</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating"
                            name="email"
                            value={registerForm.email || ""} // Ensure a fallback value
                            onChange={handleChange} // Handle input change
                          />
                          <label className="focus-label">Email</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            className="form-control floating"
                            name="password"
                            value={registerForm.password || ""} // Ensure a fallback value
                            onChange={handleChange} // Handle input change
                          />
                          <label className="focus-label">Password</label>
                        </div>

                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                          disabled={isLoading} // Disable button while loading
                        >
                          {isLoading ? "Registering..." : "Register"}
                        </button>
                        {redirect !== "adminDashboard" && (
                          <div className="text-center dont-have">
                            Already have an account?
                            <a href="/doctorLogin">Login</a>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
                {/* /Account Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      {/* /Main Wrapper */}
      {/* jQuery */}
    </>
  );
};

export default DoctorRegister;
