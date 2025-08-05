const express = require('express');
// dotenv.require()
const app = express();

app.get('/' , (req, res) => {
    res.send("Hello Om");
})

app.get('/home' , (req,res) => {
    res.send("This is the home page ");
})
module.exports = {app};