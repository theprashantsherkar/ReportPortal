import express from "express";
import { sendGrades, sendMarks } from "../controllers/result.js";
import { printReport } from "../controllers/teacher.js";

const router = express.Router();

router.post('/sendMarks', sendMarks)
router.post('/sendGrades', sendGrades)
router.get('/report/:id', printReport)





export default router;