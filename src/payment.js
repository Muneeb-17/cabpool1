import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navigation2 from "./Navigation2";
import { Card } from 'react-bootstrap';
import './search.css';
import './popup.css';
const Payment = () => {
    const history = useHistory();
    const [ads, getads] = useState([]);
    const [data, setData] = useState('');
    const [user, setUser] = useState({ payment: "" });

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
            getads(data);
            console.log("=============ads");

            if (!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const payment = async (id) => {
        const { payment } = user;
        const response = await fetch(`/payment/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payment
            })
        });
    }
    useEffect(() => {
        getPayment();
        payment();
    }, []);
    return (
        <>
            <div className="header">
                <Navigation2 />
                {ads.map((element) =>
                    <div class="payment-card">
                        <h1>Payment</h1>
                        <p class="price">Rs {element.charges}</p>
                        <input className="textFeild" type="text" id="payment" name="payment" value={user.payment}
                            onChange={handleInputs} /><br />
                        {/* <p><Link to ='#popup1'><button className="paymentButton" onClick={() => {
                            payment(element._id);
                        }}>Add</button></Link></p> */}
                        
                        <a href="#popup1" className="paymentButton" onClick={() => {
                                payment(element._id);
                            } }>Save</a><div id="popup1" class="overlay">
                                    <div class="popup">
                                        <h2>Payment</h2>
                                        <a class="close" href="#">&times;</a>
                                        <>
                                            {/* <Link to="/rating/+ID"><button type="button" className="buttonPayment">Give Rating </button></Link> */}
                                            {element.requests.map((c, i) => (
                                            <><button className="buttonPayment" onClick={() => {
                                                    history.push("/rating/" + c.ID);
                                                }}>Rate {c.name}</button>
                                                 </>
                                                ))}
                                                <Link to='/home'> <button type="button" className="buttonPopup">Go Back</button></Link>
                                               
                                        </>

                                    </div>
                                </div>

                        <p><Link to='/request'><button className="paymentButton">Cancel</button></Link></p>
                    </div>
                        
                )}
            </div>
        </>
    )

}

export default Payment;