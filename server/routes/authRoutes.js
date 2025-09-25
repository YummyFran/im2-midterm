const express = require('express');
const router = express.Router();

const { login, signup, getAuthUser, logout, searchUserByEmail, resetPassword, saveUser, getUserByEmailController } = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

router.post("/signup", signup)
router.post("/login", login)

router.get('/me', authenticate, getAuthUser)
router.post('/logout', authenticate, logout)
router.post('/search', searchUserByEmail)
router.post('/save-user', saveUser)
router.post('/reset-password', resetPassword)
router.post('/get-user-by-email', getUserByEmailController)

module.exports = router;
