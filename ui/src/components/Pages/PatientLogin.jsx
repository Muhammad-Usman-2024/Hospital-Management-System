import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
<<<<<<< HEAD
import { setForm } from "../redux/features/patientSlices/loginSlice";
import { useNavigate } from "react-router-dom";
import { patientLogin } from "../redux/thunks/thunks";
const PatientLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    form = {},
    isLoading,
    isAuthenticated,
  } = useSelector((state) => state.patientLogin);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/PatientDashboard");
    }
=======
import { useNavigate } from "react-router-dom";
import {
  usePatientLoginMutation,
  useVerifyPatientTokenQuery,
} from "../redux/features/patient/patientApi";
import {
  setAuthenticated,
  setLoginForm,
} from "../redux/features/patient/patientSlice";
import { toast } from "react-toastify";

const PatientLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginForm } = useSelector((state) => state.patient);
  const [patientLogin, { isLoading, isSuccess, error }] =
    usePatientLoginMutation();
  const { data: patientTokenData, isFetching: isPatientVerifying } =
    useVerifyPatientTokenQuery();

  const isAuthenticated = patientTokenData?.isAuthenticated;

  useEffect(() => {
    if (isAuthenticated) navigate("/Search");
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    dispatch(setForm({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(patientLogin(form));
  };
=======
    dispatch(setLoginForm({ [name]: value }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      dispatch(setAuthenticated(true));
    }
    if (error) {
      toast.error(error.data?.message || "Login failed");
    }
  }, [isSuccess, error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientLogin(loginForm);
    } catch (error) {
      toast.error(error.data?.message || "Login failed");
    }
  };

>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
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
                          Login <span>Patient</span>
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            name="email"
                            className="form-control floating"
<<<<<<< HEAD
                            value={form.email}
=======
                            value={loginForm.email}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                            onChange={handleInputChange}
                            required
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        <div className="form-group form-focus">
                          <input
                            type="password"
                            name="password"
                            className="form-control floating"
<<<<<<< HEAD
                            value={form.password}
=======
                            value={loginForm.password}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
                            onChange={handleInputChange}
                            required
                          />
                          <label className="focus-label">Password</label>
                        </div>
                        <div className="text-right">
                          <a className="forgot-link" href="/forgot-password">
                            Forgot Password?
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
                          <a href="/register">Register</a>
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

export default PatientLogin;
