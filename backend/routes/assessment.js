import express from 'express'
import { DeleteExam, UpdateAss, getAssessments, getExamsAss, newAss } from '../controllers/assessment.js';

const router = express.Router()


router.get('/all', getAssessments);
router.route('/:id')
    .post(newAss)
    .get(getExamsAss)
    .delete(DeleteExam)
    .put(UpdateAss)



export default router;