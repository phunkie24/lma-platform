import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database';
import { generateToken, generateRefreshToken } from '../middleware/auth';
import { cacheSet, cacheGet, cacheDel } from '../config/redis';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  organization?: string;
  phone?: string;
  status: string;
  kyc_verified: boolean;
  created_at: Date;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  organization?: string;
  phone?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [data.email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      parseInt(process.env.BCRYPT_ROUNDS || '12')
    );

    const result = await query(
      `INSERT INTO users (
        email, password_hash, first_name, last_name, role, organization, phone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, first_name, last_name, role, organization, phone, status, kyc_verified, created_at`,
      [data.email, passwordHash, data.first_name, data.last_name, data.role, data.organization, data.phone]
    );

    return result.rows[0];
  }

  async login(data: LoginDTO): Promise<{ user: User; token: string; refreshToken: string }> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [data.email]
    );

    if (result.rows.length === 0) {
      throw new Error('Invalid credentials');
    }

    const user = result.rows[0];

    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password_hash);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ id: user.id });

    // Cache user data
    await cacheSet(`user:${user.id}`, JSON.stringify({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    }), 3600); // 1 hour

    delete user.password_hash;

    return {
      user,
      token,
      refreshToken,
    };
  }

  async getUserById(userId: string): Promise<User | null> {
    // Try cache first
    const cached = await cacheGet(`user:${userId}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await query(
      `SELECT id, email, first_name, last_name, role, organization, phone, 
              status, kyc_verified, created_at 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    // Cache for 1 hour
    await cacheSet(`user:${userId}`, JSON.stringify(user), 3600);

    return user;
  }

  async updateUser(userId: string, data: Partial<CreateUserDTO>): Promise<User> {
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.first_name) {
      updateFields.push(`first_name = $${paramCount++}`);
      values.push(data.first_name);
    }
    if (data.last_name) {
      updateFields.push(`last_name = $${paramCount++}`);
      values.push(data.last_name);
    }
    if (data.organization) {
      updateFields.push(`organization = $${paramCount++}`);
      values.push(data.organization);
    }
    if (data.phone) {
      updateFields.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }
    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, parseInt(process.env.BCRYPT_ROUNDS || '12'));
      updateFields.push(`password_hash = $${paramCount++}`);
      values.push(passwordHash);
    }

    values.push(userId);

    const result = await query(
      `UPDATE users SET ${updateFields.join(', ')}
       WHERE id = $${paramCount}
       RETURNING id, email, first_name, last_name, role, organization, phone, status, kyc_verified, created_at`,
      values
    );

    // Invalidate cache
    await cacheDel(`user:${userId}`);

    return result.rows[0];
  }

  async getAllUsers(filters?: { role?: string; status?: string }): Promise<User[]> {
    let queryText = `
      SELECT id, email, first_name, last_name, role, organization, phone, 
             status, kyc_verified, created_at 
      FROM users WHERE 1=1
    `;
    const values: any[] = [];
    let paramCount = 1;

    if (filters?.role) {
      queryText += ` AND role = $${paramCount++}`;
      values.push(filters.role);
    }
    if (filters?.status) {
      queryText += ` AND status = $${paramCount++}`;
      values.push(filters.status);
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, values);
    return result.rows;
  }

  async deleteUser(userId: string): Promise<void> {
    await query('UPDATE users SET status = $1 WHERE id = $2', ['inactive', userId]);
    await cacheDel(`user:${userId}`);
  }
}

export default new UserService();
