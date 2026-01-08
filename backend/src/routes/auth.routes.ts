import { Router, Request, Response } from 'express';
import userService from '../services/user.service';
import { authenticate, AuthRequest } from '../middleware/auth';
import Joi from 'joi';

const router = Router();

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().min(2).max(100).required(),
  last_name: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid('borrower', 'lender', 'arranger', 'trader', 'admin', 'compliance').required(),
  organization: Joi.string().max(255).optional(),
  phone: Joi.string().max(50).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const user = await userService.createUser(value);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const result = await userService.login(value);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: result.user.id,
        email: result.user.email,
        first_name: result.user.first_name,
        last_name: result.user.last_name,
        role: result.user.role,
      },
      token: result.token,
      refreshToken: result.refreshToken,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const user = await userService.getUserById(req.user.id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update current user profile
router.put('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const updateSchema = Joi.object({
      first_name: Joi.string().min(2).max(100).optional(),
      last_name: Joi.string().min(2).max(100).optional(),
      organization: Joi.string().max(255).optional(),
      phone: Joi.string().max(50).optional(),
      password: Joi.string().min(8).optional(),
    });

    const { error, value } = updateSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const user = await userService.updateUser(req.user.id, value);

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Logout (invalidate token)
router.post('/logout', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    // In a production system, you would add the token to a blacklist
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
