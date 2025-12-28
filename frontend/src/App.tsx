import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Doctor from "./pages/Doctor";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={ <About />} />
          <Route path="service" element={ <Service />} />
          <Route path="doctor" element={ <Doctor />} />
          <Route path="contact-us" element={ <Contact />} />
          <Route path="login" element={ <Login />} />
          <Route path="signup" element={ <Signup />} />




        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
