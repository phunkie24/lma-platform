import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// Get analytics dashboard
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Analytics dashboard' });
});

// Get portfolio analytics
router.get('/portfolio', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Portfolio analytics' });
});

export default router;
