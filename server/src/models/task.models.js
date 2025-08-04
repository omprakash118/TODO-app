const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    taskStatus : {
        type : String,
        default : 'pending'
    },
    priority : {
        type : String,
        enum : ['low' , 'medium' , 'high'],
        default : 'medium'
    },
    dueDate : Date,
    tag : [String],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps : true});

const Task = mongoose.model( 'Task' ,taskSchema);
module.exports = Task;
