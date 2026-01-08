import { Router, Response } from 'express';
import userService from '../services/user.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// Get all users (admin only)
router.get('/', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const filters: any = {};
    if (req.query.role) filters.role = req.query.role;
    if (req.query.status) filters.status = req.query.status;

    const users = await userService.getAllUsers(filters);

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
