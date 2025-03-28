import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { setForm } from "../redux/features/adminSlices/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { adminLogin } from "../redux/thunks/thunks";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    form = {},
    isLoading,
    isAuthenticated,
  } = useSelector((state) => state.admin);

  //Navigate to Dashboard after loggedIn
=======
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetForm, setForm } from "../redux/features/admin/adminSlice";
import {
  useAdminLoginMutation,
  useVerifyAdminTokenQuery,
} from "../redux/features/admin/adminApi";
import { toast } from "react-toastify";
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.admin);

  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const { data, isFetching } = useVerifyAdminTokenQuery();

  const isAuthenticated = data?.isAuthenticated || false;

  // Redirect to dashboard if authenticated
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/AdminDashboard");
    }
  }, [isAuthenticated, navigate]);

<<<<<<< HEAD
  //Handle Onchange functionality of all input fields
=======
  // Handle input changes
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setForm({ [name]: value }));
  };

  // Handle form submission
<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(form));
  };
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(form).unwrap();
      dispatch(resetForm());
      toast.success("Login successful!");
      navigate("/AdminDashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed!");
    }
  };
  if (isLoading || isFetching) {
    return <p>Loading....</p>;
  }
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
                          Login <span>Admin</span>
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating"
                            name="email"
                            value={form.email}
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
                            value={form.password}
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
                          disabled={isLoading} // Disable the button while loading
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

export default AdminLogin;
