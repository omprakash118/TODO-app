const dotenv = require('dotenv');
const conectDB = require('./config/db.js');
const { app } = require('./app.js');
const PORT = process.env.PORT || 8000;
const http = require('http');
const { Server } = require('socket.io');
const { Socket } = require('dgram');

dotenv.config({
    path : './.env'
});

const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : '*',
    },
});

io.on("connection", (socket) => {
    console.log('✅ Client Connected :' , socket.id);
    
    socket.on("disconnected", () => {
        console.log('❌ Client disconnected :' , socket.id);
    })
})

app.set("io", io);


conectDB()
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`⚙️ Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting server:', error);
});
