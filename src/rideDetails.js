import { useState, useEffect } from "react";
import {useHistory,Link,NavLink} from "react-router-dom";
import { Navbar,Dropdown} from 'react-bootstrap';
import './login.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from "./navigation";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PhoneIcon from '@material-ui/icons/Phone';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TimerIcon from '@material-ui/icons/Timer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NavigationLogin from "./Navigation2";


const RideDetails=()=>{

   
    const history=useHistory();
    const [complete , setComplete] = useState([]);
    const [user, setUser] = useState({
      userName:"", departure: "",destination: "",date: "", time: "", number: "", registration: "", color: "", meetupPoint: "", charges: "",idCard: "",carEngine: ""
    });
    let name,value;
    const handleInputs = (e) =>
    {
     name = e.target.name;
     value = e.target.value;

     setUser({...user, [name]:value})
   
    } 
    const check = async () => {
        try{
       const response = await fetch('/rideDetails',{
           method:"GET",
           headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
           },
           credentials: "include"
                });

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
                history.push('/login');
            }
    }
    useEffect(() =>{
        check();
    });
     const PostData = async (e)=>{
         e.preventDefault();
         const {idCard,carEngine,userName,departure,destination,date,time,registration,number,color,meetupPoint,charges}=user;
         const res = await fetch('/rideDetails',{
             method:"POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                idCard,carEngine,userName,departure,destination,number,date,time,registration,color,meetupPoint,charges

             })
         });
         if(res.status===422||!res)
         {
            window.alert("please filled the required feild");
            console.log("Invalid Entry");   
         } 
         else
         {
            window.alert("Added");
            console.log("Registration successfull");	
            history.push('/Ads');
         }
         
     }
     
    
     
    return (
<div className="header">
<NavigationLogin/>          
<div className="bg_image1">
<div className="d-flex justify-content-center h-100">

<div className="card">
    <div className="card-header">
        <h3>Ride Details</h3>
    </div>
    <div className="card-body">
        <form method="POST">
        <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon/></span>
                </div>
                <input type="Number" name="idCard" id="idCard" className="form-control" placeholder ="Enter Your ID card Ex.3500000000005"
                value={user.idCard}
                onChange={handleInputs}
                ></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon/></span>
                </div>
                <input type="text" name="carEngine" id="carEngine" className="form-control"  placeholder="Enter your Car Engine No"
                value={user.carEngine}
                onChange={handleInputs}
                ></input>
            </div>
            </div>
        
               <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><PlaceIcon/></span>
                </div>
                <input list="Cities" name="departure" id="departure" placeholder="Origin" className="form-control"
                value={user.departure}
                onChange={handleInputs}/>
  <datalist id="Cities">
    <option value="Lahore"/>
    <option value="Islamabad"/>
    <option value="Karachi"/>
    <option value="Kashmir"/>
    <option value="Peshawar"/>
  </datalist>
                
                </div>
                </div>


            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><PlaceIcon/></span>
                </div>
                <input list="Cities" name="destination" id="destination" placeholder="Destination" className="form-control"
                value={user.destination}
                onChange={handleInputs}/>
  <datalist id="Cities">
    <option value="Lahore"/>
    <option value="Islamabad"/>
    <option value="Karachi"/>
    <option value="Kashmir"/>
    <option value="Peshawar"/>
  </datalist>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><CalendarTodayIcon/></span>
                </div>
                <input type="date" name="date" id="date" className="form-control"  min = "2021-12-25"
                value={user.date}
                onChange={handleInputs}
                placeholder="Date"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><TimerIcon /></span>
                </div>
                <input type="time" name="time" id="time"  className="form-control"
                value={user.time}
                onChange={handleInputs} 
                ></input>
            </div>
            </div>
            {/* <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><PhoneIcon /></span>
                </div>
                <input type="Number" name="number" id="number"  className="form-control"
                value={user.number}
                onChange={handleInputs} 
                placeholder="Enter Phone Number"></input>
            </div>
            </div> */}
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="text" name="registration" id="registration"  className="form-control"
                value={user.registration}
                onChange={handleInputs} 
                placeholder="Registration Number"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="text" name="color" id="color"  className="form-control"
                value={user.color}
                onChange={handleInputs} 
                placeholder="vehicle Color"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="text" name="meetupPoint" id="meetupPoint"  className="form-control"
                value={user.meetupPoint}
                onChange={handleInputs} 
                placeholder="Enter the Meetup Point"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><AttachMoneyIcon/></span>
                </div>
                <input type="text" name="charges" id="charges"  className="form-control"
                value={user.charges}
                onChange={handleInputs} 
                placeholder="Enter the Charges"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="form-group">
                <input type="submit" name="upload" id="Upload" value="Upload"
                onClick={PostData}
                 className="btn float-right login_btn"></input>
            </div>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        
);
}


export default RideDetails;