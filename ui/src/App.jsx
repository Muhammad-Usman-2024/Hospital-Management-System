import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JS (bundle includes Popper.js)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Pages/Home";
import AddBilling from "./components/Pages/AddBilling";
import AddPrescription from "./components/Pages/AddPrescription";
import Appointments from "./components/Pages/Appointments";
import BlankPage from "./components/Pages/BlankPage";
import BookingSuccess from "./components/Pages/BookingSuccess";
import Booking from "./components/Pages/Booking";
import Calendar from "./components/Pages/Calendar";
import ChangePassword from "./components/Pages/ChangePassword";
import ChatDoctor from "./components/Pages/ChatDoctor";
import Chat from "./components/Pages/Chat";
import Checkout from "./components/Pages/Checkout";
import Components from "./components/Pages/Components";
import DoctorChangePassword from "./components/Pages/DoctorChangePassword";
import DoctorDashboard from "./components/Pages/DoctorDashboard";
import DoctorProfileSettings from "./components/Pages/DoctorProfileSettings";
import DoctorProfile from "./components/Pages/DoctorProfile";
import DoctorRegister from "./components/Pages/DoctorRegister";
import EditBilling from "./components/Pages/EditBilling";
import EditPrescription from "./components/Pages/EditPrescription";
import Favourites from "./components/Pages/Favourites";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Invoices from "./components/Pages/Invoices";
import InvoiceView from "./components/Pages/InvoiceView";
import Login from "./components/Pages/AdminLogin";
import MyPatients from "./components/Pages/MyPatients";
import PatientDashboard from "./components/Pages/PatientDashboard";
import PatientProfile from "./components/Pages/PatientProfile";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import ProfileSettings from "./components/Pages/ProfileSettings";
import Register from "./components/Pages/Register";
import Reviews from "./components/Pages/Reviews";
import ScheduleTimings from "./components/Pages/ScheduleTimings";
import Search from "./components/Pages/Search";
import SocialMedia from "./components/Pages/SocialMedia";
import TermCondition from "./components/Pages/Term&Condition";
import VideoCall from "./components/Pages/VideoCall";
import VoiceCall from "./components/Pages/VoiceCall";
import AdminLogin from "./components/Pages/AdminLogin";
import DoctorLogin from "./components/Pages/DoctorLogin";
import PatientLogin from "./components/Pages/PatientLogin";

import AdminDashboard from "./components/Pages/AdminDashboard";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {
//   fetchAdminData,
//   fetchAllDoctorsData,
//   fetchDoctorData,
//   fetchPatientData,
//   verifyAdminToken,
//   verifyDoctorToken,
//   verifyPatientToken,
// } from "./components/redux/thunks/thunks";

import AdminProfileSettings from "./components/Pages/AdminProfileSettings";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import DoctorRegisteredPtients from "./components/Pages/DoctorRegisteredPatients";
import ProtectedLayout from "./components/Pages/ProtectedRoute";

function App() {
  // const dispatch = useDispatch();
  // const adminAuthenticated = useSelector(
  //   (state) => state.admin.isAuthenticated
  // );
  // const doctorAuthenticated = useSelector(
  //   (state) => state.doctorLogin.isAuthenticated
  // );
  // const patientAuthenticated = useSelector(
  //   (state) => state.patientLogin.isAuthenticated
  // );

  // useEffect(() => {
  //   if (adminAuthenticated) dispatch(verifyAdminToken());
  //   if (doctorAuthenticated) dispatch(verifyDoctorToken());
  //   if (patientAuthenticated) dispatch(verifyPatientToken());
  // }, [dispatch, adminAuthenticated, doctorAuthenticated, patientAuthenticated]);

  // useEffect(() => {
  //   dispatch(fetchAllDoctorsData());
  //   dispatch(fetchAdminData());
  //   dispatch(fetchDoctorData());
  //   dispatch(fetchPatientData());
  // }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/DoctorLogin" element={<DoctorLogin />} />
            <Route path="/PatientLogin" element={<PatientLogin />} />
            <Route path="/DoctorRegister" element={<DoctorRegister />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Components" element={<Components />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/AddBilling" element={<AddBilling />} />
            <Route path="/AddPrescription" element={<AddPrescription />} />
            <Route path="/BlankPage" element={<BlankPage />} />
            <Route path="/Term&Condition" element={<TermCondition />} />
            <Route path="/VideoCall" element={<VideoCall />} />
            <Route path="/VoiceCall" element={<VoiceCall />} />
            <Route path="/EditBilling" element={<EditBilling />} />
            <Route path="/EditPrescription" element={<EditPrescription />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/InvoiceView" element={<InvoiceView />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

            {/* Protected Routes for Admin */}
            <Route
              element={
                <ProtectedLayout role="admin" redirectTo="/AdminLogin" />
              }
            >
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route
                path="/AdminProfileSettings"
                element={<AdminProfileSettings />}
              />
            </Route>

            {/* Protected Routes for Doctor */}
            <Route
              element={
                <ProtectedLayout role="doctor" redirectTo="/DoctorLogin" />
              }
            >
              <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
              <Route
                path="/DoctorPatients"
                element={<DoctorRegisteredPtients />}
              />
              <Route path="/Appointments" element={<Appointments />} />
              <Route path="/ChatDoctor" element={<ChatDoctor />} />
              <Route
                path="/DoctorChangePassword"
                element={<DoctorChangePassword />}
              />
              <Route
                path="/DoctorProfileSettings"
                element={<DoctorProfileSettings />}
              />
              <Route path="/PatientProfile" element={<PatientProfile />} />
              <Route path="/Invoices" element={<Invoices />} />
              <Route path="/MyPatients" element={<MyPatients />} />
              <Route path="/Reviews" element={<Reviews />} />
              <Route path="/SocialMedia" element={<SocialMedia />} />
              <Route path="/ScheduleTimings" element={<ScheduleTimings />} />
            </Route>

            {/* Protected Routes for Patient */}
            <Route
              element={
                <ProtectedLayout role="patient" redirectTo="/PatientLogin" />
              }
            >
              <Route path="/PatientDashboard" element={<PatientDashboard />} />
              <Route path="/BookingSuccess" element={<BookingSuccess />} />
              <Route path="/Booking/:doctorId" element={<Booking />} />
              <Route path="/ChangePassword" element={<ChangePassword />} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/DoctorProfile" element={<DoctorProfile />} />
              <Route path="/Favourites" element={<Favourites />} />
              <Route path="/ProfileSettings" element={<ProfileSettings />} />
              <Route path="/Search" element={<Search />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
