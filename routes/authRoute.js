import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';    

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
// Route for user login 
router.post('/login', loginUser);
// Route for user logout
router.post('/logout', authenticateToken, logoutUser);

export default router;