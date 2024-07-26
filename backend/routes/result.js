import express from "express";
import { generateResult, sendGrades, sendMarks } from "../controllers/result.js";


const router = express.Router();

router.post('/sendMarks', sendMarks)
router.post('/sendGrades', sendGrades)
router.get('/report/:id', generateResult)





export default router;