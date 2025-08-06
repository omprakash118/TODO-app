const mongoose = require('mongoose');
const { DB_NAME } = require('../constant.js');

console.log(DB_NAME);

const conectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        // console.log(` MongoDB Connected !! DB_HOST :- ${connectionInstance.connection.host}`);
        console.log("✅ MongoDB Atlas connected successfully");
    } catch (error) {
        console.error('❌ MongoDB Connection Failed - ', error) 
        process.exit(1); // Exit process with failure
    }
}

module.exports = conectDB;