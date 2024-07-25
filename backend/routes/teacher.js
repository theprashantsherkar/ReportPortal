import express from "express";
import { getAssessmentsForTeacher, getClass, getStudents } from "../controllers/teacher.js";


const router = express.Router()

router.post('/class', getClass);
router.post('/getassessment', getAssessmentsForTeacher);
router.get('/getstudents', getStudents);

export default router;