const express = require('express');
const router = express.Router();

const { login, signup, getAuthUser, logout } = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

router.post("/signup", signup)
router.post("/login", login)

router.get('/me', authenticate, getAuthUser)
router.post('/logout', authenticate, logout)

module.exports = router;
