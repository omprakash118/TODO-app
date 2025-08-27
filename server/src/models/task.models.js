const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : ""
    }, 
    group : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Group',
        required : true
    },
    priority : {
        type : String,
        enum : ['low' , 'medium' , 'high'],
        default : 'medium'
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignTo : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
}, {timestamps : true});

const Task = mongoose.model( 'Task' ,taskSchema);
module.exports = Task;
