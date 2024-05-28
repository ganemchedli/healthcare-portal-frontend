import { useState, useEffect } from "react";
import StudentHeader from "../header";
import Footer from "../../footer";
import { User11 } from "../../imagepath";
import { Link } from "react-router-dom";
import UserSideBar from "../sidebar";
import Select from "react-select";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../../services/UserServices";
import axios from "../../../config/axios";

interface UserData {
  id: Number;
  firstName: String;
  lastName: String;
  password: String;
  address: String;
  state: String;
  city: String;
  zipCode: Number;
  role: String;
  phoneNumber: Number;
  birthday: String;
  image: ImageBitmap;
}

export default function UserEditProfile() {
  // //ui states
  // const [id, setId] = useState<Number>();
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [firstname, setFirstName] = useState<string>("");
  // const [lastname, setLastName] = useState<string>("");
  // const [gender, setGender] = useState<string>("");
  // const [state, setState] = useState<string>("");
  // const [role, setRole] = useState<string>("");
  // const [city, setCity] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  // const [zipCode, setZipCode] = useState<number>();
  // const [phoneNumber, setPhoneNumber] = useState<number>();
  // const [birthday, setBirthDay] = useState<Date>();
  // // file upload state
  // const [image, setImage] = useState<File | null>(null);

  const [country, setCountry] = useState<any>();

  const [userData, setUserData] = useState<UserData>();

  const options = [
    { label: "Select Country", value: "Country" },
    { label: "India", value: "India" },
    { label: "America", value: "America" },
    { label: "London", value: "London" },
  ];

  const id = localStorage.getItem("id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUser(id);

      if (response?.status == 200) {
        setUserData(response.data);

        console.log("User Data", userData);
      }
    } catch (error) {
      console.log("Could not fetch data", error);
    }
  };

  // const handleUpdateButton = async(userData: any, userId: any) => {
  //   try {
  //     const response = a;
  //   } catch (error) {
  //     console.log("User is not updated", error);
  //   }
  // };

  const style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "white",
      width: "100%",
      height: "40px",
      color: "black",
      minHeight: "40px",
      border: "1px solid #e9ecef",
      paddingLeft: "5px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: state.isSelected ? "0" : "10px",
      fontSize: "14px",
      "&:hover": {
        cursor: "pointer",
      },
      outline: "none",
    }),
    menu: (base) => ({ ...base, marginTop: "0px" }),
    menuList: (base) => ({ ...base, padding: "0" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFDEDA" : "white",
      color: "black",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#FFDEDA",
        // #dddddd
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "black",
      transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
      transition: "250ms",
    }),
  };
  return (
    <div className="main-wrapper">
      <StudentHeader activeMenu={"Profile"} />
      {/* Student Dashboard */}
      <div className="page-content">
        <div className="container pt-5">
          <div className="row">
            {/* Sidebar */}
            <UserSideBar activeMenu="EditProfile" />
            {/* Sidebar */}

            {/* Profile Details */}
            <div className="col-xl-9 col-md-8">
              <div className="settings-widget profile-details">
                <div className="settings-menu p-0">
                  <div className="profile-heading">
                    <h3>Profile Details</h3>
                    <p>
                      You have full control to manage your own account setting.
                    </p>
                  </div>
                  <div className="course-group mb-0 d-flex">
                    <div className="course-group-img d-flex align-items-center">
                      <Link to="/students-profile">
                        <img src="" alt="" className="img-fluid" />
                      </Link>
                      <div className="course-name">
                        <h4>
                          <Link to="">Your avatar</Link>
                        </h4>
                        <p>PNG or JPG no bigger than 800px wide and tall.</p>
                      </div>
                    </div>
                    <div className="profile-share d-flex align-items-center justify-content-center">
                      <Link to="#;" className="btn btn-success">
                        Update
                      </Link>
                      <Link to="#;" className="btn btn-danger">
                        Delete
                      </Link>
                    </div>
                  </div>
                  <div className="checkout-form personal-address add-course-info ">
                    <div className="personal-info-head">
                      <h4>Personal Details</h4>
                      <p>Edit your personal information and address.</p>
                    </div>
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your first Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your last Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Phone"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Email"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              Birthday
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Birth of Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label">Country</label>

                            <Select
                              className=" select country-select"
                              name="sellist1"
                              options={options}
                              defaultValue={options[0]}
                              placeholder="Select Country"
                              onChange={setCountry}
                              styles={style}
                            ></Select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              Address Line 1
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              Address Line 2 (Optional)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your City"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              ZipCode
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Zipcode"
                            />
                          </div>
                        </div>
                        <div className="update-profile">
                          <button type="button" className="btn btn-success">
                            Update Profile
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Details */}
          </div>
        </div>
      </div>
      {/* Student Dashboard */}
      {/* <Footer /> */}
    </div>
  );
}
