const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
}

module.exports = connect;