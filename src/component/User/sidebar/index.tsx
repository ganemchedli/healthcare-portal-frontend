import { Bell, Lock, Power, Settings, Trash2, User } from "react-feather";
import { Link } from "react-router-dom";

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
  image: string;
}

// eslint-disable-next-line react/prop-types
const UserSideBar: React.FC<UserData> = (props) => {
  return (
    <div className="col-xl-3 col-md-4 theiaStickySidebar">
      <div className="settings-widget dash-profile mb-3">
        <div className="settings-menu p-0">
          <div className="profile-bg">
            <div className="profile-img">
              <Link to="/students-profile">
                <img src={props.image} alt="" />
              </Link>
            </div>
          </div>
          <div className="profile-group">
            <div className="profile-name text-center">
              <h4>
                <Link to="/students-profile">{props?.firstName}</Link>
              </h4>
              <p>{props?.role}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-widget account-settings">
        <div className="settings-menu">
          <h3>ACCOUNT SETTINGS</h3>
          <ul>
            <li>
              <Link to="/setting-edit-profile" className="">
                <i>
                  <Settings size={20} />{" "}
                </i>{" "}
                Edit Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/setting-student-security">
                <i>
                  <User size={20} />
                </i>{" "}
                Security
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/setting-student-notification">
                <i>
                  <Bell size={20} />
                </i>{" "}
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/setting-student-privacy">
                <i>
                  <Lock size={20} />
                </i>{" "}
                Profile Privacy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/setting-student-delete-profile">
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
