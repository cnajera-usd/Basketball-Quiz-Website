require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/quesitons');

const app = express();
app.use(cors());

connectDB();


app.use(express.json());

mongoose.connect('mongoddb://localhost:27017/quizb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/questions', require('./routes/questions'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});