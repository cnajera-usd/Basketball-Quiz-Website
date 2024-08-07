// Import required modules
const express = require('express');
const router = express.Router();
const Question = require('../models/Questions'); // Import the Question model

// Function to get today's quiz questions
// Function to get today's quiz questions
const getDailyQuiz = async (req, res) => {
    try {
        // Get the current date and set the time to midnight UTC
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        // Calculate the next day for the range upper bound
        const tomorrow = new Date(today);
        tomorrow.setUTCDate(today.getUTCDate() + 1);

        // Find questions that have a date within today's date (UTC)
        const questions = await Question.find({
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        res.json(questions); // Send the questions as a response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Send error message if there's an issue
    }
};


// Route for fetching the daily quiz
router.get('/daily', getDailyQuiz);

// Endpoint to get all questions
router.get('/', async (req, res) => {
    try {
        // Fetch all questions from the database
        const questions = await Question.find();
        res.json(questions); // Send questions as a JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching questions', error: err }); // Send error message if fetch fails
    }
});

// Endpoint to add a new question
router.post('/', async (req, res) => {
    // Destructure question details from request body
    const { question_text, option_a, option_b, option_c, option_d, option_e, correct_answer, difficulty } = req.body;

    // Create a new Question instance
    const newQuestion = new Question({ 
        question_text, 
        option_a, 
        option_b, 
        option_c, 
        option_d,
        option_e, 
        correct_answer, 
        difficulty 
    });

    try {
        // Save the new question to the database
        const question = await newQuestion.save();
        res.status(201).json(question); // Send the newly created question as a response
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send error message if saving fails
    }
});

// Endpoint to delete a question by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the question by ID
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' }); // Send 404 if question not found
        }
        // Delete the question from the database
        await question.deleteOne({ _id: req.params.id });
        res.json({ message: 'Question deleted successfully' }); // Send success message
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send error message if delete fails
    }
});

module.exports = router; // Export the router for use in server.js
