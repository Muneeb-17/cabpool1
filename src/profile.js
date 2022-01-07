import React,{ useEffect, useState } from "react";
import {NavLink, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './login.css';
import Navigation2 from "./Navigation2";
import HomeDesign from './homeDesign.js';

const Profile = () => {
    const history = useHistory();
    const [userName , setUserName] = useState({});
    const [userEmail , setUserEmail] = useState({});
    const [userNumber , setUserNumber] = useState({});
    const [show , setShow] = useState(false);

    const PostData = async (e)=>{
        e.preventDefault();
        const res = await fetch('/profile',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userName,userNumber

            })
        });
    }
   
    const getData = async() => {
       
        try{
             const res = await fetch('/home', {
                 method:"GET",
                 headers:{
                     Accept: "application/json",
                     "Content-Type": "application/json"
             },
                 credentials:"include",
            });


             

             console.log(' catching error ------ Body---------------------');
             console.log(res);
             const data = await res.json();
             const data1 = await res.body;
             console.log(data);
             console.log(data.rootUser.name);
             setUserName({name: data.rootUser.name});
             setUserEmail({email: data.rootUser.email});
             setUserNumber({number: data.rootUser.number});
             setShow(true);

            
             console.log(res.status);
            }catch(err)
            {
                console.log(err);
                console.log(' redirect --==-=-=-=-=-=-=-=-=-=-=--==-=-=');
                history.push('/login');

            }
    }
 useEffect(()=>{
getData();
 },[]);


    return (
        <>
        <Navigation2/>
        
        <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://images.pexels.com/photos/4241412/pexels-photo-4241412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" width="150px" height="200px"/><span class="font-weight-bold">{userName.name}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" value={userName.name}
                     onChange={(e)=>
                        setUserName(e.target.value)}/></div>
                    </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Email-ID</label><input type="text" class="form-control" placeholder="enter phone number" value={userEmail.email}/></div>
                    <div class="col-md-12"><label class="labels">Phone Number</label><input type="text" class="form-control" placeholder="enter email id" value={userNumber.number}
                     onChange={(e)=>
                        setUserNumber(e.target.value)}/></div>
                   </div>
               
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button"
                onClick={PostData}>Save Profile</button></div>
            </div>
        </div>
      
    </div>
</div>

        </>
    )
}

export default Profile;
