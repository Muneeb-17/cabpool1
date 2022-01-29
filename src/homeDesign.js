import React, { useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { Navbar, Offcanvas, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './login.css';
import './home.css';


class HomeDesign extends React.Component {
  render() {
    return (
      <>
        <main>
          <section class="cta-img" id="cta-img">
            <div class="cta-banner">
              <h1>Let's Make this Ride less Expensive than Ever </h1>
              <div class="cta-wrapper">
                <div className="button-home">
                  <Link to='/adsLogin'><button type="button" className="btn btn-dark"><SearchIcon />Search For Ride</button></Link>
                </div>
              </div>
            </div>
          </section>

          <section class="products" id="products">
            <div class="products-wrap">
              <div class="product-item">
                <img class="beam-img" src="https://ucsustainability.files.wordpress.com/2018/05/cropped-carpool-sd.png" height="100" alt="Car" title="Car" />
                <div class="product-description">
                  <p class="product-label">Car Sharing</p>
                  <hr class="hr-line" />
                  <ul class="item-type">
                    <li className="product">Booking a ride has never been<br/> easier!Thanks to our simple  <br/> app powered by great technology<br /> you can book a ride close to<br/> you in just minutes.</li>
                  </ul>
                </div>
              </div>
              <div class="product-item">
                <img class="beam-img" src="https://image.freepik.com/free-vector/man-with-map-smartphone-renting-car-driver-using-car-sharing-app-phone-searching-vehicle-vector-illustration-transport-transportation-urban-traffic-location-app-concept_74855-10109.jpg" width="80" height={"100"} alt="Bolts" title="Bolts" />
                <div class="product-description">
                  <p class="product-label">Find Cars</p>
                  <hr class="hr-line" />
                  <ul class="item-type">
                    <li className="product">They say money can't
                      <br />buy you happiness,
                      but we'd prefer
                      <br />to cry on a beach
                      vacation.</li>

                  </ul>
                </div>
              </div>
              <div class="product-item">
                <img class="bar-img" src="https://static9.depositphotos.com/1497380/1190/v/600/depositphotos_11908203-stock-illustration-car-cartoon-character-with-thumb.jpg" width="80" alt="Bars" title="Bars" />
                <div class="product-description">
                  <p className="product-label">Drive Now</p>
                  <hr class="hr-line" />
                  <ul class="item-type">
                    <li className="product">No matter where you’re going,<br />find the perfect ride<br /> from our wide range of destinations<br /> and routes at low prices.</li>

                  </ul>
                </div>
              </div>

            </div>
          </section>





        </main>


        <section>
          <div className="row row-img">
            <div className="col-md-6 img-1">

            </div>
            <div className="col-md-6 sec">
              <h1>Are You Going SomeWhere?</h1>
              <p><b> Let's Share</b></p>
              <Link to = '/login'>
             <button>publish a ride</button>
             </Link>
            </div>

          </div>
        </section>

        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About</h6>
                <p className="text-justify">People in today's environment are continually gravitating toward technology. Everything becomes stronger by the day. The Cab Pool is a ride-sharing business that allows customers to share a car with a few clicks on the Web App or a Smart Phone App. The consumer searches for the city to which he or she want to travel. Those who are going alone can update the site's advertisement with all of the necessary details. .</p>
              </div>
              <div className="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li><Link to ="./ads">About Us</Link></li>
                </ul>
              </div>
              <div className="col-xs-6 col-md-3">
                <h6>Contact us At</h6>
                <ul className="footer-links">
                  <li onClick={()=> window.open("https://accounts.google.com/ServiceLogin/identifier?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin")}>CabPool@gmail.com</li>
                </ul>
              </div>
            </div>
            <hr />
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by CabPool

                </p>
              </div>

              <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
               <a onClick={()=> window.open("https://www.facebook.com/")}><FacebookIcon/></a>
                  <a onClick={()=> window.open("https://twitter.com/?lang=en")}><TwitterIcon /></a>
                  <a onClick={()=> window.open("https://www.instagram.com/?hl=en")}><InstagramIcon /></a>
                  <a onClick={()=> window.open("https://www.linkedin.com/login")}><LinkedInIcon /></a>
                </ul>
              </div>
            </div>
          </div>
        </footer>

      </>
    );
  }
}

export default HomeDesign;