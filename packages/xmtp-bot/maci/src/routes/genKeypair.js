import express from 'express';
import { genKeypair } from '../controllers/genKeypair';

const router = express.Router();

router.get('/genKeypair', genKeypair);

export default router;
