import React,{ useEffect, useState } from "react";
import {NavLink, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


const AboutUs = () => {

    return (
        <>
     
<body>
  <div class="container">
            <div class="circles"></div>
            <div class="details-container">
                <div class="avatar">
                    <img src="https://image.shutterstock.com/image-vector/carsharing-carpooling-infographics-flowchart-planning-600w-512128840.jpg" class="img-fluid" alt=""/>
                </div>
                <div class="about">
                    <div class="name">
                        <p>
                            Hello There!
                        </p>
                        <h1>
                            Welcome to CabPool
                        </h1>
                    </div>
                    <div class="about-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt architecto ut accusamus maxime laborum vel et consectetur, eveniet nobis, iure aperiam. Fuga illo impedit hic possimus tempora asperiores. Dicta, esse!
                        </p>
               
                    </div>
                </div>
                <div class="clear"></div>
            </div>
                    </div> 
  
</body>
        </>

    )
}

export default AboutUs;