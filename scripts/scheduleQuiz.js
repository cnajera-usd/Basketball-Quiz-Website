const mongoose = require('mongoose');
const Question = require('../models/Questions');

const scheduleQuiz = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/quizb');

        const questions = await Question.find();
        const today = new Date();

        // Assign dates to questions for the next few days
        questions.forEach(async (question, index) => {
            // Set date to today + index
            question.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
            await question.save();
        });

        console.log('Question scheduled successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error scheduling questions', error);
    }
};

scheduleQuiz();