import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getMe } from '../controllers/userController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authenticateToken, getMe); // Add this route to get the current logged-in user

router.get('/', authenticateToken, isAdmin, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, isAdmin, updateUser);
router.delete('/:id', authenticateToken, isAdmin, deleteUser);

export default router;
