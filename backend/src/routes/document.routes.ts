import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// Get all documents
router.get('/', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Document routes - to be implemented' });
});

// Get documents by loan ID
router.get('/loan/:loanId', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Get documents by loan ID' });
});

// Generate document
router.post('/generate', async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Generate document' });
});

export default router;
