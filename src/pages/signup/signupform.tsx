import React, { useState, FormEvent } from "react";
import axios from "../../config/axios";
import "./signupform.css";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  //ui states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<number>();

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/"); // Redirect to the sign-up page
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Prepare the data to send to the backend
    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      role: role,
      state: state,
      city: city,
      zipCode: zipCode,
      address: address,
    };

    try {
      // Send a POST request to your Spring Boot backend
      if (password === confirmPassword) {
        const response = await axios.post("auth/register", data);

        // Check if the request was successful
        if (response.status) {
          // Handle successful login (redirect, update state, etc.)
          console.log(data);
          console.log("Sign up successful");
        } else {
          // Handle failed login (display error message, etc.)
          console.error("Sign up failed");
        }
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error:", error);
    }
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
        <div className="col form-signup">
          <div className="form-container-signup pt-5">
            <h2>Sign up</h2>
            <p>Create your account</p>
            <form
              onSubmit={handleSubmit}
              action="#"
              method="POST"
              className="row g-3"
            >
              <div className="col-12">
                <label htmlFor="firstname" className="form-label">
                  Firstname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder=""
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder=""
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="City"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  className="form-control"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="zipCode" className="form-label">
                  Zip
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="zipCode"
                  onChange={(e) => setZipCode(Number(e.target.value))}
                />
              </div>
              <div className="col">
                <select
                  className="form-select custom-select-width"
                  onChange={(e) => setRole(e.target.value)}
                  value="1"
                >
                  <option selected>Select you role</option>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="NURSE">Nurse</option>
                </select>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary col-md-10">
                  Sign up
                </button>
              </div>
            </form>
            <div className="fs-6 pt-3 ">
              Already have an account ?{" "}
              <a href="" onClick={handleSignInClick}>
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
