import express from 'express';
import { getSalaries, distributeSalary } from '../controllers/salaryController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all salaries (accessible by admin, accountant, and employees)
router.get('/', authMiddleware, getSalaries);

// Distribute salary (accessible by admin and accountant only)
router.post('/distribute', authMiddleware, distributeSalary);

export default router; 