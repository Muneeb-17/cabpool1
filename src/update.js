import { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import './login.css';
import 'bootstrap/dist/css/bootstrap.css';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TimerIcon from '@material-ui/icons/Timer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NavigationLogin from "./Navigation2";


const Update=(props)=>{
    const history=useHistory();
    const id  = props.match.params.id;
    const [departure , setDeparture] = useState('');
    const [destination , setDestination] = useState('');
    const [date , setDate] = useState('');
    const [time , setTime] = useState('');
    const [number , setNumber] = useState('');
    const [registration , setRegistration] = useState('');
    const [color , setColor] = useState('');
    const [meetupPoint , setMeetupPoint] = useState('');
    const [charges , setCharges] = useState('');
    const [ads , setAds] = useState('');
  
  
   
     const PostData = async (e)=>{
         e.preventDefault();
         //const {departure,destination,date,time,number,registration,color,meetupPoint,charges};
         const res = await fetch('/update/'+id,{
             method:"PUT",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                departure,destination,date,time,number,registration,color,meetupPoint,charges

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
            history.push('/myRide');
         }
         
     }
     
     const getUser = async () => {
        try{
       const response = await fetch('/getData/'+id,{
           method:"GET",
           headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
           },
           credentials: "include"
        });
      
       const data = await response.json();
       setAds(data);
       setDeparture(data.departure);
       setDestination(data.destination);
       setDate(data.date);
       console.log(date);
       setTime(data.time);
       setNumber(data.number);
       setRegistration(data.registration);
       setColor(data.color);
       setMeetupPoint(data.meetupPoint);
       setCharges(data.charges);

     

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
                    <span className="input-group-text"><PlaceIcon /></span>
                </div>
                <input type="text"  name="departure" id="departure" className="form-control" placeholder="Orign"
                    value={departure}
                    onChange={(e)=>
                    setDeparture(e.target.value)}>
                </input>
                </div>
                </div>


            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><PlaceIcon /></span>
                </div>
                <input type="text" name="destination" id="destination"  className="form-control" 
                value={destination}
                onChange={(e)=>
                setDestination(e.target.value)}
                placeholder="Destination"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><CalendarTodayIcon /></span>
                </div>
                <input type="date" name="date" id="date" className="form-control" 
               value={date}
               onChange={(e)=>
               setDate(e.target.value)}
                placeholder="Date"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><TimerIcon /></span>
                </div>
                <input type="time" name="time" id="time"  className="form-control"
                value={time}
                onChange={(e)=>
                setTime(e.target.value)}
                ></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="Number" name="number" id="number"  className="form-control"
                value={number}
                onChange={(e)=>
                setNumber(e.target.value)}
                placeholder="Enter Phone Number"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="text" name="registration" id="registration"  className="form-control"
                value={registration}
                onChange={(e)=>
                setRegistration(e.target.value)}
                placeholder="Registration Number"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="text" name="color" id="color"  className="form-control"
                 value={color}
                 onChange={(e)=>
                 setColor(e.target.value)}placeholder="vehicle Color"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><DriveEtaIcon /></span>
                </div>
                <input type="text" name="meetupPoint" id="meetupPoint"  className="form-control"
                value={meetupPoint}
                onChange={(e)=>
                setMeetupPoint(e.target.value)}
                placeholder="Enter the Meetup Point"></input>
            </div>
            </div>
            <div className="feilds">
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><AttachMoneyIcon/></span>
                </div>
                <input type="text" name="charges" id="charges"  className="form-control"
                 value={charges}
                 onChange={(e)=>
                 setCharges(e.target.value)}placeholder="Enter the Charges"></input>
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


export default Update;