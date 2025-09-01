// seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv
dotenv.config(); // Load environment variables from .env file

const email = require('./model/email'); // Adjust the path as needed
const data = require('./data/emails.json'); // Adjust the path as needed

const DB_URI = process.env.MONGO_URI; // Use the environment variable

const seedDB = async () => {
    try {
        if (!DB_URI) {
            throw new Error('MONGO_URI not found in environment variables. Please check your .env file.');
        }

        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully.');

        // Clear existing data to prevent duplicates
        await email.deleteMany({});
        console.log('Existing emails cleared.');

        // Insert new emails from the data file
        await email.insertMany(data);
        console.log('Database seeded with initial emails.');

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding the database:', error);
        if (mongoose.connection.readyState === 1) {
            mongoose.connection.close();
        }
    }
};

seedDB();