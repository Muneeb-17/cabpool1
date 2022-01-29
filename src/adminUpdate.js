import React, { useState, useEffect } from "react";
import {NavLink, Link, useHistory } from "react-router-dom";
import { Navbar,NavDropdown,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './adminUpdate.css';

const AdminUpdate = (props) => {
    const history=useHistory();
    const id  = props.match.params.id;
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [number , setNumber] = useState('');
    const [password , setPassword] = useState('');
    const [cpassword , setcpassword] = useState('');
    const [ads , setAds] = useState('');

    const PostData = async (e)=>{
        e.preventDefault();
        //const {departure,destination,date,time,number,registration,color,meetupPoint,charges};
        const res = await fetch('/adminUpdate/'+id,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name,email,password,cpassword,number
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
           history.push('/adminData');
        }
        
    }
    const getUser = async () => {
        try{
       const response = await fetch('/getAdminData/'+id,{
           method:"GET",
           headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
           },
           credentials: "include"
        });
      
       const data = await response.json();
       setAds(data);
       setName(data.name);
       setEmail(data.email);
       setNumber(data.number);
       setPassword(data.password);
       setcpassword(data.cpassword);
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
        <>

<form method="post" action="/" id="form" class="validate">
  <div class="form-field">
    <label className="adminLabel" for="full-name">Name</label>
    <input type="text" name="full-name" id="full-name" placeholder="" required   value={name}
                    onChange={(e)=>
                    setName(e.target.value)} />
  </div>
  <div class="form-field">
    <label className="adminLabel" for="email-input">Email</label>
    <input type="email" name="email-input" id="email-input" placeholder="" required   value={email}
                    onChange={(e)=>
                    setEmail(e.target.value)} />
  </div>
  <div class="form-field">
    <label className="adminLabel" for="password-input">Password</label>
    <input type="text" name="password-input" id="password-input" required   value={password}
                    onChange={(e)=>
                    setPassword(e.target.value)} />
  </div>
  <div class="form-field">
    <label className="adminLabel" for="password-input"> Confirm Password</label>
    <input type="text" name="password-input" id="password-input" required    value={cpassword}
                    onChange={(e)=>
                    setcpassword(e.target.value)}/>
  </div>
  <div class="form-field">
    <label className="adminLabel" for="password-input">Number</label>
    <input type="number" name="password-input" id="password-input" required   value={number}
                    onChange={(e)=>
                    setNumber(e.target.value)} />
  </div>
  <div class="form-field">
    <label for=""></label>
    <input type="submit" value="Save"  onClick={PostData} />
  </div>
</form>
        </>
    );
}

export default AdminUpdate;