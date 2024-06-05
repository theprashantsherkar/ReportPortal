import express from 'express';
import { landing, loginFunc, logout, signinFunc } from '../controllers/admin.js';

const router = express.Router()

router.get('/', landing)
router.get('/login', loginFunc)
router.get('/register', signinFunc)
router.get('/logout', logout)

export default router;