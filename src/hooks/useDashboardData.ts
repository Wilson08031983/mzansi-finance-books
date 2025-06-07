
import { useState, useEffect } from 'react';

// Mock data types - in a real app these would come from your API/database
interface MockInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

interface MockExpense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  status: 'pending' | 'approved';
}

interface MockClient {
  id: string;
  name: string;
  createdAt: string;
}

interface MockQuotation {
  id: string;
  clientName: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  amount: number;
  date: string;
}

// Mock data for demonstration with South African businesses
const mockInvoices: MockInvoice[] = [
  { id: '1', invoiceNumber: 'INV-2025-001', clientName: 'Vodacom Group Ltd', total: 35750, status: 'paid', dueDate: '2025-05-15', createdAt: '2025-05-01' },
  { id: '2', invoiceNumber: 'INV-2025-002', clientName: 'MTN South Africa', total: 28900, status: 'paid', dueDate: '2025-05-18', createdAt: '2025-05-03' },
  { id: '3', invoiceNumber: 'INV-2025-003', clientName: 'Shoprite Holdings', total: 15250, status: 'sent', dueDate: '2025-06-15', createdAt: '2025-05-25' },
  { id: '4', invoiceNumber: 'INV-2025-004', clientName: 'Discovery Limited', total: 22500, status: 'sent', dueDate: '2025-06-20', createdAt: '2025-05-28' },
  { id: '5', invoiceNumber: 'INV-2025-005', clientName: 'Standard Bank Group', total: 19800, status: 'draft', dueDate: '2025-06-30', createdAt: '2025-06-01' },
  { id: '6', invoiceNumber: 'INV-2025-006', clientName: 'Woolworths SA', total: 8750, status: 'overdue', dueDate: '2025-05-25', createdAt: '2025-05-10' },
];

const mockExpenses: MockExpense[] = [
  { id: '1', description: 'Office Rent - Cape Town', amount: 15000, category: 'Office', date: '2025-05-01', status: 'approved' },
  { id: '2', description: 'Staff Internet Allowances', amount: 8500, category: 'Connectivity', date: '2025-05-15', status: 'approved' },
  { id: '3', description: 'Travel - Johannesburg Trip', amount: 7200, category: 'Travel', date: '2025-05-18', status: 'approved' },
  { id: '4', description: 'Software Subscriptions', amount: 4500, category: 'Software', date: '2025-05-20', status: 'approved' },
  { id: '5', description: 'Quarterly VAT Payment', amount: 28750, category: 'Tax', date: '2025-06-01', status: 'pending' },
  { id: '6', description: 'Office Supplies', amount: 3200, category: 'Office', date: '2025-06-03', status: 'pending' },
];

const mockClients: MockClient[] = [
  { id: '1', name: 'Vodacom Group Ltd', createdAt: '2025-01-15' },
  { id: '2', name: 'MTN South Africa', createdAt: '2025-02-03' },
  { id: '3', name: 'Shoprite Holdings', createdAt: '2025-03-12' },
  { id: '4', name: 'Discovery Limited', createdAt: '2025-03-28' },
  { id: '5', name: 'Standard Bank Group', createdAt: '2025-04-17' },
  { id: '6', name: 'Woolworths SA', createdAt: '2025-05-05' },
  { id: '7', name: 'Sasol Limited', createdAt: '2025-05-22' },
];

const mockQuotations: MockQuotation[] = [
  { id: '1', clientName: 'Sasol Limited', createdAt: '2025-05-28', status: 'accepted', amount: 45000, date: '2025-05-28' },
  { id: '2', clientName: 'Sanlam Ltd', createdAt: '2025-06-01', status: 'pending', amount: 28500, date: '2025-06-01' },
  { id: '3', clientName: 'FirstRand Bank', createdAt: '2025-06-03', status: 'accepted', amount: 32750, date: '2025-06-03' },
  { id: '4', clientName: 'Nedbank Group', createdAt: '2025-06-04', status: 'rejected', amount: 18900, date: '2025-06-04' },
];

// Statistics interface
interface DashboardStatistics {
  totalRevenue: number;
  revenueIncrease: number;
  totalClients: number;
  clientIncrease: number;
  totalQuotations: number;
  quotationsDecrease: number;
  activeProjects: number;
  projectsIncrease: number;
}

// Recent transactions interface
interface Transaction {
  reference: string;
  client: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// Mock dashboard statistics
const mockStatistics: DashboardStatistics = {
  totalRevenue: 625800,
  revenueIncrease: 12.5,
  totalClients: 125,
  clientIncrease: 8.3,
  totalQuotations: 38,
  quotationsDecrease: 2.5,
  activeProjects: 15,
  projectsIncrease: 25.0
};

// Mock recent transactions
const mockRecentTransactions: Transaction[] = [
  { reference: 'INV-2025-006', client: 'Woolworths SA', date: '5 Jun 2025', amount: 'R 8,750.00', status: 'Completed' },
  { reference: 'INV-2025-005', client: 'Standard Bank Group', date: '1 Jun 2025', amount: 'R 19,800.00', status: 'Pending' },
  { reference: 'EXP-2025-006', client: 'Office Supplies', date: '3 Jun 2025', amount: '-R 3,200.00', status: 'Completed' },
  { reference: 'EXP-2025-005', client: 'Quarterly VAT', date: '1 Jun 2025', amount: '-R 28,750.00', status: 'Pending' },
  { reference: 'INV-2025-004', client: 'Discovery Limited', date: '28 May 2025', amount: 'R 22,500.00', status: 'Pending' },
];

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    invoices: mockInvoices,
    expenses: mockExpenses,
    clients: mockClients,
    quotations: mockQuotations,
    statistics: mockStatistics,
    recentTransactions: mockRecentTransactions,
    loading
  };
};
