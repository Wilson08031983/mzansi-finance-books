
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Plus, 
  Search, 
  Download, 
  Calendar, 
  DollarSign, 
  FileText, 
  Users, 
  Briefcase, 
  Calculator, 
  AlertCircle, 
  Link as LinkIcon, 
  Trash2, 
  Edit3, 
  Filter, 
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface BankStatement {
  id: number;
  name: string;
  uploadDate: string;
  size: number;
  processed: boolean;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: string;
  category: string;
  reference?: string;
  projectId?: string;
  clientId?: string;
  linkedReceipt?: number;
  linkedInvoice?: number;
  createdDate: string;
}

interface Receipt {
  id: number;
  name: string;
  uploadDate: string;
  size: number;
  linked: boolean;
}

interface Invoice {
  id: number;
  name: string;
  uploadDate: string;
  size: number;
  linked: boolean;
}

interface PayrollEntry {
  id: number;
  employeeName: string;
  payPeriod: string;
  grossSalary: string;
  deductions: string;
  netSalary: number;
  createdDate: string;
}

interface Reminder {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  type: string;
  status: string;
  createdDate: string;
}

const Accounting: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('transactions');
  const [bankStatements, setBankStatements] = useState<BankStatement[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payrollEntries, setPayrollEntries] = useState<PayrollEntry[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddPayroll, setShowAddPayroll] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const receiptInputRef = useRef<HTMLInputElement>(null);
  const invoiceInputRef = useRef<HTMLInputElement>(null);

  // Transaction categories
  const transactionCategories = [
    'Income', 'Expense', 'Office Supplies', 'Communication', 'Business Trips', 
    'Fuel', 'Equipment Rental', 'Marketing', 'Insurance', 'Utilities', 
    'Professional Services', 'Materials', 'Subcontractors', 'Other'
  ];

  // Mock data for projects and clients (would come from other pages)
  const projects = [
    { id: 1, name: 'Website Redesign', code: 'WEB001' },
    { id: 2, name: 'Mobile App Development', code: 'MOB001' }
  ];

  const clients = [
    { id: 1, name: 'John Smith', company: 'Smith Industries' },
    { id: 2, name: 'Sarah Johnson', company: 'Johnson Corp' }
  ];

  const handleBankStatementUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newStatement: BankStatement = {
        id: Date.now(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: file.size,
        processed: false
      };
      setBankStatements([...bankStatements, newStatement]);
      toast({
        title: "Bank Statement Uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newReceipts: Receipt[] = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: file.size,
      linked: false
    }));
    setReceipts([...receipts, ...newReceipts]);
    toast({
      title: "Receipts Uploaded",
      description: `${files.length} receipt(s) uploaded successfully.`
    });
  };

  const handleInvoiceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newInvoices: Invoice[] = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: file.size,
      linked: false
    }));
    setInvoices([...invoices, ...newInvoices]);
    toast({
      title: "Invoices Uploaded",
      description: `${files.length} invoice(s) uploaded successfully.`
    });
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'createdDate'>) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...transactionData,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTransactions([...transactions, newTransaction]);
    setShowAddTransaction(false);
    toast({
      title: "Transaction Added",
      description: "New transaction has been added successfully."
    });
  };

  const addPayrollEntry = (payrollData: Omit<PayrollEntry, 'id' | 'createdDate' | 'netSalary'>) => {
    const newPayroll: PayrollEntry = {
      id: Date.now(),
      ...payrollData,
      netSalary: parseFloat(payrollData.grossSalary) - parseFloat(payrollData.deductions || '0'),
      createdDate: new Date().toISOString().split('T')[0]
    };
    setPayrollEntries([...payrollEntries, newPayroll]);
    setShowAddPayroll(false);
    toast({
      title: "Payroll Entry Added",
      description: "New payroll entry has been added successfully."
    });
  };

  const addReminder = (reminderData: Omit<Reminder, 'id' | 'createdDate' | 'status'>) => {
    const newReminder: Reminder = {
      id: Date.now(),
      ...reminderData,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setReminders([...reminders, newReminder]);
    setShowAddReminder(false);
    toast({
      title: "Reminder Added",
      description: "New reminder has been added successfully."
    });
  };

  const generateSarsReport = () => {
    const reportData = {
      transactions: transactions.filter(t => t.category === 'Income' || t.category === 'Expense'),
      payroll: payrollEntries,
      period: new Date().getFullYear(),
      totalIncome: transactions.filter(t => t.category === 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0),
      totalExpenses: transactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0),
      generatedDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('Generating SARS e-filing report PDF...', reportData);
    toast({
      title: "SARS Report Generated",
      description: "SARS e-filing report has been generated successfully."
    });
  };

  const generateAccountingReport = () => {
    const totalIncome = transactions.filter(t => t.category === 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);
    const totalExpenses = transactions.filter(t => t.category !== 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);
    const netProfit = totalIncome - totalExpenses;
    
    const reportData = {
      summary: {
        totalIncome,
        totalExpenses,
        netProfit,
        profitMargin: totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(2) : 0
      },
      transactions,
      payroll: payrollEntries,
      period: new Date().getFullYear(),
      generatedDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('Generating full accounting report PDF...', reportData);
    toast({
      title: "Accounting Report Generated",
      description: "Full accounting report has been generated successfully."
    });
  };

  const linkReceiptToTransaction = (transactionId: number, receiptId: number) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, linkedReceipt: receiptId } : t
    ));
    setReceipts(receipts.map(r => 
      r.id === receiptId ? { ...r, linked: true } : r
    ));
    toast({
      title: "Receipt Linked",
      description: "Receipt has been linked to transaction successfully."
    });
  };

  const linkInvoiceToTransaction = (transactionId: number, invoiceId: number) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, linkedInvoice: invoiceId } : t
    ));
    setInvoices(invoices.map(i => 
      i.id === invoiceId ? { ...i, linked: true } : i
    ));
    toast({
      title: "Invoice Linked",
      description: "Invoice has been linked to transaction successfully."
    });
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchesSearch = !searchTerm || 
      t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-mokm-blue-50 via-mokm-purple-50 to-mokm-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-white/50 rounded-lg transition-colors font-sf-pro"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 font-sf-pro flex items-center gap-3">
                <Calculator className="text-mokm-blue-500" />
                Accounting Management
              </h1>
              <p className="text-slate-600 font-sf-pro">Complete accounting solution with transaction tracking, reporting, and compliance</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={generateSarsReport}
              className="bg-gradient-to-r from-mokm-green-500 to-mokm-blue-500 hover:from-mokm-green-600 hover:to-mokm-blue-600 font-sf-pro"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate SARS Report
            </Button>
            <Button
              onClick={generateAccountingReport}
              className="bg-gradient-to-r from-mokm-purple-500 to-mokm-pink-500 hover:from-mokm-purple-600 hover:to-mokm-pink-600 font-sf-pro"
            >
              <Download className="h-4 w-4 mr-2" />
              Full Accounting Report
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'transactions', label: 'Transactions', icon: DollarSign },
            { id: 'bank-statements', label: 'Bank Statements', icon: FileText },
            { id: 'documents', label: 'Receipts & Invoices', icon: Upload },
            { id: 'payroll', label: 'Payroll', icon: Users },
            { id: 'reminders', label: 'Reminders', icon: AlertCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-sf-pro ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500 text-white shadow-colored'
                  : 'glass backdrop-blur-sm bg-white/50 border border-white/20 text-slate-700 hover:bg-white/70'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bank Statements Tab */}
        {activeTab === 'bank-statements' && (
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-sf-pro">Bank Statements</CardTitle>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Bank Statement
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.csv,.xlsx,.xls"
                  onChange={handleBankStatementUpload}
                  className="hidden"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankStatements.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                    <p>No bank statements uploaded yet</p>
                  </div>
                ) : (
                  bankStatements.map(statement => (
                    <div key={statement.id} className="glass backdrop-blur-sm bg-white/30 border border-white/20 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="text-mokm-blue-500" size={24} />
                        <div>
                          <p className="font-medium font-sf-pro">{statement.name}</p>
                          <p className="text-sm text-slate-600">Uploaded: {statement.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-sf-pro ${
                          statement.processed ? 'bg-mokm-green-100 text-mokm-green-800' : 'bg-mokm-yellow-100 text-mokm-yellow-800'
                        }`}>
                          {statement.processed ? 'Processed' : 'Pending'}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-sf-pro">Transaction Management</CardTitle>
                <Button
                  onClick={() => setShowAddTransaction(true)}
                  className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass backdrop-blur-sm bg-white/50 border border-white/20"
                    />
                  </div>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-blue-500 focus:border-transparent glass backdrop-blur-sm bg-white/50"
                >
                  <option value="all">All Categories</option>
                  {transactionCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <DollarSign size={48} className="mx-auto mb-4 text-slate-300" />
                    <p>No transactions found</p>
                  </div>
                ) : (
                  filteredTransactions.map(transaction => (
                    <div key={transaction.id} className="glass backdrop-blur-sm bg-white/30 border border-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            transaction.category === 'Income' ? 'bg-mokm-green-500' : 'bg-mokm-red-500'
                          }`}></div>
                          <div>
                            <p className="font-medium font-sf-pro">{transaction.description}</p>
                            <div className="text-sm text-slate-600 space-y-1">
                              <p>Category: {transaction.category}</p>
                              {transaction.projectId && (
                                <p>Project: {projects.find(p => p.id === parseInt(transaction.projectId!))?.name}</p>
                              )}
                              {transaction.clientId && (
                                <p>Client: {clients.find(c => c.id === parseInt(transaction.clientId!))?.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-semibold font-sf-pro ${
                            transaction.category === 'Income' ? 'text-mokm-green-600' : 'text-mokm-red-600'
                          }`}>
                            R{parseFloat(transaction.amount || '0').toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-600">{transaction.date}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {transaction.linkedReceipt && (
                              <span className="bg-mokm-green-100 text-mokm-green-800 px-2 py-1 rounded text-xs">Receipt</span>
                            )}
                            {transaction.linkedInvoice && (
                              <span className="bg-mokm-blue-100 text-mokm-blue-800 px-2 py-1 rounded text-xs">Invoice</span>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedTransaction(transaction)}
                            >
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Receipts */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-sf-pro">Receipts</CardTitle>
                  <Button
                    onClick={() => receiptInputRef.current?.click()}
                    size="sm"
                    className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input
                    ref={receiptInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleReceiptUpload}
                    className="hidden"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {receipts.map(receipt => (
                    <div key={receipt.id} className="flex items-center justify-between p-2 glass backdrop-blur-sm bg-white/30 border border-white/20 rounded">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-mokm-blue-600" />
                        <span className="text-sm font-sf-pro">{receipt.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-sf-pro ${
                        receipt.linked ? 'bg-mokm-green-100 text-mokm-green-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {receipt.linked ? 'Linked' : 'Unlinked'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-sf-pro">Invoices</CardTitle>
                  <Button
                    onClick={() => invoiceInputRef.current?.click()}
                    size="sm"
                    className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input
                    ref={invoiceInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleInvoiceUpload}
                    className="hidden"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {invoices.map(invoice => (
                    <div key={invoice.id} className="flex items-center justify-between p-2 glass backdrop-blur-sm bg-white/30 border border-white/20 rounded">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-mokm-green-600" />
                        <span className="text-sm font-sf-pro">{invoice.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-sf-pro ${
                        invoice.linked ? 'bg-mokm-green-100 text-mokm-green-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {invoice.linked ? 'Linked' : 'Unlinked'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === 'payroll' && (
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-sf-pro">Payroll Management</CardTitle>
                <Button
                  onClick={() => setShowAddPayroll(true)}
                  className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payroll Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payrollEntries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Users size={48} className="mx-auto mb-4 text-slate-300" />
                    <p>No payroll entries yet</p>
                  </div>
                ) : (
                  payrollEntries.map(entry => (
                    <div key={entry.id} className="glass backdrop-blur-sm bg-white/30 border border-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium font-sf-pro">{entry.employeeName}</p>
                          <p className="text-sm text-slate-600">Period: {entry.payPeriod}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-mokm-green-600 font-sf-pro">R{parseFloat(entry.grossSalary || '0').toFixed(2)}</p>
                          <p className="text-sm text-slate-600">Net: R{entry.netSalary.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-sf-pro">Banking Reminders</CardTitle>
                <Button
                  onClick={() => setShowAddReminder(true)}
                  className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reminder
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <AlertCircle size={48} className="mx-auto mb-4 text-slate-300" />
                    <p>No reminders set</p>
                  </div>
                ) : (
                  reminders.map(reminder => (
                    <div key={reminder.id} className="glass backdrop-blur-sm bg-white/30 border border-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="text-mokm-orange-500" size={20} />
                          <div>
                            <p className="font-medium font-sf-pro">{reminder.title}</p>
                            <p className="text-sm text-slate-600">{reminder.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-mokm-orange-600">Due: {reminder.dueDate}</p>
                          <span className={`px-2 py-1 rounded text-xs font-sf-pro ${
                            reminder.status === 'completed' ? 'bg-mokm-green-100 text-mokm-green-800' : 'bg-mokm-orange-100 text-mokm-orange-800'
                          }`}>
                            {reminder.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Transaction Modal */}
      <Dialog open={showAddTransaction} onOpenChange={setShowAddTransaction}>
        <DialogContent className="glass backdrop-blur-sm bg-white/95 border border-white/20">
          <DialogHeader>
            <DialogTitle className="font-sf-pro">Add New Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            addTransaction({
              date: formData.get('date') as string,
              description: formData.get('description') as string,
              amount: formData.get('amount') as string,
              category: formData.get('category') as string,
              reference: formData.get('reference') as string,
              projectId: formData.get('projectId') as string,
              clientId: formData.get('clientId') as string
            });
          }}>
            <div className="space-y-4">
              <Input
                name="date"
                type="date"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <Input
                name="description"
                placeholder="Description"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <Input
                name="amount"
                type="number"
                step="0.01"
                placeholder="Amount (R)"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <select
                name="category"
                required
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-blue-500 focus:border-transparent glass backdrop-blur-sm bg-white/50"
              >
                <option value="">Select Category</option>
                {transactionCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Input
                name="reference"
                placeholder="Reference Number"
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <select
                name="projectId"
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-blue-500 focus:border-transparent glass backdrop-blur-sm bg-white/50"
              >
                <option value="">Link to Project (Optional)</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
              <select
                name="clientId"
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-blue-500 focus:border-transparent glass backdrop-blur-sm bg-white/50"
              >
                <option value="">Link to Client (Optional)</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddTransaction(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600"
              >
                Add Transaction
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Payroll Modal */}
      <Dialog open={showAddPayroll} onOpenChange={setShowAddPayroll}>
        <DialogContent className="glass backdrop-blur-sm bg-white/95 border border-white/20">
          <DialogHeader>
            <DialogTitle className="font-sf-pro">Add Payroll Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            addPayrollEntry({
              employeeName: formData.get('employeeName') as string,
              payPeriod: formData.get('payPeriod') as string,
              grossSalary: formData.get('grossSalary') as string,
              deductions: formData.get('deductions') as string
            });
          }}>
            <div className="space-y-4">
              <Input
                name="employeeName"
                placeholder="Employee Name"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <Input
                name="payPeriod"
                placeholder="Pay Period (e.g., January 2025)"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <Input
                name="grossSalary"
                type="number"
                step="0.01"
                placeholder="Gross Salary (R)"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <Input
                name="deductions"
                type="number"
                step="0.01"
                placeholder="Total Deductions (R)"
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddPayroll(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600"
              >
                Add Payroll Entry
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Reminder Modal */}
      <Dialog open={showAddReminder} onOpenChange={setShowAddReminder}>
        <DialogContent className="glass backdrop-blur-sm bg-white/95 border border-white/20">
          <DialogHeader>
            <DialogTitle className="font-sf-pro">Add Bank Statement Reminder</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            addReminder({
              title: formData.get('title') as string,
              description: formData.get('description') as string,
              dueDate: formData.get('dueDate') as string,
              type: formData.get('type') as string
            });
          }}>
            <div className="space-y-4">
              <Input
                name="title"
                placeholder="Reminder Title"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <textarea
                name="description"
                placeholder="Description"
                rows={3}
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-blue-500 focus:border-transparent resize-none glass backdrop-blur-sm bg-white/50"
              />
              <Input
                name="dueDate"
                type="date"
                required
                className="glass backdrop-blur-sm bg-white/50 border border-white/20"
              />
              <select
                name="type"
                required
                className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-blue-500 focus:border-transparent glass backdrop-blur-sm bg-white/50"
              >
                <option value="">Select Reminder Type</option>
                <option value="bank-statement">Upload Bank Statement</option>
                <option value="reconciliation">Bank Reconciliation</option>
                <option value="tax-filing">Tax Filing</option>
                <option value="payroll">Payroll Processing</option>
                <option value="invoice-follow-up">Invoice Follow-up</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddReminder(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600"
              >
                Add Reminder
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Transaction Linking Modal */}
      {selectedTransaction && (
        <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
          <DialogContent className="glass backdrop-blur-sm bg-white/95 border border-white/20 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-sf-pro">Link Documents to Transaction</DialogTitle>
            </DialogHeader>
            <div className="mb-4 p-3 glass backdrop-blur-sm bg-white/30 border border-white/20 rounded-lg">
              <p className="font-medium font-sf-pro">{selectedTransaction.description}</p>
              <p className="text-sm text-slate-600">R{parseFloat(selectedTransaction.amount || '0').toFixed(2)} - {selectedTransaction.date}</p>
            </div>
            
            <div className="space-y-6">
              {/* Link Receipts */}
              <div>
                <h4 className="font-medium mb-3 font-sf-pro">Available Receipts</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {receipts.filter(r => !r.linked).map(receipt => (
                    <div key={receipt.id} className="flex items-center justify-between p-2 glass backdrop-blur-sm bg-white/30 border border-white/20 rounded">
                      <span className="text-sm font-sf-pro">{receipt.name}</span>
                      <Button
                        size="sm"
                        onClick={() => {
                          linkReceiptToTransaction(selectedTransaction.id, receipt.id);
                          setSelectedTransaction(null);
                        }}
                        className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600"
                      >
                        Link
                      </Button>
                    </div>
                  ))}
                  {receipts.filter(r => !r.linked).length === 0 && (
                    <p className="text-sm text-slate-500">No unlinked receipts available</p>
                  )}
                </div>
              </div>

              {/* Link Invoices */}
              <div>
                <h4 className="font-medium mb-3 font-sf-pro">Available Invoices</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {invoices.filter(i => !i.linked).map(invoice => (
                    <div key={invoice.id} className="flex items-center justify-between p-2 glass backdrop-blur-sm bg-white/30 border border-white/20 rounded">
                      <span className="text-sm font-sf-pro">{invoice.name}</span>
                      <Button
                        size="sm"
                        onClick={() => {
                          linkInvoiceToTransaction(selectedTransaction.id, invoice.id);
                          setSelectedTransaction(null);
                        }}
                        className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600"
                      >
                        Link
                      </Button>
                    </div>
                  ))}
                  {invoices.filter(i => !i.linked).length === 0 && (
                    <p className="text-sm text-slate-500">No unlinked invoices available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setSelectedTransaction(null)}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Quick Stats Summary */}
      <Card className="fixed bottom-6 right-6 glass backdrop-blur-sm bg-white/95 border border-white/20 shadow-business">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2 text-sm font-sf-pro">Quick Summary</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Total Income:</span>
              <span className="font-medium text-mokm-green-600">
                R{transactions.filter(t => t.category === 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses:</span>
              <span className="font-medium text-mokm-red-600">
                R{transactions.filter(t => t.category !== 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Net Profit:</span>
              <span className="font-medium">
                R{(transactions.filter(t => t.category === 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0) - 
                   transactions.filter(t => t.category !== 'Income').reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Transactions:</span>
              <span className="font-medium">{transactions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Bank Statements:</span>
              <span className="font-medium">{bankStatements.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounting;
