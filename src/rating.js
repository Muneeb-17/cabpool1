import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation2 from "./Navigation2";
import './rating.css';

const Rating = (props) => {
     const history = useHistory();
     const id = props.match.params.id;
     const [data, setData] = useState('');
     const [user, setUser] = useState({ rating: "" });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
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



     const postRating = async(e)=>{
        const { rating } = user;
         e.preventDefault();
         const res = await fetch('/rating/'+id,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              rating

            })
        });

        if(res.status===422||!res)
        {
           console.log("Invalid Entry");   
        } 
        else
        {
           window.alert("Added");
           console.log("Registration successfull");
           history.push('/home');
        }
        
    }
         
     

    return (
        <>
     <div className="header">
                <Navigation2 />
                <div class="rating-card">
<div><h1>Rating</h1></div>
<div class="rating">
<div class="rate" name="rating" id="rating" value={user.rating} onChange={handleInputs}>
    <input type="radio" id="star5" name="rating" value="5" />
    <label for="star5" title="5 Star">5 stars</label>
    <input type="radio" id="star4" name="rating" value="4" />
    <label for="star4" title="4 Star">4 stars</label>
    <input type="radio" id="star3" name="rating" value="3" />
    <label for="star3" title="3 Star">3 stars</label>
    <input type="radio" id="star2" name="rating" value="2" />
    <label for="star2" title="2 Star">2 stars</label>
    <input type="radio" id="star1" name="rating" value="1" />
    <label for="star1" title="1 Star">1 star</label>
  </div>
  <div className="ratingButton">
  <button type="button" class="btn btn-outline-dark"   onClick={postRating}>Submit</button>
  </div>
</div>

<div class="rating-process">
<div class="rating-right-part">
<p><i aria-hidden="true" class="fa fa-star"></i> 80%</p>
<div class="progress"></div>
</div>
<div class="rating-right-part">
<p><i aria-hidden="true" class="fa fa-star"></i> 60%</p>
<div class="progress-2"></div>
</div>
<div class="rating-right-part">
<p><i aria-hidden="true" class="fa fa-star"></i> 40%</p>
<div class="progress-3"></div>
</div>
<div class="rating-right-part">
<p><i aria-hidden="true" class="fa fa-star"></i> 20%</p>
<div class="progress-4"></div>
</div>
<div class="rating-right-part">
<p><i aria-hidden="true" class="fa fa-star"></i> 10%</p>
<div class="progress-5"></div>
</div>
</div>
<div style={{clear:"both"}}></div>
</div>
</div>
        </>
    )
}

export default Rating;