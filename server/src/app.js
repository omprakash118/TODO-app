const express = require('express');
const cors = require("cors");
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