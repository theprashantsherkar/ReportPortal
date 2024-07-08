import express from 'express'
import { DeleteExam, getAssessments, getExamsAss, newAss } from '../controllers/assessment.js';

const router = express.Router()


router.get('/all', getAssessments);
router.route('/:id')
    .post(newAss)
    .get(getExamsAss)
    .delete(DeleteExam)



export default router;