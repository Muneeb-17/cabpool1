import React, { useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from "./navigation";
import './search.css';
const moment = require('moment');


const AdsLogin = () =>{
    var datee = new Date();
    var d = moment().format('YYYY-MM-DD'); 
    const history = useHistory();
    const[ads,getAds] = useState([]);
    const [search ,setSearch] = useState('');
    const [searcha,setSearcha] = useState('');
    const [date , setDate] = useState('');
    const getUser = async () => {
        try{
       const response = await fetch('/getData',{
           method:"GET",
           headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
           },
           credentials: "include"
        });
       getAds( await response.json());

       const data = await response.body;
       console.log("=============ads");
       console.log(data);

       if(response.status!==200)
       {
           const error = new Error(response.error);
           throw error;
       }
            }catch(err) 
            {
                console.log(err);
               // history.push('/login');
            }
    }
    useEffect(() =>{
        getUser();
    },[]);
    return (
        <div className="header">
     <Navigation/>
     <div>
        <div className="s01">
      <form>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <input id="search" type="text" placeholder="Orign"
             onChange={event => {setSearch(event.target.value)}} />
          </div>
          <div className="input-field second-wrap">
            <input id="location" type="text" placeholder="Destination"
            onChange={event => {setSearcha(event.target.value)}} />
          </div>
          <div className="input-field second-wrap">
            <input id="location" type="date"  min = '2021-12-23' placeholder="Destination"
            onChange={event => {setDate(event.target.value)}} />
          </div>
        </div>
      </form>
    </div>  
        <div className="container mt-5 ">
    <div className="row text-center">
        {   ads.filter((val)=>{
            if(search === "" && searcha === "" && date === "") 
            {
                return val;
            }
            else if(val.departure.toLowerCase().includes(search.toLowerCase())&&val.destination.toLowerCase().includes(searcha.toLowerCase())
            &&val.date.toLowerCase().includes(date.toLowerCase()))
            {
               return val;
            }
        }).map((element)=>{
            return(
               
                <div className = "col-10 col-md-4 mt-5" key={element.id}>
                    <div className="card-login">
            <div className="d-flex align-items-center">
            <div className="ml-3 w-100">
                <div className="trainer-card-photo"></div>
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
                <div className="button:hover"><button className="button12">Request</button> </div>
          </div>
        </div>
        </div>
        </div>
            )

        })
            
        }
        
    </div>
</div>
</div>
</div>
       );
}
export default AdsLogin;