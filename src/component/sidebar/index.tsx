// import React from "react";
// import { NavLink as RouterNavLink, Link } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAnglesLeft,
//   faAnglesRight,
//   faUserGroup,
//   faFolderPlus,
//   faCalendarCheck,
//   faMessage,
// } from "@fortawesome/free-solid-svg-icons";
// import { Avatar } from "antd";
// import "./index.css";

// interface SidebarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
//   if (isOpen) {
//     return (
//       <div className="sidebar-full">
//         <span onClick={toggleSidebar} className="sidebar-button">
//           <FontAwesomeIcon icon={faAnglesLeft} />
//         </span>
//         <div className="">
//           {/* <img src={"src/assets/photo.jpg"} alt="User" className="user-image" /> */}
//           <Avatar src={"src/assets/photo.jpg"} size={50}></Avatar>
//         </div>
//         <div className="mb-5">
//           <h3 className="text-center">Dr. John Doe</h3>
//           <p className="text-center">General Practitioner</p>
//         </div>
//         <ul className="list-unstyled">
//           <li className="pl-3 mb-3">
//             <Link to="/listofpatients">
//               <FontAwesomeIcon icon={faUserGroup} />
//               List of patients
//             </Link>
//           </li>
//           <li className="pl-3 mb-3">
//             <Link to="/emr">
//               <FontAwesomeIcon icon={faFolderPlus} />
//               Create a new EMR
//             </Link>
//           </li>
//           <li className="pl-3 mb-3">
//             <Link to="/appointments">
//               <FontAwesomeIcon icon={faCalendarCheck} />
//               Appointments
//             </Link>
//           </li>
//           <li className="pl-3 mb-3">
//             <Link to="/messages">
//               <FontAwesomeIcon icon={faMessage} />
//               Messages
//             </Link>
//           </li>
//         </ul>
//       </div>
//     );
//   } else {
//     return (
//       <div className="sidebar-mini">
//         <span onClick={toggleSidebar} className="sidebar-button-mini">
//           <FontAwesomeIcon icon={faAnglesRight} />
//         </span>
//       </div>
//     );
//   }
// };

// export default Sidebar;
