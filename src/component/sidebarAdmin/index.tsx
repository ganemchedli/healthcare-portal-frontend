import { useState } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../services/AuthServices";

import "./index.css";
interface SidebarProps {
  // You can add any additional props here
}

const SidebarAdmin: React.FC<SidebarProps> = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleItemClick = (item: any) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="main-container d-flex">
      <div className={`sidebar ${sidebarActive ? "active" : ""}`} id="side_nav">
        <div className="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
          <h1 className="fs-4">
            <span className="text-white">Admin Dashboard</span>
          </h1>
          <button
            className="btn d-md-none d-block close-btn px-1 py-0 text-white"
            onClick={handleSidebarToggle}
          >
            <i className="fal fa-stream"></i>
          </button>
        </div>
        <ul className="list-unstyled px-2">
          <li
            className={activeItem === "Dashboard" ? "active" : ""}
            onClick={() => handleItemClick("Dashboard")}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block">
              <FontAwesomeIcon icon={faHome} />
              <RouterNavLink to="/admin/dashboard"> Dashboard</RouterNavLink>
            </a>
          </li>
          <li
            className={activeItem === "ListUsers" ? "active" : ""}
            onClick={() => handleItemClick("ListUsers")}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block">
              <FontAwesomeIcon icon={faList} />{" "}
              <RouterNavLink to="/admin/users">Manage Users</RouterNavLink>
            </a>
          </li>
          <li
            className={activeItem === "ListAppointments" ? "active" : ""}
            onClick={() => handleItemClick("ListAppointments")}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block">
              <FontAwesomeIcon icon={faList} />{" "}
              <RouterNavLink to="/admin/appointments">
                Manage Appointments
              </RouterNavLink>
            </a>
          </li>
        </ul>
        <hr className="h-color mx-2" />
        <ul className="list-unstyled px-2">
          <li
            className={activeItem === "Logout" ? "active" : ""}
            onClick={() => handleItemClick("Logout")}
          >
            <a
              href=""
              className="text-decoration-none px-3 py-2 d-block"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        <nav className="navbar navbar-expand-md navbar-light bg-light"></nav>
      </div>
    </div>
  );
};

export default SidebarAdmin;
