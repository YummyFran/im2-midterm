const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const { createUser, getUserByEmail, getUserById, saveToken, generateResetLink, sendEmail, validateToken, updatePassword } = require('../models/userModel')
require('dotenv').config()

const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await getUserByEmail(email)
        if (existingUser) return res.status(400).json({ 
            success: false,
            emailError: 'Email already in use' 
        })

        const uuid = uuidv4()
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await createUser(uuid, name, email, hashedPassword)
        const token = jwt.sign({ id: newUser.uid }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        res.status(201).json({ 
            success: true,
            message: 'User created', 
            user: newUser 
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error: " + err.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await getUserByEmail(email);
        if (!user) return res.status(400).json({ 
            success: false,
            emailError: 'Email not found' 
        })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ 
            success: false,
            passwordError: 'Incorrect password' 
        })

        const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ 
            success: true,
            message: 'Login successful' ,
            user
        })
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Something went wrong' 
        })
    }
}

const getAuthUser = async (req, res) => {
    try {
        const user = await getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const { password, ...safeUser } = user;

        res.json({ success: true, user: safeUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

const logout = async (req, res) => {
    try {
        console.log('logging out')
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.json({
            success: true, 
            message: "Logged out"
        })
    } catch(err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        })
    }
}

const searchUserByEmail = async (req, res) => {
    try {
        const { email } = req.body

        const user = await getUserByEmail(email)

        if(!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        const token = uuidv4()
        const hashedToken = await bcrypt.hash(token, 10)

        console.log('saving token')
        await saveToken({ token: hashedToken, expires: Date.now() + 3600000, uid: user.uid })
        console.log('generating link')
        const resetLink = await generateResetLink({ token, uid: user.uid })
        await sendEmail({ email, resetLink })

        res.json({
            success: true,
            user
        })
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { uid, token, newPassword } = req.body

        const isValid = await validateToken(uid, token)

        if(!isValid) {
            return res.status(403).json({
                success: false,
                error: "Something is wrong. Token migght be expired or invalid."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await updatePassword({ uid, hashedPassword })

        res.json({
            success: true,
            message: "Password was succesfully updated"
        })
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        })
    }
}

const saveUser = async (req, res) => {
    const { name, email } = req.body
    try {
        const uuid = uuidv4()
        const newUser = await createUser(uuid, name, email)
        const token = jwt.sign({ id: newUser.uid }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        res.status(201).json({ 
            success: true,
            message: 'User created', 
            user: newUser 
        })
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        })
    }
}

const getUserByEmailController = async (req, res) => {
    const { email } = req.body
    try {
        const user = await getUserByEmail(email)

        if(!user) {
            return res.json({ success: false, message: "No User Found" })
        }
        res.json({ success: true, user })
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        })
    }
}

module.exports = {
    login,
    signup,
    getAuthUser,
    logout,
    searchUserByEmail,
    resetPassword,
    saveUser,
    getUserByEmailController
}