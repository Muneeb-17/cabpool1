const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser);
var cookieParser = require('cookie-parser')
app.use(express.json());
const jwt = require('jsonwebtoken');
const router = express.Router();
require('../app.js');
const User = require('../models/userSchema');
const Driver = require('../models/userSchemaRide');
const Ride = require('../models/DetailsSchema')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
app.use(cookieParser());
const authenticate = require('../middleware/authenticate');
app.use(express.urlencoded({ extended: true }));
const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
const multer = require('multer');
const path = require('path');
var http = require('http');

var nStatic = require('node-static');
const { log } = require('console');

var fileServer = new nStatic.Server('./images');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage })

//app.use('/images', express.static(path.join(__dirname,'../images')));


router.put('/profile' ,upload.single('photo'), authenticate, async(req,res)=>{
 const success = req.file.filename+"uploaded successfully";
try{
 const loginData = await req['rootUser'].id;
 const upload = await User.findByIdAndUpdate(loginData,{
   image:req.file.filename,
 })
}catch(e){
  console.log(e);
}

});
//making images folder public

router.post('/register', async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- register');
  const { name, email, password, cpassword, number } = req.body;
  if (!name || !email || !password || !cpassword || !number) {
    return res.status(400).json({ error: "plz filled the field" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email is Already is Registed" });
    }
    else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    }
    else {
      const user = new User({ name, email, password, cpassword, number });


      await user.save();
      res.status(201).json({ message: "user registed successfully" });

    }

  } catch (err) {
    console.log(err);
  }
  //res.json({message: req.body}); 
});

//login 
router.post('/login', async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- login');
  try {
    let token;
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(422).json({ error: "please filled the field" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {

      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      // console.log("the token part " + token);

      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials " });
      } else {
        res.json({ message: "User Login Successfully" });
      }
    }
    else {
      res.status(400).json({ error: "Invalid Credientials " });
    }
  }
  catch (err) {
    console.log(err);
  }
});





router.post('/rideDetails',authenticate, async (req, res) => {
  try {

    console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- rideDetails post');

    const { userName, departure, destination, date, time, number, registration, color, meetupPoint, charges } = req.body;

    if (!departure || !destination || !date || !time || !number || !registration || !color || !meetupPoint || !charges) {
      return res.status(422).json({ error: "plz filled the field" });
    }
    else {
      const loginData = await req['rootUser'].id;
      const loginUserName = await req['rootUser'].name;
      const loginEmail = await req['rootUser'].email;
      const loginImage = await req['rootUser'].image;
      console.log(loginUserName);
      console.log("=========================");
      const userData = new Ride({ loginId: loginData, loginName: loginUserName, userName: loginEmail, image:loginImage, departure, destination, date, time, number, registration, color, meetupPoint, charges });
      const allAds = new Driver({ userName: loginUserName, departure, destination, date, time, number, registration, color, meetupPoint, charges });
      console.log("=====================12121====");
      await userData.save();
      await allAds.save();
      res.status(201).json({ message: "Added" });

    }
  } catch (e) {
    console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
    console.log(e);
    res.send(e);
  }
});


router.get('/rideDetails', authenticate, async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- rideDetails');
  try {
   
    const driverData = await Ride.find();
    res.send(driverData);
  
  } catch (e) {
    res.send(e);
  }
});


router.get('/myRide', authenticate, async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- myRide');
  try {
    const loginData = await req['rootUser'].id;
    const userData = await req['rootUser'].name;
    console.log(userData);
    const driverData = await Ride.find({ loginId: loginData });
    console.log(driverData)
    res.send(driverData);

  } catch (e) {
    res.send(e);
  }
});


router.put('/update/:id', async (req, res) => {
  console.log("=================update");
  const id = req.params.id;
  console.log(id);
  try {
    const result = await Ride.findById(id);
    console.log(result);
    const updateResult = await Ride.findByIdAndUpdate(id, {
      $set: req.body,
    },
      { new: true }
    );

    res.status(200).json(updateResult);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/cancel/:id', async (req, res) => {
  const id = req.params.id
  console.log(id);
  console.log("============Cancel");
  try{
    const todo = await Ride.findOne({"requests._id":id})
    console.log(todo);
    console.log(todo.requests);
    todo.requests.pull({ _id: id })
    todo.save();
    }catch(err)
    {
      console.log("======Errrr======Cancel");
      console.log(err);
    }
  
});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id);
  console.log("============delete");
  await Ride.findByIdAndDelete(id).then(user => {
    if (user) {
      return res.status(200).json({ success: true, message: 'the User is deleted' })
    } else {
      return res.status(404).json({ success: true, message: 'User not found' })
    }
  }).catch(err => {
    return res.status(500).json({ success: false, error: err })
  })
  
});

router.put('/accept/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const accept = "Accepted"; 
  const requestFind = await Ride.findOne({"requests._id":id});
 // requestFind.requests.addToSet({accept:accept});
    // requestFind.save();
   
})



router.put('/request/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const rootId = await req['rootUser'].id;
  const userData = await req['rootUser'].name;
  const userDataa = await req['rootUser'].number;
  const passenger = req.body.passenger;  
  const data = await Ride.find({loginId:rootId})
  console.log(data);
   if (data == false) {
    await Ride.findByIdAndUpdate(id,
      {
        $addToSet: {
          requests: [
            {
              name: userData,
              number: userDataa,
              passenger:passenger,
            }
          ]
        },
      },
    
      function (err) {
        if (err) {
          console.log(err)
        }
        else {
          res.status(200).json({ message: "Request Send" });
          console.log("Updated User : ");
        }
      })
  
  }
  else {
     res.status(500).json({ error: "Request Not Sent:Authorization" });
  }
})


//home
router.get('/home', authenticate, async (req, res) => {
  
    console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- hello');
    let now = new Date();
    var dateString = moment().subtract(1, 'days').format('YYYY-MM-DD');
    await Ride.deleteMany({ date: dateString });
    res.send({ rootUser: req['rootUser']})
    
});

router.put('/password', authenticate, async(req,res)=>{

  try {
    console.log("===========profile");
     const rootUser1 = req['rootUser']._id;
     const userName = req.body.userName
     const password = req.body.password;
     const cpassword = req.body.cpassword;
     const oldPassword = req.body.oldPassword;
         const newpass = await bcrypt.hash(password,12);
         const newCpass = await bcrypt.hash(cpassword,12);
         
         const match = await User.findById(rootUser1)
         if(match)
        {
         const isMatch =  await bcrypt.compare(oldPassword , match.password)
         if(isMatch)
         {
          const find = await User.findByIdAndUpdate(rootUser1, {
              password:newpass,
              cpassword:newCpass,
          },
            { new: true });
          res.status(200).json({message: "Save Changes"});
         }
         else {
           return  res.status(201).json({ error: "Wrong Password" });
         }

        }
  }
 catch (e) {
  console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
  res.status(500).json(e);
  console.log(e);

}

})

router.get('/logout', (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- logout');
  res.clearCookie("jwt");
  res.redirect("/home");
});


router.get('/getData', async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- getData');
  let now = new Date();
  var dateString = moment().subtract(1, 'days').format('YYYY-MM-DD');
  await Ride.deleteMany({ date: dateString });
  const driverData = await Ride.find();
  res.send(driverData);
});

router.get('/getData/:id', async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- getData');
  const id = req.params.id;
  const driverData = await Ride.findById(id);
  res.send(driverData);
});

router.get('/getRequest',authenticate, async (req,res) => {
  console.log("-------------GetRequest");
  const request =  await req['rootUser'].name;
 const find = await Ride.find({"requests.name":request});
 res.send(find);
  
})


module.exports = router;
