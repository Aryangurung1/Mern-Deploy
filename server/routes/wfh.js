import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addWfh, getWfh, getWfhs, getWfhDetail, updateWfh } from '../controllers/wfhController.js';

const router = express.Router();

router.post('/add', authMiddleware, addWfh)
router.get('/detail/:id', authMiddleware, getWfhDetail)
router.get('/:id/:role', authMiddleware, getWfh)
router.get('/', authMiddleware, getWfhs)
router.put('/:id', authMiddleware, updateWfh)


export default router