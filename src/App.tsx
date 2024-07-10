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
import AddUserComponent from "./component/addUser";
import UpdateUserComponent from "./component/updateUser";
import ListUsersComponent from "./component/listUsersComponent";
import Profile from "./component/User/profile";
import ListOfPatients from "./component/listofpatients";
import Doctor from "./pages/doctor/doctor";
import Patient from "./pages/patient/patient";
import ElectronicMedicalRecordComponent from "./component/electronicmedicalrecord";
import AppointmentComponent from "./component/appointment";
import MessagesComponent from "./component/messaging";

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
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/add-user" element={<AddUserComponent />} />
        <Route path="/update-user/:id" element={<UpdateUserComponent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route
            path="users"
            element={<ListUsersComponent></ListUsersComponent>}
          />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
