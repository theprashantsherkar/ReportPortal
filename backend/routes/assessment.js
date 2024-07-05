import express from 'express'
import { getAssessments, newAss } from '../controllers/assessment.js';

const router = express.Router()


router.get('/all', getAssessments);
router.post('/:id', newAss);


export default router;