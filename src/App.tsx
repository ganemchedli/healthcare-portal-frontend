import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css";
//CSS & Bootstrap
import "./assets/css/style.css";

// import "./assets/js/bootstrap.min.js";

// import "./assets/css/select2.min.css";

//Font Awesome
// import "./assets/plugins/fontawesome/css/fontawesome.min.css";
// import "./assets/plugins/fontawesome/css/all.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/login/loginform";
import SignUpForm from "./pages/signup/signupform";
import Admin from "./pages/admin/admin";
import UserComponent from "./component/UserComponent";
import Profile from "./component/User/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/add-user" element={<UserComponent />} />
        <Route path="/update-user/:id" element={<UserComponent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
