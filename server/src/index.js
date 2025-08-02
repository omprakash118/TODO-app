const dotenv = require('dotenv');
const conectDB = require('./config/db.js');
const { app } = require('./app.js');

dotenv.config({
    path : './.env'
});

conectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`⚙️ Server is running on port ${process.env.PORT}`);
    });
}).catch(() => {
    console.error('Error starting server:', error);
});
