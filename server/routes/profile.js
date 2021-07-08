import express from 'express';

import { getPostByUser } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/:id', getPostByUser);

export default router;