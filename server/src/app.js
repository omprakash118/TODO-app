const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
// dotenv.require()
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const authRoutes = require('./routes/auth.rutes.js');
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const groupRoutes = require('./routes/group.rutes.js');
const dashboardRoutes = require('./routes/dashboard.rutes.js');

app.get('/' , (req, res) => {
    res.send("Hello Om");
})

app.get('/home' , (req,res) => {
    res.send("This is the home page ");
}) 

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/task' , taskRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/dashboardData', dashboardRoutes);


module.exports = {app};