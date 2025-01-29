import { useDispatch, useSelector } from "react-redux";
import {
  resetIsRegistered,
  setForm,
} from "../redux/features/doctorSlices/registerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doctorRegister } from "../redux/thunks/thunks";
const DoctorRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Extract the "redirect" query parameter
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");
  console.log(redirect);

  const {
    form = {},
    isLoading,
    error,
    isRegistered,
  } = useSelector((state) => state.doctorRegister);
  useEffect(() => {
    console.log(isRegistered);
    if (isRegistered) {
      // Redirect based on the "redirect" query parameter
      if (redirect === "adminDashboard") {
        navigate("/AdminDashboard");
      } else if (redirect === "registerLink") {
        navigate("/DoctorDashboard");
      }
      // Reset isRegistered after redirection
      dispatch(resetIsRegistered());
    }
  }, [isRegistered, redirect, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setForm({ [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(doctorRegister(form));
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
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            name="username"
                            value={form.username || ""} // Ensure a fallback value
                            onChange={handleChange} // Handle input change
                          />
                          <label className="focus-label">Name</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating"
                            name="email"
                            value={form.email || ""} // Ensure a fallback value
                            onChange={handleChange} // Handle input change
                          />
                          <label className="focus-label">Email</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            className="form-control floating"
                            name="password"
                            value={form.password || ""} // Ensure a fallback value
                            onChange={handleChange} // Handle input change
                          />
                          <label className="focus-label">Password</label>
                        </div>

                        {error && <div className="text-danger">{error}</div>}

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
