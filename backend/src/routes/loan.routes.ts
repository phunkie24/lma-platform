import { Router, Response } from 'express';
import loanService from '../services/loan.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import Joi from 'joi';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation schema
const createLoanSchema = Joi.object({
  borrower_id: Joi.string().uuid().required(),
  loan_type: Joi.string().valid('term', 'revolver', 'bridge', 'syndicated').required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).optional(),
  interest_rate: Joi.number().min(0).max(1).required(),
  term_months: Joi.number().integer().positive().required(),
  purpose: Joi.string().min(10).required(),
  payment_frequency: Joi.string().valid('monthly', 'quarterly', 'semi-annual', 'annual').optional(),
  collateral_description: Joi.string().optional(),
  industry: Joi.string().max(100).optional(),
  geography: Joi.string().max(100).optional(),
});

// Create new loan
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { error, value } = createLoanSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const loan = await loanService.createLoan(value, req.user!.id);

    res.status(201).json({
      message: 'Loan created successfully',
      loan,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get all loans with filters
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const filters: any = {};

    if (req.query.status) filters.status = req.query.status;
    if (req.query.borrower_id) filters.borrower_id = req.query.borrower_id;
    if (req.query.lender_id) filters.lender_id = req.query.lender_id;
    if (req.query.loan_type) filters.loan_type = req.query.loan_type;
    if (req.query.industry) filters.industry = req.query.industry;
    if (req.query.min_amount) filters.min_amount = parseFloat(req.query.min_amount as string);
    if (req.query.max_amount) filters.max_amount = parseFloat(req.query.max_amount as string);

    const loans = await loanService.getAllLoans(filters);

    res.status(200).json({
      count: loans.length,
      loans,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get loan statistics
router.get('/statistics', async (req: AuthRequest, res: Response) => {
  try {
    const stats = await loanService.getLoanStatistics();
    res.status(200).json({ statistics: stats });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get loan by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);

    if (!loan) {
      res.status(404).json({ error: 'Loan not found' });
      return;
    }

    res.status(200).json({ loan });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update loan
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const updateSchema = Joi.object({
      amount: Joi.number().positive().optional(),
      interest_rate: Joi.number().min(0).max(1).optional(),
      term_months: Joi.number().integer().positive().optional(),
      purpose: Joi.string().min(10).optional(),
      payment_frequency: Joi.string().valid('monthly', 'quarterly', 'semi-annual', 'annual').optional(),
      collateral_description: Joi.string().optional(),
      industry: Joi.string().max(100).optional(),
      geography: Joi.string().max(100).optional(),
    });

    const { error, value } = updateSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const loan = await loanService.updateLoan(req.params.id, value);

    res.status(200).json({
      message: 'Loan updated successfully',
      loan,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update loan status
router.patch('/:id/status', authorize('lender', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const statusSchema = Joi.object({
      status: Joi.string().valid('draft', 'pending_approval', 'approved', 'rejected', 'active', 'defaulted', 'paid_off').required(),
    });

    const { error, value } = statusSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const loan = await loanService.updateLoanStatus(req.params.id, value.status, req.user!.id);

    res.status(200).json({
      message: 'Loan status updated successfully',
      loan,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Calculate ESG score
router.post('/:id/esg-score', async (req: AuthRequest, res: Response) => {
  try {
    const score = await loanService.calculateESGScore(req.params.id);

    res.status(200).json({
      message: 'ESG score calculated successfully',
      esg_score: score,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Assess risk
router.post('/:id/risk-assessment', async (req: AuthRequest, res: Response) => {
  try {
    const schema = Joi.object({
      credit_score: Joi.number().integer().min(300).max(850).required(),
    });

    const { error, value } = schema.validate(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const rating = await loanService.assessRisk(req.params.id, value.credit_score);

    res.status(200).json({
      message: 'Risk assessment completed',
      risk_rating: rating,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete loan
router.delete('/:id', authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    await loanService.deleteLoan(req.params.id);

    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
