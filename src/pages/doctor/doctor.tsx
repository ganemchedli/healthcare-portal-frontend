import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/sidebar";
interface DoctorProps {
  // Add any props you need for the component here
}

const Doctor: React.FC<DoctorProps> = () => {
  // State to manage the visibility of the sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="d-flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Doctor;
