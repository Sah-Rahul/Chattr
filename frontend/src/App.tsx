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
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import DoctorLayout from "./components/Doctor/DoctorLayout";
import Patients from "./components/Doctor/Patients";
import Appointments from "./components/Doctor/Appointments";
import Chats from "./components/Doctor/Chats";
// DOCTOR

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="doctors" element={<Doctor />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/management" element={<ManagementLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctor" element={<DoctorManagement />} />
          <Route path="patient" element={<Patient />} />
          <Route path="staff" element={<Staff />} />
          <Route path="chat" element={<Chat />} />
        </Route>

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patient" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="chat" element={<Chats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
