import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {Collapse,DropdownItem,DropdownMenu,DropdownToggle,Nav,Navbar,NavbarBrand,NavbarText,NavbarToggler,NavItem,NavLink,UncontrolledDropdown} from 'reactstrap'
import { AuthContext } from "../../contexts/AuthContext";

const MainLayout=()=>{
  const {currentUser} = useContext(AuthContext);
  const [isOpen,setIsOpen]=useState(false);
  const toggle=()=>setIsOpen(!isOpen);
  console.log(currentUser.photoURL)
  return <Fragment>
      <Navbar className="my-2"
            color="secondary"
            dark
            expand={"md"}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components">components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/dangthanhthanh">https://github.com/dangthanhthanh</NavLink>
            </NavItem>
          </Nav>
        {currentUser ? (
          <UncontrolledDropdown inNavbar>
            <DropdownToggle nav caret>
                <img className="border rounded-circle" src={'https://firebasestorage.googleapis.com/v0/b/shared-movie-1d440.appspot.com/o/avatar%2Fthanh12%40gmail.com?alt=media&token=a1c37a1a-2c7b-4f6e-b592-598010d23d13'} width={50} height={50} />
                <span className="ms-1"> {currentUser.displayName}</span>
            </DropdownToggle>
            <DropdownMenu direction="down" className="me-2">
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavLink to="/auth/login" className="nav-link">
            <NavbarText>Login</NavbarText>
          </NavLink>
        )}
        </Collapse>
      </Navbar>
    <Outlet/>
  </Fragment>
  
}
export default MainLayout;