import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: any) {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    if (response.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/logout');
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data.user;
  }

  async updateProfile(data: any) {
    const response = await this.client.put('/auth/me', data);
    return response.data;
  }

  // Loan endpoints
  async createLoan(data: any) {
    const response = await this.client.post('/loans', data);
    return response.data;
  }

  async getLoans(filters?: any) {
    const response = await this.client.get('/loans', { params: filters });
    return response.data;
  }

  async getLoan(id: string) {
    const response = await this.client.get(`/loans/${id}`);
    return response.data.loan;
  }

  async updateLoan(id: string, data: any) {
    const response = await this.client.put(`/loans/${id}`, data);
    return response.data;
  }

  async updateLoanStatus(id: string, status: string) {
    const response = await this.client.patch(`/loans/${id}/status`, { status });
    return response.data;
  }

  async calculateESGScore(id: string) {
    const response = await this.client.post(`/loans/${id}/esg-score`);
    return response.data;
  }

  async assessRisk(id: string, creditScore: number) {
    const response = await this.client.post(`/loans/${id}/risk-assessment`, { credit_score: creditScore });
    return response.data;
  }

  async deleteLoan(id: string) {
    const response = await this.client.delete(`/loans/${id}`);
    return response.data;
  }

  async getLoanStatistics() {
    const response = await this.client.get('/loans/statistics');
    return response.data.statistics;
  }

  // User endpoints
  async getUsers(filters?: any) {
    const response = await this.client.get('/users', { params: filters });
    return response.data;
  }

  async getUser(id: string) {
    const response = await this.client.get(`/users/${id}`);
    return response.data.user;
  }
}

export const api = new ApiClient();
export default api;
