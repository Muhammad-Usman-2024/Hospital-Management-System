import { Link } from "react-router-dom";

const LoginModel = ({ isOpen, onClose, heading, type }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="modal fade show"
        style={{ display: "block" }}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">{heading}</h5>
              <button
                type="button"
                className="close"
                onClick={onClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <div className="d-flex flex-column align-items-center py-4">
                <Link
                  to={`/AdminLogin`} // dynamic path based on type prop
                  className="btn btn-outline-primary mb-3"
                  style={{ width: "80%" }}
                >
                  Admin Login
                </Link>
                <Link
                  to={`/DoctorLogin`} // dynamic path based on type prop
                  className="btn btn-outline-primary mb-3"
                  style={{ width: "80%" }}
                >
                  Doctor Login
                </Link>
                <Link
                  to={`/PatientLogin`} // dynamic path based on type prop
                  className="btn btn-outline-primary"
                  style={{ width: "80%" }}
                >
                  Patient Login
                </Link>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModel;
