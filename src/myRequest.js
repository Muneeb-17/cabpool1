import React, { useEffect, useState } from "react";
import { useHistory ,Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation2 from "./Navigation2";
import './search.css';
import './popup.css';
const moment = require('moment');


const MyRequest = () => {
    const history = useHistory();
    const [ads, getAds] = useState([]);
    const PF = "http://localhost:5000/images/"
    const [text, setText] = useState(false);
    const getUser = async () => {
        try {
            const response = await fetch('/myRide', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });


            const data = await response.json();
            console.log("=============myRequests");
            console.log(data);
            getAds(data);
        
            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    
    const accept = async (id) => {
        fetch(`/accept/${id}`,{
            method: 'PUT'
        })
        setText(true);
    }


    const deleteRide = async (id) => {
        fetch(`/cancel/${id}`, {
            method: 'DELETE'
        }).then(() => {
            getUser(
                ads.filter((item) => {
                    item.requests.filter((items) => {
                    return items._id !== id;})
                })
            )
        })

    }
    useEffect(() => {
        getUser();
        deleteRide();
    }, []);
    return (
        <div className="header">
            <Navigation2 />
                <div className="container mt-5 ">
                    <div className="row text-center">
                        {ads.map((element) =>
                            <div className="col-10 col-md-4 mt-5" key={element.id}>
                                <div className="card-login">
                                    <div className="d-flex align-items-center">
                                        <div className="ml-3 w-100">
                                        <img className="adsImage" src={PF+element.image}  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
  }} width="90" height="90"/>
                                            <h4 className="trainer-name-title">{element.loginName}</h4>
                                            <div className="origin">
                                                <div> <span>Origin:</span><span className="origin1">{element.departure}</span> </div>
                                                <div> <span >Destination:</span> <span className="destination1">{element.destination}</span> </div>
                                            </div>
                                            <hr class="dashed"></hr>
                                            <div className="origin">
                                                <div> <span>Date:</span> <span className="origin1">{element.date}</span> </div>
                                                <div> <span>Time:</span> <span className="destination1">{element.time}</span> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                            {element.requests.map((c, i) => (
                                                <div className="col-10 col-md-4 mt-5" key={i}>
                                                    <div className="card-login">
                                                        <div className="d-flex align-items-center">
                                                            <div className="ml-3 w-100">
                                                                <div className="origin">
                                                                    <div> <span>Name:</span><span className="origin1">{c.name}</span> </div>
                                                                    <div> <span >Contact No:</span> <span className="destination1">{c.number}</span> </div>
                                                                    <div> <span >No of Passenger:</span> <span className="destination1">{c.passenger}</span> </div>
                                                                    {text ?
                                                                     <>
                                                                            <a href="#popup1">End Trip</a>
                                                                        <div id="popup1" class="overlay">
                                                                                <div class="popup">
                                                                                    <h2>Payment</h2>
                                                                                    <a class="close" href="#">&times;</a>
                                                                                    <>
                                                                                 <Link to ="/payment"><button type="button" class="btn btn-dark">Cash </button></Link>
                                                                                    <></>
                                                                                    <button type="button" class="btn btn-dark">Credit </button>
                                                                                    </>
                                                                                   
                                                                                </div>
                                                                            </div></>
                                                                        : <button className="button12" onClick={() => {
                                                                            accept(c._id);
                                                                        }}>Accept</button>
                                                                    }
                                                                    <button className="button1" onClick={() => {
                                                                        deleteRide(c._id);
                                                                    }}>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                   
                        )
                        }
                    </div>
                </div>
        </div>

    );
}
export default MyRequest;