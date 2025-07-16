import express from 'express';
import { getUserProfile, login, logout, registerUser } from '../controllers/authController.js';
import {isAuthenticated} from '../middlewares/auth.js'

// Create a router object to handle task-related routes separately
const router = express.Router();

//to register user
router.post('/register', registerUser);
//to login user
router.post('/login', login);
//to logout user
router.post('/logout', logout);
//to get user profile
router.get('/me', isAuthenticated, getUserProfile)

export default router;