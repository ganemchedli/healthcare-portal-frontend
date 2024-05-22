import { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Clipboard,
  CreditCard,
  Lock,
  Power,
  RefreshCw,
  Settings,
  Trash2,
  User,
  UserPlus,
} from "react-feather";
import { Link } from "react-router-dom";
import { getUser } from "../../../services/UserServices";

import userimage from "../../../assets/1-intro-photo-final.jpg";

interface UserData {
  firstName: String;
  lastName: String;
  password: String;
  address: String;
  state: String;
  city: String;
  zipCode: Number;
  role: String;
  phoneNumber: String;
  birthday: String;
}

// eslint-disable-next-line react/prop-types
export default function UserSideBar({ activeMenu }: { activeMenu: string }) {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getUser(userId);
      if (response.status == 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.log("Error getting user data", error);
    }
  };

  console.log("user data", userData); // Display user data

  return (
    <div className="col-xl-3 col-md-4 theiaStickySidebar">
      <div className="settings-widget dash-profile mb-3">
        <div className="settings-menu p-0">
          <div className="profile-bg">
            <img src={userimage} alt="" />
            <div className="profile-img">
              <Link to="/students-profile">
                <img src={userimage} alt="" />
              </Link>
            </div>
          </div>
          <div className="profile-group">
            <div className="profile-name text-center">
              <h4>
                <Link to="/students-profile">{userData?.firstName}</Link>
              </h4>
              <p>{userData?.role}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-widget account-settings">
        <div className="settings-menu">
          <h3>ACCOUNT SETTINGS</h3>
          <ul>
            <li
              className={
                activeMenu === "EditProfile" ? "nav-item active" : "nav-item"
              }
            >
              <Link to="/setting-edit-profile" className="">
                <i>
                  <Settings size={20} />{" "}
                </i>{" "}
                Edit Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/setting-student-security"
                className={
                  activeMenu === "Security" ? "nav-item active" : "nav-item"
                }
              >
                <i>
                  <User size={20} />
                </i>{" "}
                Security
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/setting-student-notification"
                className={
                  activeMenu === "Notification" ? "nav-item active" : "nav-item"
                }
              >
                <i>
                  <Bell size={20} />
                </i>{" "}
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/setting-student-privacy"
                className={
                  activeMenu === "Privacy" ? "nav-item active" : "nav-item"
                }
              >
                <i>
                  <Lock size={20} />
                </i>{" "}
                Profile Privacy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/setting-student-delete-profile"
                className={
                  activeMenu === "DeleteProfile"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <i>
                  {" "}
                  <Trash2 size={20} />
                </i>{" "}
                Delete Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <i>
                  <Power size={20} />
                </i>{" "}
                Sign Out
              </Link>
            </li>
            {activeMenu === "Ticket" ? (
              <li className="nav-item active">
                <Link to="/login" className="nav-link">
                  <i>
                    <Clipboard size={20} />
                  </i>{" "}
                  Support Tickets
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
