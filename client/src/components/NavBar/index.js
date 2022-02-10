import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, Navbar} from 'react-bootstrap';

function NavBar({ username, logOut }) {
  return (
    <Navbar aria-label='navbar' expand="lg" bg="dark" variant="dark">
      
      <Nav.Link as={NavLink} style={{color: "white"}}   to="">E-Thrift</Nav.Link>
      {username !== null && (
        <>
          <Nav.Link as={NavLink} to="/search">Find Products</Nav.Link>
          <Nav.Link as={NavLink} to="/create">Create Listing</Nav.Link>
          <Nav.Link as={NavLink} to={`/profile/true`}>Profile</Nav.Link>
          <Nav.Link onClick={logOut} as={NavLink} to='/'>Sign Out</Nav.Link>
        </>
      )}
      {username === null && (
        <>
          <Nav.Link as={NavLink} style={{color: "white"}} to="/register">Sign Up</Nav.Link>
          <Nav.Link as={NavLink} style={{color: "white"}} to="/login">Login </Nav.Link>
        </>
      )}
    </Navbar>
  );
}

export default NavBar;