import { v4 as uuidv4 } from 'uuid';
import { query, getClient } from '../config/database';
import { cacheSet, cacheGet, cacheDel } from '../config/redis';

export interface Loan {
  id: string;
  loan_number: string;
  borrower_id: string;
  lender_id?: string;
  arranger_id?: string;
  loan_type: string;
  amount: number;
  currency: string;
  interest_rate: number;
  term_months: number;
  purpose: string;
  status: string;
  origination_date?: Date;
  maturity_date?: Date;
  payment_frequency?: string;
  collateral_description?: string;
  credit_score?: number;
  risk_rating?: string;
  esg_score?: number;
  industry?: string;
  geography?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLoanDTO {
  borrower_id: string;
  loan_type: string;
  amount: number;
  currency?: string;
  interest_rate: number;
  term_months: number;
  purpose: string;
  payment_frequency?: string;
  collateral_description?: string;
  industry?: string;
  geography?: string;
}

export class LoanService {
  private generateLoanNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `LN-${timestamp}-${random}`;
  }

  async createLoan(data: CreateLoanDTO, userId: string): Promise<Loan> {
    const loanNumber = this.generateLoanNumber();

    const result = await query(
      `INSERT INTO loans (
        loan_number, borrower_id, loan_type, amount, currency, interest_rate,
        term_months, purpose, payment_frequency, collateral_description, 
        industry, geography, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        loanNumber,
        data.borrower_id,
        data.loan_type,
        data.amount,
        data.currency || 'USD',
        data.interest_rate,
        data.term_months,
        data.purpose,
        data.payment_frequency || 'monthly',
        data.collateral_description,
        data.industry,
        data.geography,
        'draft'
      ]
    );

    const loan = result.rows[0];

    // Cache the loan
    await cacheSet(`loan:${loan.id}`, JSON.stringify(loan), 3600);

    return loan;
  }

  async getLoanById(loanId: string): Promise<Loan | null> {
    // Try cache first
    const cached = await cacheGet(`loan:${loanId}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await query('SELECT * FROM loans WHERE id = $1', [loanId]);

    if (result.rows.length === 0) {
      return null;
    }

    const loan = result.rows[0];

    // Cache for 1 hour
    await cacheSet(`loan:${loanId}`, JSON.stringify(loan), 3600);

    return loan;
  }

  async updateLoan(loanId: string, data: Partial<CreateLoanDTO>): Promise<Loan> {
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    const allowedFields = [
      'amount', 'interest_rate', 'term_months', 'purpose', 
      'payment_frequency', 'collateral_description', 'industry', 'geography'
    ];

    for (const [key, value] of Object.entries(data)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = $${paramCount++}`);
        values.push(value);
      }
    }

    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }

    values.push(loanId);

    const result = await query(
      `UPDATE loans SET ${updateFields.join(', ')}
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );

    // Invalidate cache
    await cacheDel(`loan:${loanId}`);

    return result.rows[0];
  }

  async updateLoanStatus(loanId: string, status: string, userId: string): Promise<Loan> {
    const validStatuses = ['draft', 'pending_approval', 'approved', 'rejected', 'active', 'defaulted', 'paid_off'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid loan status');
    }

    const result = await query(
      'UPDATE loans SET status = $1 WHERE id = $2 RETURNING *',
      [status, loanId]
    );

    if (result.rows.length === 0) {
      throw new Error('Loan not found');
    }

    // Invalidate cache
    await cacheDel(`loan:${loanId}`);

    return result.rows[0];
  }

  async getAllLoans(filters?: {
    status?: string;
    borrower_id?: string;
    lender_id?: string;
    loan_type?: string;
    industry?: string;
    min_amount?: number;
    max_amount?: number;
  }): Promise<Loan[]> {
    let queryText = 'SELECT * FROM loans WHERE 1=1';
    const values: any[] = [];
    let paramCount = 1;

    if (filters?.status) {
      queryText += ` AND status = $${paramCount++}`;
      values.push(filters.status);
    }
    if (filters?.borrower_id) {
      queryText += ` AND borrower_id = $${paramCount++}`;
      values.push(filters.borrower_id);
    }
    if (filters?.lender_id) {
      queryText += ` AND lender_id = $${paramCount++}`;
      values.push(filters.lender_id);
    }
    if (filters?.loan_type) {
      queryText += ` AND loan_type = $${paramCount++}`;
      values.push(filters.loan_type);
    }
    if (filters?.industry) {
      queryText += ` AND industry = $${paramCount++}`;
      values.push(filters.industry);
    }
    if (filters?.min_amount) {
      queryText += ` AND amount >= $${paramCount++}`;
      values.push(filters.min_amount);
    }
    if (filters?.max_amount) {
      queryText += ` AND amount <= $${paramCount++}`;
      values.push(filters.max_amount);
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, values);
    return result.rows;
  }

  async calculateESGScore(loanId: string): Promise<number> {
    const loan = await this.getLoanById(loanId);
    if (!loan) {
      throw new Error('Loan not found');
    }

    // Simple ESG scoring algorithm
    let score = 5.0; // Base score

    // Industry scoring
    const greenIndustries = ['renewable_energy', 'clean_tech', 'sustainable_agriculture'];
    const neutralIndustries = ['healthcare', 'education', 'technology'];
    const highImpactIndustries = ['oil_gas', 'mining', 'heavy_manufacturing'];

    if (loan.industry && greenIndustries.includes(loan.industry)) {
      score += 3.0;
    } else if (loan.industry && highImpactIndustries.includes(loan.industry)) {
      score -= 2.0;
    }

    // Amount consideration (smaller loans to SMEs get bonus)
    if (loan.amount < 1000000) {
      score += 1.0;
    }

    // Ensure score is between 0 and 10
    score = Math.max(0, Math.min(10, score));

    // Update the loan with ESG score
    await query('UPDATE loans SET esg_score = $1 WHERE id = $2', [score, loanId]);

    // Invalidate cache
    await cacheDel(`loan:${loanId}`);

    return score;
  }

  async assessRisk(loanId: string, creditScore: number): Promise<string> {
    const loan = await this.getLoanById(loanId);
    if (!loan) {
      throw new Error('Loan not found');
    }

    let rating: string;

    // Simple risk rating algorithm
    if (creditScore >= 800) rating = 'AAA';
    else if (creditScore >= 750) rating = 'AA';
    else if (creditScore >= 700) rating = 'A';
    else if (creditScore >= 650) rating = 'BBB';
    else if (creditScore >= 600) rating = 'BB';
    else if (creditScore >= 550) rating = 'B';
    else if (creditScore >= 500) rating = 'CCC';
    else if (creditScore >= 450) rating = 'CC';
    else if (creditScore >= 400) rating = 'C';
    else rating = 'D';

    // Adjust based on loan amount
    const loanToIncomeThreshold = 5; // Simplified
    if (loan.amount > 5000000 && ['B', 'CCC', 'CC', 'C'].includes(rating)) {
      // Downgrade high-amount risky loans
      const downgrades: { [key: string]: string } = {
        'B': 'CCC',
        'CCC': 'CC',
        'CC': 'C',
        'C': 'D'
      };
      rating = downgrades[rating] || rating;
    }

    // Update the loan with risk rating and credit score
    await query(
      'UPDATE loans SET risk_rating = $1, credit_score = $2 WHERE id = $3',
      [rating, creditScore, loanId]
    );

    // Invalidate cache
    await cacheDel(`loan:${loanId}`);

    return rating;
  }

  async deleteLoan(loanId: string): Promise<void> {
    await query('DELETE FROM loans WHERE id = $1', [loanId]);
    await cacheDel(`loan:${loanId}`);
  }

  async getLoanStatistics(): Promise<any> {
    const result = await query(`
      SELECT 
        COUNT(*) as total_loans,
        SUM(amount) as total_amount,
        AVG(interest_rate) as avg_interest_rate,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_loans,
        COUNT(CASE WHEN status = 'defaulted' THEN 1 END) as defaulted_loans
      FROM loans
    `);

    return result.rows[0];
  }
}

export default new LoanService();
