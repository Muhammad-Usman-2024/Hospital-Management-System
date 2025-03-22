import React from "react";
<<<<<<< HEAD
=======
import DoctorSidebar from "./DoctorSidebar";
import PatientSidebar from "./PatientSidebar";
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f

const ChangePassword = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Change Password
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Change Password</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
<<<<<<< HEAD
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>Richard Wilson</h3>
                        <div className="patient-details">
                          <h5>
                            <i className="fas fa-birthday-cake"></i> 24 Jul
                            1983, 38 years
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-map-marker-alt"></i> Newyork,
                            USA
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li>
                          <a href="PatientDashboard">
                            <i className="fas fa-columns"></i>
                            <span>Dashboard</span>
                          </a>
                        </li>
                        <li>
                          <a href="Favourites">
                            <i className="fas fa-bookmark"></i>
                            <span>Favourites</span>
                          </a>
                        </li>
                        <li>
                          <a href="Chat">
                            <i className="fas fa-comments"></i>
                            <span>Message</span>
                            <small className="unread-msg">23</small>
                          </a>
                        </li>
                        <li>
                          <a href="ProfileSettings">
                            <i className="fas fa-user-cog"></i>
                            <span>Profile Settings</span>
                          </a>
                        </li>
                        <li className="active">
                          <a href="ChangePassword">
                            <i className="fas fa-lock"></i>
                            <span>Change Password</span>
                          </a>
                        </li>
                        <li>
                          <a href="Home">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
=======
                <PatientSidebar />
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
              </div>

              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <form>
                          <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="submit-section">
                            <button
                              type="submit"
                              className="btn btn-primary submit-btn"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChangePassword;
