import express from 'express'
import { getAssessments } from '../controllers/assessment.js';

const router = express.Router()


router.get('/url', getAssessments);


export default router;