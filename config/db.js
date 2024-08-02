const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI,); 
        console.log('MongoDB connected...') // Log sucess message if connection is successfull
    } catch (err) {
        console.error(err.message);  // Log error message if connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
