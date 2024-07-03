import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
export const app = express();
import adminRouter from './routes/admin.js';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import assessmentRoutes from './routes/assessment.js'
import examRouter from './routes/exam.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
dotenv.config({
    path: './data/config.env'
})
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')))


app.use('/admin', adminRouter)
app.use('/exam', examRouter);
app.use('/assessments', assessmentRoutes)


