import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const header: React.FC = () => {
  return (
    <Navbar className="my-2" color="dark" dark>
      <NavbarBrand href="/">Admin control panel</NavbarBrand>
    </Navbar>
  );
};

export default header;
