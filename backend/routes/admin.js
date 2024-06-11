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
router.post('/login', loginFunc)
router.post('/register', signinFunc)
router.post('/changePass', isAuthenticated, changePass)
router.get('/profile', isAuthenticated, profile)
router.get('/dashboard', isAuthenticated, dashboardAPI)
router.get('/logout', logout)


export default router;