import express from 'express';
import {
  getClientAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getStylistAppointments
} from '../controllers/appointmentController.js';

import { authenticateToken, isSelfOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/client', authenticateToken, getClientAppointments);

router.get('/:id', authenticateToken, getAppointmentById);

router.post('/', authenticateToken, createAppointment);

router.put('/:id', authenticateToken, isSelfOrAdmin, updateAppointment);

router.delete('/:id', authenticateToken, isSelfOrAdmin, deleteAppointment);

router.get('/stylist/:userId', getStylistAppointments);

export default router;
