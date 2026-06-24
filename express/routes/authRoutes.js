const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get Profile (protected route)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
