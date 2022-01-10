import React,{ useEffect, useState } from "react";
import {NavLink, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import './login.css';
import Navigation from "./navigation";
import HomeDesign from './homeDesign.js';

const HomeLogin = () => {
    
    return (
        <>
       <Navigation/>
<HomeDesign/>
</>

         
    );
}

export default HomeLogin;
