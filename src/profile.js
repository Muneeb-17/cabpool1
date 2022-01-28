import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './login.css';
import Navigation2 from "./Navigation2"


const Profile = () => {
    const history = useHistory();
    const PF = "http://localhost:5000/images/"
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [userImage, setUserImage] = useState('');
    const [data, setData] = useState('');
   const [newUser , setNewUser] =useState({
       photo: '',
   })


    const PostData = async () => {
        const res = await fetch('/changeData', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              userNumber

            })
        });
        res.json();
        if (res.status === 200) {
            window.alert("Save Changes");
        }
        else if(res.status === 422) {
            window.alert("Wrong Old Password");
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo' , newUser.photo);
        console.log(newUser.photo);

        axios.put('/profile' , formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser,photo:e.target.files[0]});
        console.log(newUser.photo);
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
            setUserName({ name: data.rootUser.name });
            setUserEmail({ email: data.rootUser.email });
            setUserNumber({ number: data.rootUser.number });
            setUserImage({image: data.rootUser.image})
           
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
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
               
                    <div class="col-md-3 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" src={newUser.photo ? URL.createObjectURL(newUser.photo) : PF+userImage.image} width="150px" height="200px" />
                            <span class="font-weight-bold">{userName.name}</span><span>
                            <input type="file" id="photo" name="photo" accept="image/*"
                                    onChange={handlePhoto}
                                />
                                    </span></div>
                                   <div className="Save"> <input type="submit" name="Save" value="Save"/> </div>
                    </div>
                 
                    
                    <div class="col-md-5 border-right">
                         <div class="p-3 py-5"> 
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" name="userName" id="userName" placeholder="first name" value={userName.name}
                                     /></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Email-ID</label><input type="text" class="form-control" name="userEmail" id="userEmail" value={userEmail.email} /></div>
                                <div class="col-md-12"><label class="labels">Phone Number</label><input type="text" class="form-control" name="userNumber" id="userNumber" placeholder="Enter Phone Number" value={userNumber.number} 
                                onChange={(e) =>
                                    setUserNumber(e.target.value)}/></div>
                            </div>
                             <div class="mt-5 text-center"><Link to ='/changePassword'><button class="btn btn-primary profile-button" type="button">Change Password</button></Link></div>
                             <div class="mt-5 text-center"><button class="btn btn-success profile-button" type="button"
                                onClick={PostData}>Save Profile</button>&nbsp;
                                <Link to='/home'><button class="btn btn-secondary profile-button" type="button">Go Back</button></Link></div>
                        </div>
                    </div>  

                </div>
            </div>
            </form>
           

        </>
    )
}

export default Profile;
