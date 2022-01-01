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
            <h1>Services</h1>
            <div class="products-wrap">
              <div class="product-item">
                <img class="beam-img" src="https://ucsustainability.files.wordpress.com/2018/05/cropped-carpool-sd.png" height="100" alt="Beams" title="Beams" />
                <div class="product-description">
                  <p class="product-label">Scroll, click, tap and go!</p>

                  <ul class="item-type">
                    <li>Booking a ride has never been easier! to our simple app powered by great technology you can book a ride close to you in just minutes.</li>
                  </ul>
                </div>
              </div>
              <div class="product-item">
                <img class="beam-img" src="https://w7.pngwing.com/pngs/991/657/png-transparent-money-animation-cartoon-mad-money-s-hand-human-cartoon.png" width="80" height={"100"} alt="Bolts" title="Bolts" />
                <div class="product-description">
                  <p class="product-label">Money</p>
                  <hr class="hr-line" />
                  <ul class="item-type">
                    <li>They say money can't
                      buy you happiness,
                      but we'd prefer
                      to cry on a beach
                      vacation.</li>

                  </ul>
                </div>
              </div>
              <div class="product-item">
                <img class="bar-img" src="https://static9.depositphotos.com/1497380/1190/v/600/depositphotos_11908203-stock-illustration-car-cartoon-character-with-thumb.jpg" width="80" alt="Bars" title="Bars" />
                <div class="product-description">
                  <p class="product-label">Your pick of rides at low prices</p>
                  <hr class="hr-line" />
                  <ul class="item-type">
                    <li>No matter where you’re going,by bus or carpool, find the perfect ride from our wide range of destination and routes at low prices.</li>

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
              <h1>Where do you want to drive to ?</h1>
              <p> Mets Make Your Ride Least Expensive</p>
              <button>publish a ride</button>

            </div>

          </div>
        </section>

          <footer class="site-footer">
            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-md-6">
                  <h6>About</h6>
                  <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                </div>
                <div class="col-xs-6 col-md-3">
                  <h6>Quick Links</h6>
                  <ul class="footer-links">
                    <li><a href="http://scanfcode.com/about/">About Us</a></li>
                    <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
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
                    <Link to=""><FacebookIcon /></Link>
                    <Link to=""><TwitterIcon /></Link>
                    <Link to=""><InstagramIcon /></Link>
                    <Link to=""><LinkedInIcon /></Link>
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