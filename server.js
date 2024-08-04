// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questions'); // Correct the path here
const userRoutes = require('./routes/users'); // Ensure this is correct as well

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quizdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected... '))
    .catch(err => console.error('MongoDB connection error;', err));

app.use('/api/questions', questionRoutes); // This should match the corrected path
app.use('/api/users', userRoutes); // Ensure users routes are also imported correctly

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
