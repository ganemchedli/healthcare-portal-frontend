import React, { useState } from "react";
import "./signupform.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/AuthServices";

const SignupForm: React.FC = () => {
  //ui states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("MALE");
  const [state, setState] = useState<string>("");
  const [role, setRole] = useState<string>("PATIENT");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [birthday, setBirthDay] = useState<Date>();
  // file upload state
  const [image, setImage] = useState<File | null>(null);

  //Navigate hook
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Redirect to the sign-up page
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstname);
    formData.append("lastName", lastname);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("zipCode", String(zipCode));
    formData.append("address", address);
    formData.append("phoneNumber", String(phoneNumber));
    formData.append(
      "birthday",
      birthday ? birthday.toISOString().split("T")[0] : ""
    );

    formData.append("image", image as Blob);

    try {
      // Send a POST request to your Spring Boot backend
      if (password === confirmPassword && image) {
        console.log("Form data : ", formData);
        const response = await register(formData);

        const token = JSON.stringify(response.data.token);

        //Store token in localstorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("User email", response.data.email);
        localStorage.setItem("User role", response.data.role);
        // Check if the request was successful
        if (response.status == 200) {
          // Handle successful login (redirect, update state, etc.)
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
              navigate("/signup");
          }

          // Handle successful login (redirect, update state, etc.)
          console.log("Login successful");
          console.log("Response data", response.data);
        }
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Sign up failed:", error);
    }
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
              <div className="d-flex justify-content-between">
                <div className="col-5">
                  <label htmlFor="firstname" className="form-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-5">
                  <label htmlFor="lastname" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
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
                  required
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
                  placeholder="Street address of P.O box"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="+216 XX XXXX XXX"
                  onChange={(e) => setPhoneNumber(Number(e.target.value))}
                  required
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-5">
                  <label htmlFor="birthday" className="form-label">
                    Birthday
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    placeholder="City"
                    onChange={(e) => setBirthDay(new Date(e.target.value))}
                    required
                  />
                </div>
                <div className="col-5">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    name="gender"
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
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
                  required
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
                  required
                />
              </div>

              <div className="col-md-5">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
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
                  required
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="zipCode" className="form-label">
                  Zip
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="zipCode"
                  onChange={(e) => setZipCode(Number(e.target.value))}
                  required
                />
              </div>
              <div className="col-12">
                <select
                  className="form-select"
                  name="role"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  required
                >
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="NURSE">Nurse</option>
                </select>
              </div>
              {/* ******************* */}
              <div>
                Upload user image
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  required
                />
              </div>
              {/* ******************* */}
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
