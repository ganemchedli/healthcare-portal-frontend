import { useState, useEffect, ChangeEvent } from "react";
import StudentHeader from "../header";
import Footer from "../../footer";
import { Link } from "react-router-dom";
import UserSideBar from "../sidebar";
import {
  getUser,
  updateUser,
  updateUserImage,
} from "../../../services/UserServices";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  state: string;
  city: string;
  zipCode: number;
  role: string;
  phoneNumber: string;
  birthday: string;
  image: File;
}

type UserFormProps = {
  userData: UserData;
};

const UserEditProfile: React.FC<{}> = ({}) => {
  //state for managing user data
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    zipCode: 0,
    role: "",
    phoneNumber: "",
    birthday: "",
    image: new File([], ""),
  });
  //state for managing image source
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUser(userId)
        .then((response) => {
          setUserData(response.data);
          setImgSrc(`data:image/png;base64,${response.data.image}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  //console.log("user data", userData); // Display user data

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log("Selected file", selectedFile);
      setUserData({ ...userData, image: selectedFile });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFields: Partial<UserData> = {};

    // Iterate over each key in formData
    Object.keys(userData).forEach((key) => {
      const typedKey = key as keyof UserData;
      // Ensure types are correct
      switch (typedKey) {
        case "id":
        case "zipCode":
          updatedFields[typedKey] = Number(userData[typedKey]);
          break;
        case "image":
          updatedFields[typedKey] = userData[typedKey] as File;
          break;
        default:
          updatedFields[typedKey] = userData[typedKey] as string;
          break;
      }
    });

    console.log("Updated fields", updatedFields);
    // Check if there are any updated fields
    if (Object.keys(updatedFields).length > 0) {
      updateUserData(updatedFields);
    } else {
      console.log("No changes detected");
    }
  };

  const updateUserData = async (updatedFields: Partial<UserData>) => {
    try {
      const response = await updateUser(userData.id, updatedFields);
      if (response.status === 200) {
        console.log("Update successful:", response.data);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const updateUserProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", userData.image as Blob);

    try {
      const response = await updateUserImage(userData.id, formData);
      if (response.status === 200) {
        console.log("Image uploaded successfully");
      }
      window.location.reload();
    } catch (error) {
      console.log("Error uploading image", error);
    }
  };
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
      {/* Student Dashboard */}
      <div className="page-content">
        <div className="container pt-5">
          <div className="row">
            {/* Sidebar */}
            <UserSideBar
              image={imgSrc ? imgSrc : ""}
              firstName={userData.firstName}
              role={userData.role}
              lastName={userData.lastName}
              password={userData.password}
              address={userData.address}
              state={userData.state}
              city={userData.city}
              zipCode={userData.zipCode}
              phoneNumber={userData.phoneNumber}
              birthday={userData.birthday}
            />
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
                      <div className="course-name">
                        <h4>
                          <Link to="">Your avatar</Link>
                        </h4>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleImageChange}
                          className="form-control"
                          required
                        />
                        <p>PNG or JPG no bigger than 800px wide and tall.</p>
                      </div>
                    </div>
                    <div className="profile-share d-flex align-items-center justify-content-center">
                      <Link
                        to="#;"
                        className="btn btn-success"
                        onClick={updateUserProfileImage}
                      >
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
                    <form
                      action="#"
                      method="PUT"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              placeholder="Enter your first Name"
                              value={userData.firstName}
                              onChange={handleChange}
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
                              name="lastName"
                              placeholder="Enter your last Name"
                              value={userData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              name="phoneNumber"
                              placeholder="Enter your Phone"
                              value={userData.phoneNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              placeholder="Enter your Email"
                              value={userData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">
                              Birthday
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              name="birthday"
                              placeholder="Birth of Date"
                              value={userData.birthday}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              placeholder="Enter your State"
                              value={userData.state}
                              onChange={handleChange}
                            />
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
                              name="address"
                              placeholder="Address"
                              value={userData.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* <div className="col-lg-6">
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
                        </div> */}
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              placeholder="Enter your City"
                              value={userData.city}
                              onChange={handleChange}
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
                              name="zipCode"
                              placeholder="Enter your Zipcode"
                              value={userData.zipCode}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="update-profile">
                          <button type="submit" className="btn btn-success">
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
};

export default UserEditProfile;
