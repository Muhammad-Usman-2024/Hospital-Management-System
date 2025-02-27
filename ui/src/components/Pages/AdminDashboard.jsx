import React, { useEffect } from "react";
import API_URL from "../../config/apiConfig";
import {
  useGetAdminDataQuery,
  useVerifyAdminTokenQuery,
} from "../redux/features/admin/adminApi";
import AdminSidebar from "./AdminSidebar";
import { useFetchAllDoctorsDataQuery } from "../redux/features/doctor/doctorApi";

const AdminDashboard = () => {
  const {
    data: adminData,
    isLoading: getdataLoading,
    error,
  } = useGetAdminDataQuery();
  const { data: verifyTokenData, isLoading: verifydataLoading } =
    useVerifyAdminTokenQuery();
  const { data: allDoctorsData, isLoading: allDoctorsLoading } =
    useFetchAllDoctorsDataQuery();
  const doctorsData = allDoctorsData?.data || [];
  if (getdataLoading || verifydataLoading) {
    return <p>Loading...</p>;
  }

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
                      Dashboard
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Dashboard</h2>
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
                <AdminSidebar />
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
                                <h6>Total Doctors</h6>
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
                                <h6>Today Doctors</h6>
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
                    <h4 className="mb-4">Registered Doctors</h4>
                    <div className="appointment-tab">
                      {/* Appointment Tab */}

                      {/* /Appointment Tab */}
                      <div className="tab-content">
                        {/* Upcoming Appointment Tab */}
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
                                      <th>Name Name</th>
                                      <th>Email</th>
                                      <th>PhoneNumber</th>
                                      <th>Specialization</th>

                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(doctorsData) &&
                                    doctorsData.length > 0 ? (
                                      doctorsData.map((data, index) => (
                                        <tr key={data._id}>
                                          <td>
                                            <h2 className="table-avatar">
                                              <a
                                                href="PatientProfile"
                                                className="avatar avatar-sm mr-2"
                                              >
                                                <img
                                                  className="avatar-img rounded-circle"
                                                  src={`${API_URL}/${data.avatar}`}
                                                  alt="User Image"
                                                />
                                              </a>
                                              <a href="PatientProfile">
                                                {data.username}
                                              </a>
                                            </h2>
                                          </td>
                                          <td>{data.email}</td>
                                          <td>{data.phoneNumber}</td>
                                          <td>
                                            {
                                              data.servicesAndSpecialization
                                                .specializations[0]
                                            }
                                          </td>
                                          <td className="text-right">
                                            <div className="table-action">
                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-info-light"
                                              >
                                                <i className="far fa-eye" />{" "}
                                                View
                                              </a>

                                              <a
                                                href="javascript:void(0);"
                                                className="btn btn-sm bg-danger-light"
                                              >
                                                <i className="fas fa-times" />{" "}
                                                Delete
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="5">No data available</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default AdminDashboard;
