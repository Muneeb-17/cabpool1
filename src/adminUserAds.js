import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import Navigation from "./navigation";
import "./adminData.css";


const AdminUserData = () => {
  const history = useHistory();
    const [ads, getAds] = useState([]);

    const getUser = async () => {
        try {
            const response = await fetch('/rideDetails', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            getAds(await response.json());

            const data = await response.body;
            console.log("=============ads");

            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push('/adminLogin');
        }
    }
  
    const deleteRide = async (id) => {
        fetch(`/delete/${id}`, {
            method: 'DELETE'
        }).then(() => {
            getUser(
                ads.filter((item) => {
                    return item._id !== id;
                })
            )
        })

    }
    useEffect(()=>{
      getUser();
     // deleteRide();
    },[])
     return (
         <>
        <div className="header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Cab Pool</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ms-auto">
      <NavDropdown title="Admin" id="collasible-nav-dropdown">
      <NavDropdown.Item href = "/logout">Logout</NavDropdown.Item>
        </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</div>
         <section class="section3">
            <div class="hiuser">
                <h3>Admin<span id="name-user"></span></h3>
            </div>
            <div class="flex-container">
              <div class="member">
            <Link to ='/adminData'><a type="button" name="dang ky">Go Back</a></Link>  
                <table class="content-member">
                  <thead>
                      <tr class="name-row">
                      <th>Id Card</th>

                      <th>Car Engine No</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Origin</th>
                          <th>Destination</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Registration</th>
                          <th>Color</th>
                          <th>Meetup Point</th>
                          <th>Chrges</th>
                          <th></th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {ads.map((element)=>
                    <tr>
                      <td class="edit">{element.idCard}</td>
                      <td class="edit">{element.carEngine}</td>
                      <td class="edit">{element.loginName}</td>
                      <td class="edit">{element.number}</td>
                      <td class="edit">{element.departure}</td>
                      <td class="edit">{element.destination}</td>
                      <td class="edit">{element.date}</td>
                      <td class="edit">{element.time}</td>
                      <td class="edit">{element.registration}</td>
                      <td class="edit">{element.color}</td>
                      <td class="edit">{element.meetupPoint}</td>
                      <td class="edit">{element.charges}</td>
                    
                      <td><button type="button" name="delete" class="delete-member" onClick={() => {
                                 deleteRide(element._id);
                             }}>Delete</button></td>
                    </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
        </section>
         </>
     );
}

export default AdminUserData;