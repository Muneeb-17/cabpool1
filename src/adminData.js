import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import Navigation from "./navigation";
import "./adminData.css";


const AdminData = () => {
  const history = useHistory();
    const [ads, getAds] = useState([]);

    const getUser = async () => {
        try {
            const response = await fetch('/adminData', {
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
        fetch(`/adminDelete/${id}`, {
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
              <a href="/adminAds"type="button" name="dang ky">User Ads</a>
                <table class="content-member">
                  <thead>
                      <tr class="name-row">
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Confirm Password</th>
                          <th></th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {ads.map((element)=>
                    <tr>
                      <td class="edit">{element.name}</td>
                      <td class="edit">{element.number}</td>
                      <td class="edit">{element.email}</td>
                      <td class="edit">{element.password}</td>
                      <td class="edit">{element.cpassword}</td>
                      <td class="edit-save">
                        <button type="button" name="edit" class="edit-member"onClick={() => {
                                    history.push("/adminUpdate/" + element._id )
                                }}>Edit</button>
                        <button type="button" name="save" class="save-member">Save</button>
                      </td>
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

export default AdminData;