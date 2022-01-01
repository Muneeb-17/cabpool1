const mongoose = require('mongoose');
const { string } = require('yargs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const isEmail = require('validator');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        
    },
    password: {
        type:String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    },
    number:{
        type: Number,
        require: true
    },
    tokens:[
        {
        token:{
            type: String,
            require: true
        }
        }
    ]
})
//[{type: mongoose.Schema.Types.ObjectId , ref:'Driver'}],
userSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
       let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token:token});
       
       await this.save();
       return token;
    }catch(err){
      console.log(err);
    }
}

const User = mongoose.model('signUp', userSchema);
module.exports = User;