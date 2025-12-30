import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Service from "./pages/Service";
import Doctor from "./pages/Doctor";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home"; 

 

// MANAGEMENT
import Dashboard from "./components/Management/Dashboard";
import ManagementLayout from "./components/Management/ManagementLayout";
import DoctorManagement from "./components/Management/DoctorManagement";
import Patient from "./components/Management/Patient";
import Staff from "./components/Management/Staff";
import Chat from "./components/Management/Chat";
// DOCTOR
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import DoctorLayout from "./components/Doctor/DoctorLayout";
import Patients from "./components/Doctor/Patients";
import Appointments from "./components/Doctor/Appointments";
import Chats from "./components/Doctor/Chats";
import StaffLayout from "./components/Staff/StaffLayout";
import StaffDashboard from "./components/Staff/StaffDashboard";
// USER
import UserLayout from "./components/User/UserLayout";
import UserDashboard from "./components/User/UserDashboard";
import UserAppointments from "./components/User/UserAppointments";
import FindDoctoers from "./components/User/FindDoctoers";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="all-doctors" element={<Doctor />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        // USER
        <Route path="/patient" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="doctors" element={<FindDoctoers />} />
          <Route path="staff" element={<Staff />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        // MANAGEMENT
        <Route path="/management" element={<ManagementLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctor" element={<DoctorManagement />} />
          <Route path="patient" element={<Patient />} />
          <Route path="staff" element={<Staff />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        // DOCTOR
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patient" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="chat" element={<Chats />} />
        </Route>
        // STAFF
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
