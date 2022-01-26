import React, { useEffect, useState, setStatus } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from "./navigation";
import NavigationLogin from "./Navigation2";
import './search.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TimerIcon from '@material-ui/icons/Timer';
const axios = require('axios').default;

//import { keys } from "@material-ui/core/styles/createBreakpoints";


const MyRide = () => {
    const history = useHistory();
    const [ads, getAds] = useState([]);
    const PF = "http://localhost:5000/images/"

    

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
            console.log("=============MyRide");
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
    const upDateRide = async(id) => {
        try {
            await axios.put(`/update/${id}`, {
            
            });
          } catch (err) {}
    };

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
    useEffect(() => {
        getUser();
        deleteRide();
       // upDateRide();
    }, []);
    return (
        <div className="header">
            <NavigationLogin />

            <div className="container mt-5 ">
                <div className="row text-center">
                    {ads.map((element) =>
                         <div className="col-10 col-md-4 mt-5" key={element.id}>
                         <div className="trainer-card">
                             <div className="d-flex align-items-center">
                                 <div className="ml-3 w-100">
                                 <img className="adsImage" src={PF+element.image}  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
  }} width="80" height="80"/>
                                     <h4 className="trainer-name-title">{element.loginName}</h4>
                                     <div class="row">
                                     <div class="col-6">
                                     <div className="origin">
                                         <div><span><PlaceIcon /></span> <span className="origin1">{element.departure}</span> </div>
                                         <MoreVertIcon />
                                         <div> <span><PlaceIcon /></span> <span className="destination1">{element.destination}</span> </div>
                                     </div>
                                     <hr class="dashed"></hr>
                                     <div className="origin">
                                                 <div> <span><PhoneAndroidIcon /></span> <span className="origin1">{element.number}</span> </div>
                                                 <div> <span><DriveEtaIcon /></span> <span className="destination1">{element.registration}</span> </div>
                                             </div>
                                          </div>
                                             <div class="col-6">
                                             <div className="origin">
                                         <div><span><CalendarTodayIcon /></span> <span className="origin1">{element.date}</span> </div>
                                         <br/>
                                         <div> <span><TimerIcon /></span> <span className="destination1">{element.time}</span> </div>
                                     </div>
                                     <hr class="dashed"></hr>
                                     <div className="origin">
                                                 <div> <span><DriveEtaIcon /></span> <span className="origin1">{element.color}</span> </div>
                                                 <div> <span><PlaceIcon /></span><span className="destination1">{element.meetupPoint}</span> </div>
                                     </div>
                                    
                                    
                                             </div>
                                           
                                             
                                             </div>
                                             <hr class="dashed"></hr>
                                             <div className="origin">
                                                 <div> <span>RS</span> <span className="origin1">{element.charges}</span> </div>
                                             </div>
                                             
                                             
                                                <button className="button12" onClick={() => {
                                    history.push("/update/" + element._id )
                                }}>Edit</button>
                              <button className="button1" onClick={() => {
                                 deleteRide(element._id);
                             }}>Delete</button> </div>
                                         </div>
                                     </div>
                                 </div>
                             
                    )}
                </div>
            </div>
        </div>
    )
}
export default MyRide;