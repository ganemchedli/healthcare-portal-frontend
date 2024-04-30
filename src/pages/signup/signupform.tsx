import React, { useState, FormEvent } from "react";
import axios from "../../config/axios";
import "./signupform.css";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prepare the data to send to the backend
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      // Send a POST request to your Spring Boot backend
      if (password === confirmPassword) {
        const response = await axios.post("auth/register", data);

        // Check if the request was successful
        if (response.status) {
          // Handle successful login (redirect, update state, etc.)
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
        <div className="col form">
          <div className="form-container pt-5">
            <h2>Sign up</h2>
            <p>Create your account</p>
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fistname" className="form-label">
                  Firstname
                </label>
                <input type="text" className="form-control" id="firstname" />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input type="text " className="form-control" id="lastname" />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select id="inputState" className="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Zip
                </label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
