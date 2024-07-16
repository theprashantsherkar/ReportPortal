import express from "express";
import { getAssessmentsForTeacher, getClass, getSubjects } from "../controllers/teacher.js";


const router = express.Router()

router.post('/class', getClass);
router.post('/getassessment', getAssessmentsForTeacher);
router.get('/subjects', getSubjects);


export default router;