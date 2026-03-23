import { Router } from 'express';
import { generateInvoice } from '../controllers/invoice.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:serviceId', authenticate, generateInvoice);

export default router;