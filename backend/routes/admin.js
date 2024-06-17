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


const router = express.Router()

router.get('/', landing)
router.post('/login', loginFunc)  //tested
router.post('/register', signinFunc)  //tested
router.put('/changepass', isAuthenticated, changePass);//tested
router.get('/profile', isAuthenticated, profile); //tested
router.get('/dashboard', isAuthenticated, dashboardAPI);
router.get('/logout', logout);   //tested


export default router;