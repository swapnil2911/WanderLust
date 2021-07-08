import express from 'express';
import { getUserByID, updateUserByID } from '../controllers/account.js';
const router = express.Router();
router.get('/:id', getUserByID);
router.patch('/:id', updateUserByID);
export default router;