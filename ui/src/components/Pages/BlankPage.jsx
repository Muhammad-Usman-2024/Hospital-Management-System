import React from "react";

const BlankPage = () => {
  return (
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
                    Blank Page
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Blank Page</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h5>Blank Page</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankPage;
