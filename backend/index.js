import express from "express";
import adminRouter from './routes/admin.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import  dbConnection  from "./data/database.js";

export const app = express();
app.use(cors())
dotenv.config({
    path: './data/config.env'
})
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/admin', adminRouter)

export const DbConnected = () => {
    dbConnection.query('SELECT 1').then(() => {
        console.log('Database connected!')
    }).catch((error) => {
        console.log(error);
    })

}

