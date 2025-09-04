import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { myConversations, startDM } from '../controllers/conversation.controller.js';
const router = Router();

router.get('/', authRequired, myConversations);
router.post('/dm', authRequired, startDM);

export default router;
