import express from 'express'
import { getAssessments, newAss } from '../controllers/assessment.js';

const router = express.Router()


router.get('/getAll', getAssessments);
router.post('/new', newAss);


export default router;