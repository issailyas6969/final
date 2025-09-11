import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Email from './model/email.js'; // Use ES module import syntax
import data from './data/emails.json' with { type: 'json' }; // Corrected import for JSON file

dotenv.config(); // Load environment variables from .env file

const DB_URI = process.env.MONGO_URI; // Use the environment variable

const seedDB = async () => {
    try {
        if (!DB_URI) {
            throw new Error('MONGO_URI not found in environment variables. Please check your .env file.');
        }

        await mongoose.connect(DB_URI);
        console.log('Database connected successfully.');

        // Clear existing data to prevent duplicates
        await Email.deleteMany({});
        console.log('Existing emails cleared.');

        // Insert new emails from the data file
        await Email.insertMany(data);
        console.log('Database seeded with initial emails.');

    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
};

seedDB();
