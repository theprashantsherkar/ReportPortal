import express from "express";
import { sendGrades, sendMarks } from "../controllers/result.js";

const router = express.Router();

router.post('/sendMarks', sendMarks)
router.post('/sendGrades', sendGrades)
//todo:add the puppetter/ pdf api here




export default router;