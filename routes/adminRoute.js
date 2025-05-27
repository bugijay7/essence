// routes/adminRoutes.js
import express from 'express';
import { getAdminSummary } from '../controllers/adminController.js';

const router = express.Router();

router.get('/summary', getAdminSummary);

export default router;
