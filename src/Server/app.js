const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require('./router/auth'));
dotenv.config({path:'./config.env'});
require('./DB/conn');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());


app.listen(5000, () =>{
    console.log('server is running' ); 
});



 