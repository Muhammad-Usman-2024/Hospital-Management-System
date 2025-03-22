import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API_URL from "../../config/apiConfig";
import { Link } from "react-router-dom";

const Search = () => {
  const {
    doctorsData = [],
    isLoading: isDoctorLoading,
    error: doctorError,
  } = useSelector((state) => state.allDoctorsData);
  console.log(doctorsData);

  const [selectedDate, setSelectedDate] = useState("");
  const [genderFilter, setGenderFilter] = useState([]);
  const [specialistFilter, setSpecialistFilter] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Update filteredDoctors when doctorsData or filters change

  // Handle Date Change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle Gender Selection
  const handleGenderChange = (gender) => {
    const updatedGender = genderFilter.includes(gender)
      ? genderFilter.filter((g) => g !== gender)
      : [...genderFilter, gender];
    setGenderFilter(updatedGender);
  };

  // Handle Specialist Selection
  const handleSpecialistChange = (specialization) => {
    const updatedSpecialist = specialistFilter.includes(specialization)
      ? specialistFilter.filter((s) => s !== specialization)
      : [...specialistFilter, specialization];
    setSpecialistFilter(updatedSpecialist);
  };

  // Filter Doctors Based on Criteria
  const filterDoctors = () => {
    let filtered = doctorsData || [];

    if (genderFilter.length > 0) {
      filtered = filtered.filter((doc) => genderFilter.includes(doc.gender));
    }

    if (specialistFilter.length > 0) {
      filtered = filtered.filter((doc) =>
        specialistFilter.includes(doc.servicesAndSpecialization?.services?.[0])
      );
    }

    setFilteredDoctors(filtered);
  };
  useEffect(() => {
    if (isDoctorLoading === false && doctorsData?.length > 0) {
      filterDoctors();
    }
  }, [isDoctorLoading, doctorsData, genderFilter, specialistFilter]);

  if (isDoctorLoading) {
    return <p>Loading data...</p>;
  }

  // if (doctorError) {
  //   return <p>Error: {doctorError}</p>;
  // }

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-8 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Search
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">
                  2245 matches found for : Dentist In Bangalore
                </h2>
              </div>
              <div className="col-md-4 col-12 d-md-block d-none">
                <div className="sort-by">
                  <span className="sort-title">Sort by</span>
                  <span className="sortby-fliter">
                    <select className="select">
                      <option>Select</option>
                      <option className="sorting">Rating</option>
                      <option className="sorting">Popular</option>
                      <option className="sorting">Latest</option>
                      <option className="sorting">Free</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
                {/* Search Filter */}

                <div className="card search-filter">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Search Filter</h4>
                  </div>
                  <div className="card-body">
                    <div className="filter-widget">
                      <div className="cal-icon">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Select Date"
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                    <div className="filter-widget">
                      <h4>Gender</h4>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="gender_type"
                            onChange={() => handleGenderChange("Male")}
                            checked={genderFilter.includes("Male")}
                          />
                          <span className="checkmark" /> Male Doctor
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="gender_type"
                            onChange={() => handleGenderChange("Female")}
                            checked={genderFilter.includes("Female")}
                          />
                          <span className="checkmark" /> Female Doctor
                        </label>
                      </div>
                    </div>
                    <div className="filter-widget">
                      <h4>Select Specialist</h4>
                      {[
                        "Urology",
                        "Neurology",
                        "Dentist",
                        "Orthopedic",
                        "Cardiologist",
                      ].map((specialist) => (
                        <div key={specialist}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              onChange={() =>
                                handleSpecialistChange(specialist)
                              }
                              checked={specialistFilter.includes(specialist)}
                            />
                            <span className="checkmark" /> {specialist}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="btn-search">
                      <button
                        type="button"
                        className="btn btn-block"
                        onClick={filterDoctors}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                {/* /Search Filter */}
              </div>
              <div className="col-md-12 col-lg-8 col-xl-9">
                {filteredDoctors.map((doctor, index) => (
                  <div className="card" key={index}>
                    <div className="card-body">
                      <div className="doctor-widget">
                        <div className="doc-info-left">
                          <div className="doctor-img">
                            {/* Using React Router Link for navigation */}
                            <Link to={`/DoctorProfile/${doctor._id}`}>
                              <img
                                src={`${API_URL}/${doctor.avatar}`}
                                className="img-fluid" // Adjust width and height using Bootstrap classes
                                alt={doctor.username || "Doctor"}
                              />
                            </Link>
                          </div>
                          <div className="doc-info-cont">
                            <h4 className="doc-name">
                              <Link to={`/DoctorProfile/${doctor._id}`}>
                                {doctor.username}
                              </Link>
                            </h4>
                            <p className="doc-speciality">
                              {doctor.servicesAndSpecialization
                                ?.services?.[0] ||
                                "Specialization not available"}
                            </p>
                            <h5 className="doc-department">
                              <img
                                src="assets/img/specialities/specialities-05.png"
                                className="img-fluid"
                                alt="Speciality"
                              />
                              {doctor.servicesAndSpecialization
                                ?.specializations?.[0] ||
                                "Services not available"}
                            </h5>
                            <div className="rating">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star" />
                              <span className="d-inline-block average-rating">
                                (17)
                              </span>
                            </div>
                            <div className="clinic-details">
                              <p className="doc-location">
                                <i className="fas fa-map-marker-alt" /> Florida,
                                USA
                              </p>
                              <ul className="clinic-gallery">
                                <li>
                                  <a
                                    href="assets/img/features/feature-01.jpg"
                                    data-fancybox="gallery"
                                  >
                                    <img
                                      src="assets/img/features/feature-01.jpg"
                                      alt="Feature"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="assets/img/features/feature-02.jpg"
                                    data-fancybox="gallery"
                                  >
                                    <img
                                      src="assets/img/features/feature-02.jpg"
                                      alt="Feature"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="assets/img/features/feature-03.jpg"
                                    data-fancybox="gallery"
                                  >
                                    <img
                                      src="assets/img/features/feature-03.jpg"
                                      alt="Feature"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="assets/img/features/feature-04.jpg"
                                    data-fancybox="gallery"
                                  >
                                    <img
                                      src="assets/img/features/feature-04.jpg"
                                      alt="Feature"
                                    />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="clinic-services">
                              <span>Dental Fillings</span>
                              <span> Whitening</span>
                            </div>
                          </div>
                        </div>
                        <div className="doc-info-right">
                          <div className="clini-infos">
                            <ul>
                              <li>
                                <i className="far fa-thumbs-up" /> 98%
                              </li>
                              <li>
                                <i className="far fa-comment" /> 17 Feedback
                              </li>
                              <li>
                                <i className="fas fa-map-marker-alt" /> Florida,
                                USA
                              </li>
                              <li>
                                <i className="far fa-money-bill-alt" /> $300 -
                                $1000{" "}
                                <i
                                  className="fas fa-info-circle"
                                  data-toggle="tooltip"
                                  title="Lorem Ipsum"
                                />
                              </li>
                            </ul>
                          </div>
                          <div className="clinic-booking">
                            <Link
                              to={`/DoctorProfile/${doctor._id}`}
                              className="view-pro-btn"
                            >
                              View Profile
                            </Link>
                            <Link
                              to={`/Booking/${doctor._id}`}
                              className="apt-btn"
                            >
                              Book Appointment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* // Doctor Widget */}
                {/* <div className="card">
                  <div className="card-body">
                    <div className="doctor-widget">
                      <div className="doc-info-left">
                        <div className="doctor-img">
                          <a href="DoctorProfile">
                            <img
                              src="assets/img/doctors/doctor-thumb-01.jpg"
                              className="img-fluid"
                              alt="User Image"
                            />
                          </a>
                        </div>
                        <div className="doc-info-cont">
                          <h4 className="doc-name">
                            <a href="DoctorProfile">Dr. Ruby Perrin</a>
                          </h4>
                          <p className="doc-speciality">
                            MDS - Periodontology and Oral Implantology, BDS
                          </p>
                          <h5 className="doc-department">
                            <img
                              src="assets/img/specialities/specialities-05.png"
                              className="img-fluid"
                              alt="Speciality"
                            />
                            Dentist
                          </h5>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                            <span className="d-inline-block average-rating">
                              (17)
                            </span>
                          </div>
                          <div className="clinic-details">
                            <p className="doc-location">
                              <i className="fas fa-map-marker-alt" /> Florida,
                              USA
                            </p>
                            <ul className="clinic-gallery">
                              <li>
                                <a
                                  href="assets/img/features/feature-01.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-01.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-02.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-02.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-03.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-03.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-04.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-04.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="clinic-services">
                            <span>Dental Fillings</span>
                            <span> Whitneing</span>
                          </div>
                        </div>
                      </div>
                      <div className="doc-info-right">
                        <div className="clini-infos">
                          <ul>
                            <li>
                              <i className="far fa-thumbs-up" /> 98%
                            </li>
                            <li>
                              <i className="far fa-comment" /> 17 Feedback
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" /> Florida,
                              USA
                            </li>
                            <li>
                              <i className="far fa-money-bill-alt" /> $300 -
                              $1000{" "}
                              <i
                                className="fas fa-info-circle"
                                data-toggle="tooltip"
                                title="Lorem Ipsum"
                              />{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="clinic-booking">
                          <a className="view-pro-btn" href="DoctorProfile">
                            View Profile
                          </a>
                          <a className="apt-btn" href="Booking">
                            Book Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* //Doctor Widget  */}
                {/* Doctor Widget */}
                {/* <div className="card">
                  <div className="card-body">
                    <div className="doctor-widget">
                      <div className="doc-info-left">
                        <div className="doctor-img">
                          <a href="DoctorProfile">
                            <img
                              src="assets/img/doctors/doctor-thumb-02.jpg"
                              className="img-fluid"
                              alt="User Image"
                            />
                          </a>
                        </div>
                        <div className="doc-info-cont">
                          <h4 className="doc-name">
                            <a href="DoctorProfile">Dr. Darren Elder</a>
                          </h4>
                          <p className="doc-speciality">
                            BDS, MDS - Oral &amp; Maxillofacial Surgery
                          </p>
                          <h5 className="doc-department">
                            <img
                              src="assets/img/specialities/specialities-05.png"
                              className="img-fluid"
                              alt="Speciality"
                            />
                            Dentist
                          </h5>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                            <span className="d-inline-block average-rating">
                              (35)
                            </span>
                          </div>
                          <div className="clinic-details">
                            <p className="doc-location">
                              <i className="fas fa-map-marker-alt" /> Newyork,
                              USA
                            </p>
                            <ul className="clinic-gallery">
                              <li>
                                <a
                                  href="assets/img/features/feature-01.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-01.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-02.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-02.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-03.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-03.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-04.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-04.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="clinic-services">
                            <span>Dental Fillings</span>
                            <span> Whitneing</span>
                          </div>
                        </div>
                      </div>
                      <div className="doc-info-right">
                        <div className="clini-infos">
                          <ul>
                            <li>
                              <i className="far fa-thumbs-up" /> 100%
                            </li>
                            <li>
                              <i className="far fa-comment" /> 35 Feedback
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" /> Newyork,
                              USA
                            </li>
                            <li>
                              <i className="far fa-money-bill-alt" /> $50 - $300{" "}
                              <i
                                className="fas fa-info-circle"
                                data-toggle="tooltip"
                                title="Lorem Ipsum"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="clinic-booking">
                          <a className="view-pro-btn" href="DoctorProfile">
                            View Profile
                          </a>
                          <a className="apt-btn" href="Booking">
                            Book Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /Doctor Widget */}
                {/* Doctor Widget */}
                {/* <div className="card">
                  <div className="card-body">
                    <div className="doctor-widget">
                      <div className="doc-info-left">
                        <div className="doctor-img">
                          <a href="DoctorProfile">
                            <img
                              src="assets/img/doctors/doctor-thumb-03.jpg"
                              className="img-fluid"
                              alt="User Image"
                            />
                          </a>
                        </div>
                        <div className="doc-info-cont">
                          <h4 className="doc-name">
                            <a href="DoctorProfile">Dr. Deborah Angel</a>
                          </h4>
                          <p className="doc-speciality">
                            MBBS, MD - General Medicine, DNB - Cardiology
                          </p>
                          <p className="doc-department">
                            <img
                              src="assets/img/specialities/specialities-04.png"
                              className="img-fluid"
                              alt="Speciality"
                            />
                            Cardiology
                          </p>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                            <span className="d-inline-block average-rating">
                              (27)
                            </span>
                          </div>
                          <div className="clinic-details">
                            <p className="doc-location">
                              <i className="fas fa-map-marker-alt" /> Georgia,
                              USA
                            </p>
                            <ul className="clinic-gallery">
                              <li>
                                <a
                                  href="assets/img/features/feature-01.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-01.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-02.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-02.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-03.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-03.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-04.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-04.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="clinic-services">
                            <span>Dental Fillings</span>
                            <span> Whitneing</span>
                          </div>
                        </div>
                      </div>
                      <div className="doc-info-right">
                        <div className="clini-infos">
                          <ul>
                            <li>
                              <i className="far fa-thumbs-up" /> 99%
                            </li>
                            <li>
                              <i className="far fa-comment" /> 35 Feedback
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" /> Newyork,
                              USA
                            </li>
                            <li>
                              <i className="far fa-money-bill-alt" /> $100 -
                              $400{" "}
                              <i
                                className="fas fa-info-circle"
                                data-toggle="tooltip"
                                title="Lorem Ipsum"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="clinic-booking">
                          <a className="view-pro-btn" href="DoctorProfile">
                            View Profile
                          </a>
                          <a className="apt-btn" href="Booking">
                            Book Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /Doctor Widget */}
                {/* Doctor Widget */}
                {/* <div className="card">
                  <div className="card-body">
                    <div className="doctor-widget">
                      <div className="doc-info-left">
                        <div className="doctor-img">
                          <a href="DoctorProfile">
                            <img
                              src="assets/img/doctors/doctor-thumb-04.jpg"
                              className="img-fluid"
                              alt="User Image"
                            />
                          </a>
                        </div>
                        <div className="doc-info-cont">
                          <h4 className="doc-name">
                            <a href="DoctorProfile">Dr. Sofia Brient</a>
                          </h4>
                          <p className="doc-speciality">
                            MBBS, MS - General Surgery, MCh - Urology
                          </p>
                          <p className="doc-department">
                            <img
                              src="assets/img/specialities/specialities-01.png"
                              className="img-fluid"
                              alt="Speciality"
                            />
                            Urology
                          </p>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                            <span className="d-inline-block average-rating">
                              (4)
                            </span>
                          </div>
                          <div className="clinic-details">
                            <p className="doc-location">
                              <i className="fas fa-map-marker-alt" /> Louisiana,
                              USA
                            </p>
                            <ul className="clinic-gallery">
                              <li>
                                <a
                                  href="assets/img/features/feature-01.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-01.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-02.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-02.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-03.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-03.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-04.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-04.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="clinic-services">
                            <span>Dental Fillings</span>
                            <span> Whitneing</span>
                          </div>
                        </div>
                      </div>
                      <div className="doc-info-right">
                        <div className="clini-infos">
                          <ul>
                            <li>
                              <i className="far fa-thumbs-up" /> 97%
                            </li>
                            <li>
                              <i className="far fa-comment" /> 4 Feedback
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" /> Newyork,
                              USA
                            </li>
                            <li>
                              <i className="far fa-money-bill-alt" /> $150 -
                              $250{" "}
                              <i
                                className="fas fa-info-circle"
                                data-toggle="tooltip"
                                title="Lorem Ipsum"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="clinic-booking">
                          <a className="view-pro-btn" href="DoctorProfile">
                            View Profile
                          </a>
                          <a className="apt-btn" href="Booking">
                            Book Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /Doctor Widget */}
                {/* Doctor Widget */}
                {/* <div className="card">
                  <div className="card-body">
                    <div className="doctor-widget">
                      <div className="doc-info-left">
                        <div className="doctor-img">
                          <a href="DoctorProfile">
                            <img
                              src="assets/img/doctors/doctor-thumb-06.jpg"
                              className="img-fluid"
                              alt="User Image"
                            />
                          </a>
                        </div>
                        <div className="doc-info-cont">
                          <h4 className="doc-name">
                            <a href="DoctorProfile">Dr. Katharine Berthold</a>
                          </h4>
                          <p className="doc-speciality">
                            MS - Orthopaedics, MBBS, M.Ch - Orthopaedics
                          </p>
                          <p className="doc-department">
                            <img
                              src="assets/img/specialities/specialities-03.png"
                              className="img-fluid"
                              alt="Speciality"
                            />
                            Orthopaedics
                          </p>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star" />
                            <span className="d-inline-block average-rating">
                              (52)
                            </span>
                          </div>
                          <div className="clinic-details">
                            <p className="doc-location">
                              <i className="fas fa-map-marker-alt" /> Texas, USA
                            </p>
                            <ul className="clinic-gallery">
                              <li>
                                <a
                                  href="assets/img/features/feature-01.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-01.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-02.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-02.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-03.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-03.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="assets/img/features/feature-04.jpg"
                                  data-fancybox="gallery"
                                >
                                  <img
                                    src="assets/img/features/feature-04.jpg"
                                    alt="Feature"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="clinic-services">
                            <span>Dental Fillings</span>
                            <span> Whitneing</span>
                          </div>
                        </div>
                      </div>
                      <div className="doc-info-right">
                        <div className="clini-infos">
                          <ul>
                            <li>
                              <i className="far fa-thumbs-up" /> 100%
                            </li>
                            <li>
                              <i className="far fa-comment" /> 52 Feedback
                            </li>
                            <li>
                              <i className="fas fa-map-marker-alt" /> Texas, USA
                            </li>
                            <li>
                              <i className="far fa-money-bill-alt" /> $100 -
                              $500{" "}
                              <i
                                className="fas fa-info-circle"
                                data-toggle="tooltip"
                                title="Lorem Ipsum"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="clinic-booking">
                          <a className="view-pro-btn" href="DoctorProfile">
                            View Profile
                          </a>
                          <a className="apt-btn" href="Booking">
                            Book Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /Doctor Widget */}
                <div className="load-more text-center">
                  <a
                    className="btn btn-primary btn-sm"
                    href="javascript:void(0);"
                  >
                    Load More
                  </a>
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
export default Search;
