import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css";
//CSS & Bootstrap
import "./assets/css/style.css";

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/login/loginform";
import SignUpForm from "./pages/signup/signupform";
import Admin from "./pages/admin/admin";
import AddUserComponent from "./component/AddUser";
import ListUsersComponent from "./component/ListUsersComponent";
import Profile from "./component/User/profile";
import ListAppointments from "./component/ListAppointments";
import Doctor from "./pages/doctor/doctor";
import Patient from "./pages/patient/patient";
import Nurse from "./pages/nurse/nurse";
import Home from "./pages/Home";

function App() {
  // State to manage the visibility of the sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/add-user" element={<AddUserComponent />} />
        {/* <Route path="/update-user/:id" element={<UpdateUserComponent />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/nurse" element={<Nurse />} />
        <Route path="/admin" element={<Admin />}>
          <Route
            path="users"
            element={<ListUsersComponent></ListUsersComponent>}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<ListAppointments />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
