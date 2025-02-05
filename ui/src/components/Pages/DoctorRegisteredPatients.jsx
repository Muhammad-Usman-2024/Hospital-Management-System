import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../config/apiConfig";
import { fetchDoctorRegisteredPatients } from "../redux/features/patientSlices/doctorPatientSlice";
import DoctorSidebar from "./DoctorSidebar";

const DoctorRegisteredPtients = () => {
  const dispatch = useDispatch();
  const { doctorData = {}, isLoading: doctorIsLoading } = useSelector(
    (state) => state.doctorData
  );
  const { patients } = useSelector((state) => state.doctorPatients);

  useEffect(() => {
    if (doctorData._id) {
      dispatch(fetchDoctorRegisteredPatients(doctorData._id));
    }
  }, [dispatch, doctorData._id]);
  console.log("doctorPatients fetched in doctordahsboard", patients);

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Breadcrumb */}
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
                      Registered Patients
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Doctor Registered Patients</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                {/* Profile Sidebar */}
                <DoctorSidebar />
                {/* /Profile Sidebar */}
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card dash-card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 col-lg-4">
                            <div className="dash-widget dct-border-rht">
                              <div className="circle-bar circle-bar1">
                                <div
                                  className="circle-graph1"
                                  data-percent={75}
                                >
                                  <img
                                    src="assets/img/icon-01.png"
                                    className="img-fluid"
                                    alt="patient"
                                  />
                                </div>
                              </div>
                              <div className="dash-widget-info">
                                <h6>Total Patient</h6>
                                <h3>1500</h3>
                                <p className="text-muted">Till Today</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4">
                            <div className="dash-widget dct-border-rht">
                              <div className="circle-bar circle-bar2">
                                <div
                                  className="circle-graph2"
                                  data-percent={65}
                                >
                                  <img
                                    src="assets/img/icon-02.png"
                                    className="img-fluid"
                                    alt="Patient"
                                  />
                                </div>
                              </div>
                              <div className="dash-widget-info">
                                <h6>Today Patient</h6>
                                <h3>160</h3>
                                <p className="text-muted">06, Nov 2019</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4">
                            <div className="dash-widget">
                              <div className="circle-bar circle-bar3">
                                <div
                                  className="circle-graph3"
                                  data-percent={50}
                                >
                                  <img
                                    src="assets/img/icon-03.png"
                                    className="img-fluid"
                                    alt="Patient"
                                  />
                                </div>
                              </div>
                              <div className="dash-widget-info">
                                <h6>Appoinments</h6>
                                <h3>85</h3>
                                <p className="text-muted">06, Apr 2019</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="mb-4">Registered Patients</h4>
                    <div className="appointment-tab">
                      <div className="tab-content">
                        {patients && (
                          <div
                            className="tab-pane show active"
                            id="upcoming-appointments"
                          >
                            <div className="card card-table mb-0">
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table table-hover table-center mb-0">
                                    <thead>
                                      <tr>
                                        <th>Patient Name</th>
                                        <th>Email</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {patients.length > 0 ? (
                                        patients.map((patient) => (
                                          <tr key={patient._id}>
                                            <td>
                                              <h2>{patient.name}</h2>
                                            </td>
                                            <td>{patient.email}</td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td
                                            colSpan="6"
                                            className="text-center"
                                          >
                                            No Patients Registered.
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* /Upcoming Appointment Tab */}
                        {/* Today Appointment Tab */}
                        <div className="tab-pane" id="today-appointments">
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Patient Name</th>
                                      <th>Appt Date</th>
                                      <th>Purpose</th>
                                      <th>Type</th>
                                      <th className="text-center">
                                        Paid Amount
                                      </th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient6.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Elsie Gilley <span>#PT0006</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          6.00 PM
                                        </span>
                                      </td>
                                      <td>Fever</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$300</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient7.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Joan Gardner <span>#PT0006</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          5.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$100</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient8.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Daniel Griffing <span>#PT0007</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          3.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$75</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient9.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Walter Roberson <span>#PT0008</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          1.00 PM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>Old Patient</td>
                                      <td className="text-center">$350</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient10.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Robert Rhodes <span>#PT0010</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          10.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$175</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            href="PatientProfile"
                                            className="avatar avatar-sm mr-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src="assets/img/patients/patient11.jpg"
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="PatientProfile">
                                            Harry Williams <span>#PT0011</span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        14 Nov 2019{" "}
                                        <span className="d-block text-info">
                                          11.00 AM
                                        </span>
                                      </td>
                                      <td>General</td>
                                      <td>New Patient</td>
                                      <td className="text-center">$450</td>
                                      <td className="text-right">
                                        <div className="table-action">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" /> View
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-success-light"
                                          >
                                            <i className="fas fa-check" />{" "}
                                            Accept
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-times" />{" "}
                                            Cancel
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Today Appointment Tab */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default DoctorRegisteredPtients;
