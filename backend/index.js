import express from "express";
import adminRouter from './routes/admin.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from 'multer';

export const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
dotenv.config({
    path: './data/config.env'
})
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())



app.use('/admin', adminRouter)



