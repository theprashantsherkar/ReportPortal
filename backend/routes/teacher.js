import express from "express";
import { getAssessmentsForTeacher, getClass, getSubjects } from "../controllers/teacher.js";


const router = express.Router()

router.get('/class', getClass);
router.get('/assessment', getAssessmentsForTeacher);
router.get('/subjects', getSubjects);


export default router;