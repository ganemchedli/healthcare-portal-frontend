import { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { faHome, faList, faGear } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  // You can add any additional props here
}

const SidebarAdmin: React.FC<SidebarProps> = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleItemClick = (item: any) => {
    setActiveItem(item);
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
            className={activeItem === "Projects" ? "active" : ""}
            onClick={() => handleItemClick("Projects")}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block">
              <FontAwesomeIcon icon={faList} />{" "}
              <RouterNavLink to="/admin/users">Manage Users</RouterNavLink>
            </a>
          </li>
        </ul>
        <hr className="h-color mx-2" />
        <ul className="list-unstyled px-2">
          <li
            className={activeItem === "Settings" ? "active" : ""}
            onClick={() => handleItemClick("Settings")}
          >
            <a href="#" className="text-decoration-none px-3 py-2 d-block">
              <FontAwesomeIcon icon={faGear} />{" "}
              <RouterNavLink to="/admin/settings">Settings</RouterNavLink>
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
