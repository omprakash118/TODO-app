const dotenv = require('dotenv');
const conectDB = require('./config/db.js');
const { app } = require('./app.js');
const PORT = process.env.PORT || 8000;

dotenv.config({
    path : './.env'
});

conectDB()
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`⚙️ Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting server:', error);
});
