import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./pages/login/loginform";
import SignUpForm from "./pages/signup/signupform";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
