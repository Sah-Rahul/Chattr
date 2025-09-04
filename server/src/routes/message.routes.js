import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
const router = Router();

router.get('/:conversationId', authRequired, getMessages);
router.post('/:conversationId', authRequired, sendMessage);

export default router;
