import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";

const currentUser = null;

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar expand="md" dark color="dark">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/">
                Components
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
        {currentUser ? (
          <UncontrolledDropdown inNavbar>
            <DropdownToggle caret>Options</DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <Link to="/auth/login" className="nav-link">
            <NavbarText>Login</NavbarText>
          </Link>
        )}
      </Navbar>
      <Outlet />
    </>
  );
};

export default MainLayout;
