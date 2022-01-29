import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './login.js';
import signUp from './signUp.js';
import HomePage from './home.js';
import rideDetails from './rideDetails';
import Ads from './ads';
import logout from './logout';
import About from './about';
import myRide from './myRide';
import AdsLogin from './AdsLogin';
import Update from './update';
import MyRequest from './myRequest';
import SendRequest from './sendRequest';
import AboutUs from './aboutUs';
import Profile from './profile';
import HomeLogin from './homelogin';
import Payment from './payment';
import Rating from './rating';
import ChangePassword from './changePassword';
import ErrorPage from './Errorpage';
import AdminLogin from './adminLogin';
import AdminData from './adminData';
import AdminUpdate from './adminUpdate';
import AdminUserData from './adminUserAds';


function App() {

  return (

    <Router>
      <div>
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/" exact component={HomeLogin} />
          <Route path="/login" exact component={Login} />
          <Route path="/SignUp" exact component={signUp} />
          <Route path="/rideDetails" exact component={rideDetails} />
          <Route path="/ads" exact component={Ads} />
          <Route path='/logout' exact component={logout} />
          <Route path='/about' exact component={About} />
          <Route path='/myRide' exact component={myRide} />
          <Route path='/adsLogin' exact component={AdsLogin} />
          <Route path='/update/:id' exact component={Update} />
          <Route path='/request' exact component={MyRequest} />
          <Route path='/sendRequest' exact component={SendRequest} />
          <Route path='/aboutUs' exact component={AboutUs} />
          <Route path="/profile" exact component={Profile} />
          <Route path= "/payment" exact component={Payment}/>
          <Route path = '/rating/:id' exact component={Rating}/>
          <Route path= '/changePassword' exact component={ChangePassword}/>
          <Route path= '/adminlogin' exact component={AdminLogin}/>
          <Route path= '/adminData' exact component={AdminData}/>
          <Route path='/adminUpdate/:id' exact component={AdminUpdate} />
          <Route path='/adminAds' exact component={AdminUserData} />
          <Route><ErrorPage/></Route>



        </Switch>
      </div>
    </Router>
  );

}

export default App;
