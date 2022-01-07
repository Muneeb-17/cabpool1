import { useEffect, useState } from "react";
import {useHistory,Link} from "react-router-dom";
import { Navbar} from 'react-bootstrap';
import './login.css';
import 'bootstrap/dist/css/bootstrap.css';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import Navigation from "./navigation";
const SignUp = () => {
      const history=useHistory();
		const [user, setUser] = useState({
			name: "", email: "", password: "", cpassword: "", number: ""
		});
		const [formError , setFormError] = useState({});
		const [isSubmit , setIsSubmit] = useState(false);
        let name,value;
        const handleInputs = (e) =>
		{
         name = e.target.name;
		 value = e.target.value;

		 setUser({...user, [name]:value})
		} 
		

		
         const PostData = async (e)=>{
			 e.preventDefault();
			 const {name,email,password,cpassword,number}=user;
			 const res = await fetch('/register',{
				 method:"POST",
				 headers: {
					 "Content-Type": "application/json"
				 },
				 body: JSON.stringify({
					name,email,password,cpassword,number

				 })
			 });
			 console.log('/////////////////////');
			 setFormError(validate(user));
			 setIsSubmit(true);

			  res.json();
			  console.log(res.status);
			 if(res.status===422||!res)
			 {
				window.confirm("Email is Already Registed");
				console.log("Invalid Registration");
				
			 }else if (res.status === 400){
				 
			 }
			 else
			 {
				window.confirm("Registration Successfull");
				console.log("Registration successfull");	
				history.push('/login');
			 }
		 }
		 useEffect(() => {
			console.log(formError);
			if(Object.keys(formError).length === 0 && isSubmit){
				console.log(user);
			}
		},[formError]);
		  const validate = (values) => {
			  const errors = {};
			  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			 if(!values.name)
			 {
				 errors.name = "Name is required";
			 }
			  if(!values.email)
			  {
				  errors.email = "Email is required";
			  }else if(!regex.test(values.email)) {
				  errors.email ="Not a valid Email";
			  }
			  if(!values.password)
			  {
				  errors.password = "Password is required";
			  } else if (values.password < 4) {
				errors.password = "Password must be more than 10 characters";
			  } else if (values.password > 10) {
				errors.password = "Password must be more than 4 characters";
			  }
			  if(values.password !== values.cpassword)
			  {
				  errors.cpassword = "Password not Match";
			  }
			  if(!values.number)
			  {
				  errors.number = "Number is Required";
			  }

			  return errors;
		  }
	
        return ( 
        <div className="header">
        <Navigation/>
        <div className="bg_image">
	<div className="d-flex justify-content-center h-100">
		
		<div className="card">
			<div className="card-header">
				<h3>SignUp</h3>
			</div>
			<div className="card-body">
				<form method="POST">
					<div className="feilds">
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><PersonIcon /></span>
						</div>
						<input type="text"  name="name" id="name" className="form-control" placeholder="Name"
							value={user.name}
							onChange={handleInputs}>
						</input>
						</div>
						</div>
						<div className="error">{formError.name}</div>
						<div className="feilds">
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><PersonIcon /></span>
						</div>
						<input type="email" name="email" id="email" className="form-control"
						value={user.email}
						onChange={handleInputs}
						 placeholder="Email"></input>
						</div>
					</div>
					<div className="error">{formError.email}</div>
					<div className="feilds">
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><VpnKeyIcon /></span>
						</div>
						<input type="password" name="password" id="password"  className="form-control" maxlength="10" size="10"
						value={user.password}
						onChange={handleInputs}
						placeholder="Password"></input>
					</div>
					</div>
					<div className="error">{formError.password}</div>
					<div className="feilds">
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><VpnKeyIcon /></span>
						</div>
						<input type="password" name="cpassword" id="cpassword" className="form-control" minlength="4" maxlength="10" size="10"
						value={user.cpassword}
						onChange={handleInputs}
						placeholder=" Comfirm password"></input>
					</div>
					</div>
					<div className="error">{formError.cpassword}</div>
					<div className="feilds">
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><PhoneIcon /></span>
						</div>
						<input type="text" name="number" id="number"  className="form-control"
						value={user.number}
						onChange={handleInputs} 
						placeholder="Enter Phone Number"></input>
					</div>
					</div>
					<div className="error">{formError.number}</div>
					<div className="feilds">
					<div className="form-group">
						<input type="submit" name="signUp" id="signUp" value="SignUp"
						onClick={PostData} className="btn float-right login_btn"></input>
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


export default SignUp;