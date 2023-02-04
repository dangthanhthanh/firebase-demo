import { signOut } from "firebase/auth";
import { Fragment, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import {Collapse,DropdownItem,DropdownMenu,DropdownToggle,Nav,Navbar,NavbarBrand,NavbarText,NavbarToggler,NavItem,NavLink,UncontrolledDropdown} from 'reactstrap'
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../libs/firebase";
const MainLayout=()=>{
  const [isOpen,setIsOpen]=useState(false);
  const toggle=()=>setIsOpen(!isOpen);
  const {currentUser} = useContext(AuthContext);
  const onLogout = async ()=>{
    await signOut(auth)
  }
  return <Fragment>
      <Navbar className="my-1 px-4"
            color="secondary"
            dark
            expand={"md"}
            >
        <NavbarBrand href="/" style={{fontSize:"40px",fontWeight:900}}>FaceClips</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/sharemovie">share_video</NavLink>
            </NavItem>
          </Nav>
        {currentUser ? (
          <UncontrolledDropdown inNavbar>
            <DropdownToggle nav caret>
                <img className="border rounded-circle" src={currentUser.photoURL} width={60} height={60} />
                <span className="ms-1"> {currentUser.displayName}</span>
            </DropdownToggle>
            <DropdownMenu direction="down" className="me-2">
              <DropdownItem onClick={onLogout}>
                logout
              </DropdownItem>
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