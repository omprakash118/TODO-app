const mongoose = require('mongoose');
const { DB_NAME } = require('../constant.js');

console.log(DB_NAME);

const conectDB = async () => {
    try {
        
        const uri = `${process.env.MONGO_URL}/${DB_NAME}`
        console.log(`Uri is - ${uri}`);

        const connectionInstance = await mongoose.connect(uri);

        console.log(` MongoDB Connected !! DB_HOST :- ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error('MongoDB Connection Failed - ', error) 
        process.exit(1); // Exit process with failure
    }
}

module.exports = conectDB;