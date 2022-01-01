import React from "react";
import {NavLink} from "react-router-dom";
import {Container, Navbar,Nav,NavDropdown} from 'react-bootstrap';
import './login.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class NavigationLogin extends React.Component{
    render()
    {
        return(
           <> <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
           <Container>
           <Navbar.Brand href="#home">Cab Pool</Navbar.Brand>
           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
             <Nav className="ms-auto">
             <li className ="nav item">
        <NavLink className="nav-link" to="/home">Home</NavLink>
    </li> 
    <li className ="nav item">
        <NavLink className="nav-link" to="/ads">Ride</NavLink>
    </li>
    <li className ="nav item">
        <NavLink className="nav-link" to="/rideDetails">Offer a Ride</NavLink>
    </li>  
    <li className ="nav item">
        <NavLink className="nav-link" to="/myRide">My Rides</NavLink>
    </li> 
    <li className ="nav item">
        <NavLink className="nav-link" to="/logout"><ExitToAppIcon/>Logout</NavLink>
    </li>
             </Nav>
           </Navbar.Collapse>
           </Container>
         </Navbar></>
           
        );
    } 
}  

export default NavigationLogin;