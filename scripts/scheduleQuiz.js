const mongoose = require('mongoose');
const Question = require('../models/Questions');
const cron = require('node-cron');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Schedule the job to run every day at midnight PST
cron.schedule('0 0 * * *', async () => {
    try {
        const today = new Date();

        // Set today's date at midnight PST
        const midnightPST = new Date(today.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        midnightPST.setHours(0, 0, 0, 0);

        // Get the next set of questions and set their date to today
        const questions = await Question.find({ date: { $gt: midnightPST } }).limit(1);

        if (questions.length > 0) {
            const question = questions[0];
            question.date = midnightPST;
            await question.save();
            console.log('Question scheduled for today:', question);
        } else {
            console.log('No questions left to schedule.');
        }
    } catch (error) {
        console.error('Error scheduling questions:', error);
    }
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
});