import React, { useState, useEffect } from "react";
import ListUsersComponent from "../../component/ListUsersComponent";
import Header from "../admin/header";
const Admin: React.FC = () => {
  return (
    <>
      <Header></Header>
      <ListUsersComponent />
    </>
  );
};

export default Admin;
