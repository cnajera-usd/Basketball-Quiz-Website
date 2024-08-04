const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_text: { type: String, required: true },  // Makes the question text required
    option_a: { type: String, required: true },
    option_b: { type: String, required: true },
    option_c: { type: String, required: true },
    option_d: { type: String, required: true },
    option_e: { type: String, required: false },
    correct_answer: { type: String, required: true },
    difficulty: { type: String, required: true },
    Date: { type: Date, required: true }

});

// Export Question model
module.exports = mongoose.model('Question', questionSchema);