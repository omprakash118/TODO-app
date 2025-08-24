const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    createdBy : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true,
    },
    members : [{
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true,
    }]
}, {timestamps : true});

const Group = mongoose.model('Group' , groupSchema);
module.exports = Group;