import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getNotifications } from '../controllers/notification.controller';

const router = Router();

router.get("/", authenticate, getNotifications);

export default router;