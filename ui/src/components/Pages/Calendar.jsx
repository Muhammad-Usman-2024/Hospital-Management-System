import React from "react";

const Calendar = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Calendar
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Calendar</h2>
              </div>
              <div className="col-auto text-right float-right ml-auto">
                <a
                  href="#"
                  className="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#add_event"
                >
                  Create Event
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Drag & Drop Event</h4>
                  </div>
                  <div className="card-body">
                    <div id="calendar-events" className="mb-3">
                      <div className="calendar-events" data-className="bg-info">
                        <i className="fas fa-circle text-info"></i> My Event One
                      </div>
                      <div
                        className="calendar-events"
                        data-className="bg-success"
                      >
                        <i className="fas fa-circle text-success"></i> My Event
                        Two
                      </div>
                      <div
                        className="calendar-events"
                        data-className="bg-danger"
                      >
                        <i className="fas fa-circle text-danger"></i> My Event
                        Three
                      </div>
                      <div
                        className="calendar-events"
                        data-className="bg-warning"
                      >
                        <i className="fas fa-circle text-warning"></i> My Event
                        Four
                      </div>
                    </div>
                    <div className="checkbox mb-3">
                      <input id="drop-remove" type="checkbox" />
                      <label for="drop-remove">Remove after drop</label>
                    </div>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#add_new_event"
                      className="btn btn-primary btn-block"
                    >
                      <i className="fas fa-plus"></i> Add Category
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="card">
                  <div className="card-body">
                    <div id="calendar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="add_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Event</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    Event Name <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>
                    Event Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <input
                      className="form-control datetimepicker"
                      type="text"
                    />
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal custom-modal fade none-border" id="my_event">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Event</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-success save-event submit-btn"
              >
                Create event
              </button>
              <button
                type="button"
                className="btn btn-danger delete-event submit-btn"
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal custom-modal fade" id="add_new_event">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Category</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    className="form-control form-white"
                    placeholder="Enter name"
                    type="text"
                    name="category-name"
                  />
                </div>
                <div className="form-group">
                  <label>Choose Category Color</label>
                  <select
                    className="form-control form-white"
                    data-placeholder="Choose a color..."
                    name="category-color"
                  >
                    <option value="success">Success</option>
                    <option value="danger">Danger</option>
                    <option value="info">Info</option>
                    <option value="primary">Primary</option>
                    <option value="warning">Warning</option>
                    <option value="inverse">Inverse</option>
                  </select>
                </div>
                <div className="submit-section text-center">
                  <button
                    type="button"
                    className="btn btn-primary save-category submit-btn"
                    data-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
