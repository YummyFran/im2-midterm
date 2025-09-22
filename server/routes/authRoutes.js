const express = require('express');
const router = express.Router();

const { login, signup, getAuthUser, logout, searchUserByEmail, resetPassword } = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

router.post("/signup", signup)
router.post("/login", login)

router.get('/me', authenticate, getAuthUser)
router.post('/logout', authenticate, logout)
router.post('/search', authenticate, searchUserByEmail)
router.post('/reset-password', authenticate, resetPassword)

module.exports = router;
