import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesWithStylists // <-- import the new function
} from '../controllers/serviceController.js';

import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/with-stylists', getServicesWithStylists);

router.get('/:id', getServiceById);
router.post('/', authenticateToken, isAdmin, createService);
router.put('/:id', authenticateToken, isAdmin, updateService);
router.delete('/:id', authenticateToken, isAdmin, deleteService);

export default router;
