import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Offcanvas, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import './login.css';
import HomeDesign from './homeDesign';
//import './home.css';


class Navigation extends React.Component {
  render() {
    return (
      <>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/home">Cab Pool</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <li className="nav item">
                    <NavLink className="nav-link" to="/home">Home</NavLink>
                  </li>
                  <li className="nav item">
                    <NavLink className="nav-link" to="/adsLogin"><SearchIcon />Search</NavLink>
                  </li>
                  <li className="nav item">
                    <NavLink className="nav-link" to="/rideDetails">Offer a Ride</NavLink>
                  </li>
                  <li className="nav item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav item">
                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>

                  </li>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

      </>
    );
  }
}

export default Navigation;