const express = require('express');
// dotenv.require()
const app = express();

const authRoutes = require('./routes/auth.rutes.js');
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');

app.get('/' , (req, res) => {
    res.send("Hello Om");
})

app.get('/home' , (req,res) => {
    res.send("This is the home page ");
})

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/task' , taskRoutes);

module.exports = {app};