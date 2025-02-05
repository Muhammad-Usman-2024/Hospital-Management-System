import React from "react";
import DoctorSidebar from "./DoctorSidebar";

const Invoices = () => {
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
                      Invoices
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Invoices</h2>
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
                <div className="card card-table">
                  <div className="card-body">
                    {/* Invoice Table */}
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Invoice No</th>
                            <th>Patient</th>
                            <th>Amount</th>
                            <th>Paid On</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0010</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="PatientProfile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/patients/patient.jpg"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="PatientProfile">
                                  Richard Wilson <span>#PT0016</span>
                                </a>
                              </h2>
                            </td>
                            <td>$450</td>
                            <td>14 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0009</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="PatientProfile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/patients/patient1.jpg"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="PatientProfile">
                                  Charlene Reed <span>#PT0001</span>
                                </a>
                              </h2>
                            </td>
                            <td>$200</td>
                            <td>13 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0008</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="PatientProfile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/patients/patient2.jpg"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="PatientProfile">
                                  Travis Trimble <span>#PT0002</span>
                                </a>
                              </h2>
                            </td>
                            <td>$100</td>
                            <td>12 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0007</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="PatientProfile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/patients/patient3.jpg"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="PatientProfile">
                                  Carl Kelly <span>#PT0003</span>
                                </a>
                              </h2>
                            </td>
                            <td>$350</td>
                            <td>11 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0006</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="PatientProfile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/patients/patient4.jpg"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="PatientProfile">
                                  Michelle Fairfax <span>#PT0004</span>
                                </a>
                              </h2>
                            </td>
                            <td>$275</td>
                            <td>10 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0005</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="PatientProfile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/patients/patient5.jpg"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="PatientProfile">
                                  Gina Moore <span>#PT0005</span>
                                </a>
                              </h2>
                            </td>
                            <td>$600</td>
                            <td>9 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0004</a>
                            </td>
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
                            <td>$50</td>
                            <td>8 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0003</a>
                            </td>
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
                                  Joan Gardner <span>#PT0007</span>
                                </a>
                              </h2>
                            </td>
                            <td>$400</td>
                            <td>7 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0002</a>
                            </td>
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
                                  Daniel Griffing <span>#PT0008</span>
                                </a>
                              </h2>
                            </td>
                            <td>$550</td>
                            <td>6 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="InvoiceView">#INV-0001</a>
                            </td>
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
                                  Walter Roberson <span>#PT0009</span>
                                </a>
                              </h2>
                            </td>
                            <td>$100</td>
                            <td>5 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <a
                                  href="InvoiceView"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye" /> View
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print" /> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* /Invoice Table */}
                  </div>
                </div>
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

export default Invoices;
