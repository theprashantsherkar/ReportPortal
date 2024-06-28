import express from 'express';

import {
    changePass,
    createExam,
    dashboardAPI,
    getStudents,
    loginFunc,
    logout,
    prevExams,
    profile,
    signinFunc
} from '../controllers/admin.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';


const router = express.Router()


router.post('/login', loginFunc)  //tested
router.post('/register', signinFunc)  //tested
router.put('/changepass', isAuthenticated, changePass);//tested
router.get('/profile', isAuthenticated, profile); //tested
router.post('/upload', isAuthenticated, upload.single('file'), dashboardAPI);//tested
router.get('/fetchStudents', isAuthenticated, getStudents);
router.get('/allexams', isAuthenticated, prevExams);
router.post('/exam', isAuthenticated, createExam); // tested
router.get('/logout', logout);   //tested


export default router;