import React, { useEffect, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation2 from "./Navigation2";
import TimerIcon from '@material-ui/icons/Timer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PhoneIcon from '@material-ui/icons/Phone';

import './search.css';
const moment = require('moment');


const SendRequest = () => {
    const history = useHistory();
    const PF = "http://localhost:5000/images/"
    const [ads, getAds] = useState([]);
    const [text, setText] = useState(false);
    const getUser = async () => {
        try {
            const response = await fetch('/getRequest', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log("=============myRequests");
            getAds(data)
            console.log(data);
           
            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }
    const accept = async () => {
        setText(true);
    }
    const deleteRide = async (id) => {
        fetch(`/cancel/${id}`, {
            method: 'DELETE'
        }).then(() => {
            getUser(
                ads.filter((item) => {
                    return item._id !== id;
                })
            )
        })

        window.location.reload(false);

    }
    useEffect(() => {
        getUser();
       // deleteRide();
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
                                        <img className="adsImage" src={PF + element.image} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                                        }} width="90" height="90" />
                                            <h4 className="trainer-name-title">{element.loginName}</h4>
                                            <div className="origin">
                                                <div> <span>Origin:</span><span className="origin1">{element.departure}</span> </div>
                                                <div> <span >Destination:</span> <span className="destination1">{element.destination}</span> </div>
                                            </div>
                                            <hr class="dashed"></hr>
                                            <div className="origin">
                                                <div> <span><CalendarTodayIcon/></span> <span className="origin1">{element.date}</span> </div>
                                                <div> <span><TimerIcon/></span> <span className="destination1">{element.time}</span> </div>
                                                <div> <span><PhoneIcon/></span> <span className="destination1">{element.number}</span> </div>
                                                <hr class="solid"></hr>
                                                {/* {element.requests.map((c, i) => (
                                                       <div className="origin" key={i.id}>
                                                           <b><p>My Request</p></b>
                                                       <div><span className="origin1"><b>{c.name}</b></span> </div>
                                                       <div> <span ><PhoneIcon/></span> <span className="destination1">{c.number}</span> </div>
                                                       <div> <span ><PersonOutlineIcon/></span> <span className="destination1">{c.passenger}</span> </div>
                                                      
                                                       <button className="button1" onClick={() => {
                                                           deleteRide(c._id);
                                                       }}>Cancel</button>
                                                           <button className="button12" onClick={() => {
                                    history.push("/rating/" + element.loginId )
                                }}>Give Rating</button>
                                                   </div>
                                                     ))} */}
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
                                                <h4 className="trainer-name-title">{c.name}&ensp;<StarOutlineIcon/>{c.rating}</h4>
                                                    {/* <div> <span className="trainer-name-title">{c.name}</span> </div> */}
                                                    <div> <span ><PhoneIcon/></span> <span className="destination1"><b>{c.number}</b></span> </div>
                                                    <div> <span ><PersonOutlineIcon/></span> <span className="destination1">{c.passenger}</span> </div>
                                                    <button className="button1" onClick={() => {
                                                           deleteRide(c._id);
                                                       }}>Cancel</button>
                                                           <button className="button12" onClick={() => {
                                    history.push("/rating/" + element.loginId )
                                }}>Give Rating</button>
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
export default SendRequest;