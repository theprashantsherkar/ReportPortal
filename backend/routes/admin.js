import express from 'express';
import { landing, loginFunc, logout, signinFunc } from '../controllers/admin.js';

const router = express.Router()

router.get('/', landing)
router.post('/login', loginFunc)
router.post('/register', signinFunc)
router.get('/logout', logout)

export default router; 