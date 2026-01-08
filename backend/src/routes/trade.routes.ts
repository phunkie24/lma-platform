import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// Get all trades
router.get('/', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Trade routes - to be implemented' });
});

// Create trade listing
router.post('/', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Create trade listing' });
});

export default router;
