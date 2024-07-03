import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addSubs, createExam, prevExams, removeExam, updateExam } from "../controllers/exam.js";

const router = express.Router()


//exam routes
router.get('/allExams', isAuthenticated, prevExams);//tested
router.post('/createExam', isAuthenticated, createExam); // tested
router.route('/:id')
    .post(addSubs)
    .put(updateExam)
    .delete(isAuthenticated, removeExam);


export default router;