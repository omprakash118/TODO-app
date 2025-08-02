const mongoose = require('mongoose');

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



module.exports = userSchema;