import { useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "../services/UserServices";
import { useNavigate } from "react-router-dom";

interface UserComponentProps {
  id: number | undefined;
}

const UserComponent: React.FC<UserComponentProps> = (id) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<number>();
  const [role, setRole] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [birthday, setBirthDay] = useState<string>("");

  // const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    zipCode: 0,
    role: "",
    birthday: "",
    phoneNumber: 0,
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setAddress(response.data.address);
          setState(response.data.state);
          setCity(response.data.city);
          setZipCode(response.data.zipCode);
          setRole(response.data.role);
          setPhoneNumber(response.data.phoneNumber);
          setBirthDay(response.data.birthday);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateUser = (e: any) => {
    e.preventDefault();
    console.log("validateForm value", validateForm());
    const user = {
      firstName,
      lastName,
      email,
      password,
      address,
      state,
      city,
      zipCode,
      role,
      phoneNumber,
      birthday,
    };
    if (validateForm()) {
      if (id) {
        updateUser(id, user)
          .then((response) => {
            console.log("Updated id", response.data);
            navigator("/admin");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createUser(user)
          .then((response) => {
            console.log("User has been created", response.data);
            navigator("/admin");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required ";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required ";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required ";
      valid = false;
    }
    if (state.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.state = "State is required ";
      valid = false;
    }
    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required ";
      valid = false;
    }
    if (zipCode) {
      errorsCopy.zipCode = 0;
    } else {
      errorsCopy.email = "Zip code is required ";
      valid = false;
    }
    if (address.trim()) {
      errorsCopy.address = "";
    } else {
      errorsCopy.email = "address is required ";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update User</h2>;
    } else {
      return <h2 className="text-center">Add User</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-mid-6 offset-mid-3 offset-mid-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="row">
                <div className="form-group mb-2 col">
                  <label className="form-label"> First Name :</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    className={`form-control ${
                      errors.firstName ? "is-invlaid" : ""
                    }`}
                    placeholder="Enter user firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="form-group mb-2 col">
                  <label className="form-label"> Last Name :</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    className={`form-control ${
                      errors.lastName ? "is-invlaid" : ""
                    }`}
                    placeholder="Enter user lastname"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email :</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="form-control"
                  placeholder="Enter user email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="row">
                <div className="form-group mb-2 col">
                  <label className="form-label">Password :</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="form-control"
                    placeholder="Enter user password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group mb-2 col">
                  <label className="form-label">Confirm password :</label>
                  <input
                    type="password"
                    name="password"
                    value={confirmedPassword}
                    className="form-control"
                    placeholder="Enter user password"
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Address :</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  className="form-control"
                  placeholder="Enter user address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Phone Number :</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  className="form-control"
                  placeholder=""
                  onChange={(e) => setPhoneNumber(Number(e.target.value))}
                />
                {/* {errors.zipCode && (
                  <div className="invalid-feedback">{errors.zipCode}</div>
                )} */}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Birthday :</label>
                <input
                  type="date"
                  name="birthday"
                  value={birthday}
                  className="form-control"
                  placeholder=""
                  onChange={(e) => setBirthDay(e.target.value)}
                />
                {/* {errors.zipCode && (
                  <div className="invalid-feedback">{errors.zipCode}</div>
                )} */}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">State :</label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  className="form-control"
                  placeholder="Enter user state"
                  onChange={(e) => setState(e.target.value)}
                />
                {errors.state && (
                  <div className="invalid-feedback">{errors.state}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">City :</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  className="form-control"
                  placeholder="Enter user city"
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Zip code :</label>
                <input
                  type="text"
                  name="zipCode"
                  value={zipCode}
                  className="form-control"
                  placeholder="Enter zip code"
                  onChange={(e) => setZipCode(Number(e.target.value))}
                />
                {/* {errors.zipCode && (
                  <div className="invalid-feedback">{errors.zipCode}</div>
                )} */}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Select role: </label>
                <div>
                  <input
                    type="radio"
                    id="patient"
                    name="role"
                    value="PATIENT"
                    checked={role === "PATIENT"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="patient">Patient</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="doctor"
                    name="role"
                    value="DOCTOR"
                    checked={role === "DOCTOR"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="doctor">Doctor</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="nurse"
                    name="role"
                    value="NURSE"
                    checked={role === "NURSE"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="nurse">Nurse</label>
                </div>
              </div>

              {/* <div className="form-group mb-2">
                <label className="form-label">Select role: </label>
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
              </div> */}
              <button className="btn btn-success" onClick={saveOrUpdateUser}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
