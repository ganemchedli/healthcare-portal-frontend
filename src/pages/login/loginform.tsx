import { useState, FormEvent } from "react";
import { authenticate } from "../../services/AuthServices";
import "./loginform.css";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { notification } from "antd";

const LoginForm: React.FC = () => {
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      email: email,
      password: password,
    };

    try {
      // Send a POST request to your Spring Boot backend
      const response = await authenticate(data);

      // Check if the request was successful
      if (response.status) {
        // Extract the token from the response data
        const token = JSON.stringify(response.data.token);

        //Store token in localstorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("User email", response.data.email);
        localStorage.setItem("User role", response.data.role);

        notification.success({
          message: "Login Successfully",
          description: "Welcome to you profile !",
        });
        switch (response.data.role) {
          case "ADMIN":
            navigate("/admin/users");
            break;
          case "PATIENT":
            navigate("/patient");
            break;
          case "DOCTOR":
            navigate("/doctor");
            break;
          case "NURSE":
            navigate("/nurse");
            break;
          default:
            navigate("/login");
        }
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      notification.error({
        message: "Error login to your accout",
        description: "There was a problem while logging in.",
      });
      console.error("Error:", error);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Redirect to the sign-up page
  };

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col">
          <div className="container">
            <div className="row logo">
              <a href="/">
                <img className="" src="../src/assets/corilus-logo.png" alt="" />
              </a>
            </div>
            <div className="row picture">
              <img className="" src="../src/assets/corilus.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="col form-login">
          <div className="form-container-login pt-5">
            <h2>Sign in</h2>
            <p>Enter your email and password to login</p>
            <form onSubmit={handleSubmit} action="#" method="POST">
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email or username:
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
                <div className="row">
                  <div className="col-7">
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
                  <div className="col-5">
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
