import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { me, searchUsers } from '../controllers/user.controller.js';
const router = Router();

router.get('/me', authRequired, me);
router.get('/search', authRequired, searchUsers);

export default router;
