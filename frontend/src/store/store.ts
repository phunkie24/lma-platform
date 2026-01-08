import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface Loan {
  id: string;
  loan_number: string;
  borrower_id: string;
  amount: number;
  interest_rate: number;
  status: string;
  [key: string]: any;
}

interface LoanState {
  loans: Loan[];
  selectedLoan: Loan | null;
  setLoans: (loans: Loan[]) => void;
  setSelectedLoan: (loan: Loan | null) => void;
  addLoan: (loan: Loan) => void;
  updateLoan: (id: string, loan: Partial<Loan>) => void;
  deleteLoan: (id: string) => void;
}

export const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  selectedLoan: null,
  setLoans: (loans) => set({ loans }),
  setSelectedLoan: (loan) => set({ selectedLoan: loan }),
  addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
  updateLoan: (id, updatedLoan) =>
    set((state) => ({
      loans: state.loans.map((loan) =>
        loan.id === id ? { ...loan, ...updatedLoan } : loan
      ),
    })),
  deleteLoan: (id) =>
    set((state) => ({
      loans: state.loans.filter((loan) => loan.id !== id),
    })),
}));
