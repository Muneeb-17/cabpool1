import React,{ useEffect, useState } from "react";
import {NavLink, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './login.css';
import Navigation from "./navigation";
import HomeDesign from './homeDesign.js';

const HomePage = () => {
    const history = useHistory();
    const [userData , setUserData] = useState({});
    const [show , setShow] = useState(false);
    const callHome = async() => {
        try{
             const res = await fetch('/home', {
                 method:"GET",
                 headers:{
                     Accept: "application/json",
                     "Content-Type": "application/json"
             },
                 credentials:"include"
             });



             console.log(' catching error ------ Body---------------------');
             console.log(res);
             const data = await res.json();
             const data1 = await res.body;
             console.log(data);
             console.log(data.rootUser.name);
             setUserData({name: data.rootUser.name});
             setShow(true);

            
             console.log(res.status);
            }catch(err)
            {
                console.log(err);
               // console.log(' redirect --==-=-=-=-=-=-=-=-=-=-=--==-=-=');
               // history.push('/login');

            }
    }
 useEffect(()=>{
callHome();
 },[]);


    return (
        <div>{show ? 
            <>
        <div className="header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Cab Pool</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ms-auto">
    <li className ="nav item">
        <NavLink className="nav-link" to="/home">Home</NavLink  >
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
    <li className="nav item">
                <a class="navbar-brand" href="#">
    <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/logo_white.png" width="30" height="30" alt="logo"/></a>
             </li>
      <NavDropdown title={userData.name} id="collasible-nav-dropdown">
      <NavDropdown.Item href = "/request">Requests</NavDropdown.Item>
      <NavDropdown.Item href = "/sendRequest">Send Request</NavDropdown.Item>
      <NavDropdown.Item href = "/profile">Profile</NavDropdown.Item>
      <NavDropdown.Item href = "/logout">Logout</NavDropdown.Item>
        </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</div>
<HomeDesign/>
</>

       :<> <Navigation/>
       
      <HomeDesign/></>}</div>
         
    );
}

export default HomePage;
