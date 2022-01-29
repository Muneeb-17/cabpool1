import React,{ useEffect, useState } from "react";
import {NavLink, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import './login.css';
import Navigation from "./navigation";
import HomeDesign from './homeDesign.js';
import Home from './homeAfterLogin';

const HomePage = () => {
    const history = useHistory();
    const PF = "http://localhost:5000/images/"
    const [userData , setUserData] = useState({});
    const [userImage , setUserImage] = useState({});
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
             setUserImage({image:data.rootUser.image})
             console.log( setUserImage({image:data.rootUser.image}));
             setShow(true);
             
            
             console.log(res.status);
            }catch(err)
            {
                console.log(err);
               // console.log(' redirect --==-=-=-=-=-=-=-=-=-=-=--==-=-=');
                history.push('/login');

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
                <img className="adsImage" src={PF+userImage.image}  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
  }} width="30" height="30"/></a>
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
<Home/>
</>

       :<> <Navigation/>
       
      <HomeDesign/></>}</div>
         
    );
}

export default HomePage;
