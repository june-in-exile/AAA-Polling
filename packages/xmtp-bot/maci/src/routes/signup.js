import express from 'express';
import { signup } from '../controllers/signup';

const router = express.Router();

router.get('/signup', signup);

export default router;
