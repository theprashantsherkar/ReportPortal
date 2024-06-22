import express from 'express';
import {
    changePass,
    dashboardAPI,
    landing,
    loginFunc,
    logout,
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
router.post('/upload', upload.single('file'), dashboardAPI);//checking
router.get('/logout', logout);   //tested


export default router;