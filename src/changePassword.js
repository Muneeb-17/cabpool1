import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './login.css';
import Navigation2 from "./Navigation2"


const ChangePassword = () => {
    const history = useHistory();
    const [formError , setFormError] = useState({});
    const [isSubmit , setIsSubmit] = useState(false);
    
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [data, setData] = useState('');
  


    const PostData = async () => {
        const res = await fetch('/password', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              password,cpassword,oldPassword

            })
        });
        console.log('/////////////////////');
			 setFormError(validate(password));
			 setIsSubmit(true);

        res.json();
        if (res.status === 200) {
            window.alert("Save Changes");
            history.push('/profile');
        }
        
        else if(res.status === 422) {
            window.alert("Password Not Matched");
        }
        else if(res.status === 400) {
            window.alert("Please Filled the Feilds");
        }

    }

    useEffect(() => {
        console.log(formError);
        if(Object.keys(formError).length === 0 && isSubmit){
        }
    },[formError]);
      const validate = (values) => {
          const errors = {};
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(!values.password)
          {
              errors.password = "Password is required";
          } 
          if(values.password !== values.cpassword)
          {
              errors.cpassword = "Password not Match";
          }

          return errors;
      }


     const getData = async () => {

         try {
             const res = await fetch('/home', {
                 method: "GET",
                 headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json"
                 },
                 credentials: "include",
             });

             console.log(' catching error ------ Body---------------------');
             const data = await res.json();
             setData(data)
             console.log(res.status);
         } catch (err) {
             console.log(err);
             console.log(' redirect --==-=-=-=-=-=-=-=-=-=-=--==-=-=');
             history.push('/login');

         }
     }
     useEffect(() => {
         getData();
     }, []);


    return (
        <>
            <Navigation2 />
            <form>
            <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
               
                    <div class="col-md-3 border-right">
                       
                    </div>
                 
                    
                    <div class="col-md-5 border-right">
                         <div class="p-3 py-5"> 
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Change Password</h4>
                            </div>
                                <div class="row mt-3">
                                <div class="col-md-12">
                                    <label class="labels">Enter Old Password</label>
                                    <input type="password" class="form-control" name="oldpassword" id="oldpassword" placeholder="Enter old Password"
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)} /></div>
                                <div class="col-md-12">
                                    <label class="labels">Enter New Password</label>
                                    <input type="password" class="form-control" name="password" id="password" placeholder="Enter new Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)} /></div>
                                <div class="col-md-12">
                                    <label class="labels">Phone Passowrd Again</label>
                                    <input type="password" class="form-control" name="cpassword" id="cpassword" placeholder="Enter New Password Again"
                                        onChange={(e) =>
                                            setCPassword(e.target.value)} /></div>
                                            <div className="error">{formError.cpassword}</div>
                            </div>
                            <div class="mt-5 text-center"><button class="btn btn-success profile-button" type="button"
                                onClick={PostData}>Save</button>&nbsp;
                                <Link to='/profile'><button class="btn btn-secondary profile-button" type="button">Go Back</button></Link></div>

                        </div>
                        
                        
                    </div>

                </div>
            </div>
            </form>
        </>
    )
}

export default ChangePassword;
