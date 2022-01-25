import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navigation2 from "./Navigation2";
import { Card } from 'react-bootstrap';
import './search.css';

const Payment = () => {
    const [ads,getads] = useState([]);
    const [userData , setUserData] = useState({});
    const getPayment = async () => {
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
            console.log(data);
            getads(data);
            const newData = await response.body;
            console.log("=============ads");
            
            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

  useEffect(() => {
    getPayment();
    }, []);
    return (
        <>
        <div className="header">
            <Navigation2 />
            {ads.map((element) =>
            <div class="payment-card">
            <h1>Payment</h1>
            <p class="price">Rs {element.charges}</p>
            <input className="textFeild" type="text" id="fname" name="fname"/><br/>
            <p><button>OK</button></p>
            <p><button>Cancel</button></p>
          </div>
            )}
     </div>
        </>
    )

}

export default Payment;