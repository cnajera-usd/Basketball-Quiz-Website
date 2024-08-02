const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        let user = await User.fndOne ({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User ({ 
            username, 
            email, 
            password 
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save(); // save user to database

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresin: '1h' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;