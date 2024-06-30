import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createExam, prevExams, removeExam } from "../controllers/exam.js";

const router = express.Router()


//exam routes
router.get('/allExams', isAuthenticated, prevExams);
router.post('/createExam', isAuthenticated, createExam); // tested
router.route('/:id')
    .delete(isAuthenticated, removeExam);


export default router;