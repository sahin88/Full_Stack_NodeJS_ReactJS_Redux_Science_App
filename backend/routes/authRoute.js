import express from 'express';
import { loginPost, registerPost } from '../controller/authController.js'

const router = express.Router();

router.post('/loginPage', loginPost)
router.post('/registerPage', registerPost)




export default router;