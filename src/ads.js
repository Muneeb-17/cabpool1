import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import NavigationLogin from "./Navigation2";
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import 'font-awesome/css/font-awesome.min.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TimerIcon from '@material-ui/icons/Timer';
import './search.css';


const Ads = () => {
    const history = useHistory();
    const [ads, getAds] = useState([]);
    const [search, setSearch] = useState('');
    const [searcha, setSearcha] = useState('');
    const [date, setDate] = useState('');
    const [text, setText] = useState(false);


    const getUser = async () => {
        try {
            const response = await fetch('/rideDetails', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            getAds(await response.json());

            const data = await response.body;
            console.log("=============ads");
            console.log(data);

            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }
    const request = async (id) => {
        const response = await fetch(`/request/${id}`, {
            method: 'PUT'
        })
        console.log(response.status);
        if (response.status === 200 || !response) {
            window.alert("Request Sent");
            setText(true);
        }
    }
    useEffect(() => {
        getUser();
        request();
    }, []);
    return (
        <div className="header">
            <NavigationLogin />
            <div>
                <div className="s01">
                    <form>
                        <div className="inner-form">
                            <div className="input-field first-wrap">
                                <input id="search" type="text" placeholder="Orign"
                                    onChange={event => { setSearch(event.target.value) }} />
                            </div>
                            <div className="input-field second-wrap">
                                <input id="location" type="text" placeholder="Destination"
                                    onChange={event => { setSearcha(event.target.value) }} />
                            </div>
                            <div className="input-field second-wrap">
                                <input id="location" type="date" placeholder="Destination"
                                    onChange={event => { setDate(event.target.value) }} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container mt-5 ">
                    <div className="row text-center">
                        {ads.filter((val) => {
                            if (search === "" && searcha === "" && date === "") {
                                return val;
                            }
                            else if (val.departure.toLowerCase().includes(search.toLowerCase()) && val.destination.toLowerCase().includes(searcha.toLowerCase())
                                && val.date.toLowerCase().includes(date.toLowerCase())) {
                                return val;
                            }
                        }).map((element) => {
                            return (

                                <div className="col-10 col-md-4 mt-5" key={element.id}>
                                    <div className="trainer-card">
                                        <div className="d-flex align-items-center">
                                            <div className="ml-3 w-100">
                                                <div className="trainer-card-photo"></div>
                                                <h4 className="trainer-name-title">{element.loginName}</h4>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="origin">
                                                            <div><span><PlaceIcon /></span> <span className="origin1">{element.departure}</span> </div>
                                                            <MoreVertIcon />
                                                            <div> <span><PlaceIcon /></span> <span className="destination1">{element.destination}</span> </div>
                                                        </div>
                                                        <hr class="dashed"></hr>
                                                        <div className="origin">
                                                            <div> <span><PhoneAndroidIcon /></span> <span className="origin1">{element.number}</span> </div>
                                                            <div> <span><DriveEtaIcon /></span> <span className="destination1">{element.registration}</span> </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="origin">
                                                            <div><span><CalendarTodayIcon /></span> <span className="origin1">{element.date}</span> </div>
                                                            <br />
                                                            <div> <span><TimerIcon /></span> <span className="destination1">{element.time}</span> </div>
                                                        </div>
                                                        <hr class="dashed"></hr>
                                                        <div className="origin">
                                                            <div> <span><DriveEtaIcon /></span> <span className="origin1">{element.color}</span> </div>
                                                            <div> <span><PlaceIcon /></span><span className="destination1">{element.meetupPoint}</span> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr class="dashed"></hr>
                                                <div className="origin">
                                                    <div> <span>RS</span> <span className="origin1">{element.charges}</span> </div>
                                                    <label for="passenger">No. of Passenger:</label>
  <select name="passenger" id="passenger">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    </select>
                                                </div>
                                                <div>
                                                    <div className="button:hover"><button className="button12" onClick={() => {
                                                        request(element._id);
                                                    }}>Request</button> </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        })

                        }

                    </div>
                </div>
            </div>
        </div >
    );
}
export default Ads;