import { useState, FormEvent } from "react";
import axios from "../../config/axios";
import "./loginform.css";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      email: email,
      password: password,
    };

    try {
      // Send a POST request to your Spring Boot backend
      const response = await axios.post("auth/authenticate", data);

      // Check if the request was successful
      if (response.status) {
        // Handle successful login (redirect, update state, etc.)
        console.log("Login successful");
      } else {
        // Handle failed login (display error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup"); // Redirect to the sign-up page
  };
  return (
    <div className="container-xl">
      <div className="row">
        <div className="col">
          <div className="container">
            <div className="row logo">
              <img className="" src="../src/assets/corilus-logo.png" alt="" />
            </div>
            <div className="row picture">
              <img className="" src="../src/assets/corilus.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="col form">
          <div className="form-container pt-5">
            <h2>Sign in</h2>
            <p>Enter your email and password to login</p>
            <form onSubmit={handleSubmit} action="#" method="POST">
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  autoComplete="on"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  required
                />
              </div>
              <div className="container">
                <div className="row ">
                  <div className="col-8">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label">
                        Rememeber password
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <a href="">Forget password ?</a>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 pt-4">
                <button className="btn btn-primary" type="submit">
                  login
                </button>
              </div>
            </form>
            <div className="fs-6 pt-3">
              Don't have an account ?{" "}
              <a href="" onClick={handleSignUpClick}>
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
