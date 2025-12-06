
import express from 'express';
import getSalesRecords from '../controllers/salesController.js';

const router = express.Router();

router.get('/', getSalesRecords);

export default router;