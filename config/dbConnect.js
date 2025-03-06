const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
        console.log("Database connected to: ", connect.connection.host, connect.connection.name);
    } catch(err) {
        console.log('error => ', err);
        process.exit(1);
    }
}

module.exports = connectDB;