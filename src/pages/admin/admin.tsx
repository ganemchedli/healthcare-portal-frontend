import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../component/sidebarAdmin";
const Admin: React.FC = () => {
  return (
    <>
      <div className="d-flex">
        <SidebarAdmin />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
