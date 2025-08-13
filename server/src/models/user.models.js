const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    FirstName : {
        type : String,
        required : true
    },
    LastName : {
        type : String,
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    refreshToken : {
        type : String,
        default : ''
    },
}, {timestamps : true});

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password , 10);
    next();
})

userSchema.methods.isPasswordCurrect = async function(password){
    console.log("Password :- ", password);
    console.log("This :- ", this.password);

    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRES || "15m"
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRES || '7d'
        }
    )
}

const User = mongoose.model('User' , userSchema);
module.exports = User;