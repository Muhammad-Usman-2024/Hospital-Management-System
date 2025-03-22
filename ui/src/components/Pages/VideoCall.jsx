import React from "react";

const VideoCall = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            {/* Call Wrapper */}
            <div className="call-wrapper">
              <div className="call-main-row">
                <div className="call-main-wrapper">
                  <div className="call-view">
                    <div className="call-window">
                      {/* Call Header */}
                      <div className="fixed-header">
                        <div className="navbar">
                          <div className="user-details">
                            <div className="float-left user-img">
                              <a
                                className="avatar avatar-sm mr-2"
                                href="PatientProfile"
                                title="Charlene Reed"
                              >
                                <img
                                  src="assets/img/patients/patient1.jpg"
                                  alt="User Image"
                                  className="rounded-circle"
                                />
                                <span className="status online" />
                              </a>
                            </div>
                            <div className="user-info float-left">
                              <a href="PatientProfile">
                                <span>Charlene Reed</span>
                              </a>
                              <span className="last-seen">Online</span>
                            </div>
                          </div>
                          <ul className="nav float-right custom-menu">
                            <li className="nav-item dropdown dropdown-action">
                              <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa fa-cog" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  href="javascript:void(0)"
                                  className="dropdown-item"
                                >
                                  Settings
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* /Call Header */}
                      {/* Call Contents */}
                      <div className="call-contents">
                        <div className="call-content-wrap">
                          <div className="user-video">
                            <img
                              src="assets/img/video-call.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div className="my-video">
                            <ul>
                              <li>
                                <img
                                  src="assets/img/patients/patient1.jpg"
                                  className="img-fluid"
                                  alt="User Image"
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Call Contents */}
                      {/* Call Footer */}
                      <div className="call-footer">
                        <div className="call-icons">
                          <span className="call-duration">00:59</span>
                          <ul className="call-items">
                            <li className="call-item">
                              <a
                                href="#"
                                title="Enable Video"
                                data-placement="top"
                                data-toggle="tooltip"
                              >
                                <i className="fas fa-video camera" />
                              </a>
                            </li>
                            <li className="call-item">
                              <a
                                href="#"
                                title="Mute Audio"
                                data-placement="top"
                                data-toggle="tooltip"
                              >
                                <i className="fa fa-microphone microphone" />
                              </a>
                            </li>
                            <li className="call-item">
                              <a
                                href="#"
                                title="Add User"
                                data-placement="top"
                                data-toggle="tooltip"
                              >
                                <i className="fa fa-user-plus" />
                              </a>
                            </li>
                            <li className="call-item">
                              <a
                                href="#"
                                title="Full Screen"
                                data-placement="top"
                                data-toggle="tooltip"
                              >
                                <i className="fas fa-arrows-alt-v full-screen" />
                              </a>
                            </li>
                          </ul>
                          <div className="end-call">
                            <a href="javascript:void(0);">
                              <i className="material-icons">call_end</i>
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* /Call Footer */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Call Wrapper */}
          </div>
        </div>
        {/* /Page Content */}
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default VideoCall;
