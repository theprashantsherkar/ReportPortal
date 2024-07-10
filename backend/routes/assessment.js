import express from 'express'
import {
    DeleteExam,
    UpdateAss,
    addRubrics,
    getAssessments,
    getExamsAss,
    newAss
} from '../controllers/assessment.js';

const router = express.Router()


router.get('/all', getAssessments);
router.route('/:id')
    .post(newAss)
    .get(getExamsAss)
    .delete(DeleteExam)
    .put(UpdateAss)
    
router.put('/rubrics/:id', addRubrics);


export default router;