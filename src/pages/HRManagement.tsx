
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Users,
  UserPlus,
  Calendar,
  Gift,
  Briefcase,
  TrendingDown,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Clock,
  UserCheck,
  FileText,
  DollarSign,
  Target,
  BookOpen,
  Award,
  Plus,
  Building,
  Edit,
  Trash2,
  Download,
  Upload,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
  status: 'active' | 'on-leave' | 'terminated';
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  avatar?: string;
}

type Employee_Legacy = {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  status: 'active' | 'on-leave' | 'terminated';
  hireDate: string;
  avatar?: string;
};

const HRManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'directory' | 'attendance' | 'recruitment' | 'performance' | 'payroll'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  // Sample data
  const hrMetrics = {
    totalEmployees: 127,
    newHires: 8,
    onLeaveToday: 5,
    upcomingBirthdays: 3,
    openPositions: 12,
    turnoverRate: 2.3
  };

  // Updated employees data structure
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'EMP001',
      name: 'Sarah Parker',
      email: 'sarah.parker@mokbooks.co.za',
      phone: '071 234 5678',
      position: 'Senior Developer',
      department: 'Development',
      startDate: '2023-03-15',
      status: 'active',
      location: 'Johannesburg',
      employmentType: 'full-time'
    },
    {
      id: 'EMP002',
      name: 'Michael Johnson',
      email: 'michael.johnson@mokbooks.co.za',
      phone: '082 345 6789',
      position: 'UX Designer',
      department: 'Design',
      startDate: '2023-05-20',
      status: 'active',
      location: 'Cape Town',
      employmentType: 'full-time'
    },
    {
      id: 'EMP003',
      name: 'Lisa Williams',
      email: 'lisa.williams@mokbooks.co.za',
      phone: '073 456 7890',
      position: 'Project Manager',
      department: 'Management',
      startDate: '2022-11-10',
      status: 'on-leave',
      location: 'Durban',
      employmentType: 'full-time'
    },
    {
      id: 'EMP004',
      name: 'David Brown',
      email: 'david.brown@mokbooks.co.za',
      phone: '061 567 8901',
      position: 'Finance Officer',
      department: 'Finance',
      startDate: '2024-01-05',
      status: 'active',
      location: 'Johannesburg',
      employmentType: 'full-time'
    },
    {
      id: 'EMP005',
      name: 'Emma Wilson',
      email: 'emma.wilson@mokbooks.co.za',
      phone: '084 678 9012',
      position: 'Marketing Specialist',
      department: 'Marketing',
      startDate: '2023-08-12',
      status: 'terminated',
      location: 'Cape Town',
      employmentType: 'part-time'
    }
  ]);

  // Legacy sample employees for directory tab
  const sampleEmployees: Employee_Legacy[] = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      email: 'sarah.johnson@mokbooks.co.za',
      phone: '011 123 4567',
      location: 'Johannesburg',
      employmentType: 'full-time',
      status: 'active',
      hireDate: '2023-01-15'
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      jobTitle: 'Software Developer',
      department: 'IT',
      email: 'michael.chen@mokbooks.co.za',
      phone: '011 234 5678',
      location: 'Cape Town',
      employmentType: 'full-time',
      status: 'active',
      hireDate: '2022-08-20'
    },
    {
      id: '3',
      firstName: 'Nomsa',
      lastName: 'Mthembu',
      jobTitle: 'HR Specialist',
      department: 'Human Resources',
      email: 'nomsa.mthembu@mokbooks.co.za',
      phone: '011 345 6789',
      location: 'Johannesburg',
      employmentType: 'full-time',
      status: 'on-leave',
      hireDate: '2023-03-10'
    }
  ];

  // Get unique departments
  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredLegacyEmployees = sampleEmployees.filter(employee => {
    const matchesSearch = 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Employee_Legacy['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEmploymentTypeColor = (type: Employee_Legacy['employmentType']) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      case 'intern':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Toggle employee details
  const toggleEmployeeDetails = (id: string) => {
    if (selectedEmployee === id) {
      setSelectedEmployee(null);
    } else {
      setSelectedEmployee(id);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">Total Employees</p>
                <p className="text-3xl font-bold text-slate-900 font-sf-pro">{hrMetrics.totalEmployees}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">New Hires</p>
                <p className="text-3xl font-bold text-slate-900 font-sf-pro">{hrMetrics.newHires}</p>
                <p className="text-xs text-green-600 font-sf-pro">This month</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-mokm-green-500 to-mokm-blue-500">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">On Leave Today</p>
                <p className="text-3xl font-bold text-slate-900 font-sf-pro">{hrMetrics.onLeaveToday}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-mokm-yellow-500 to-mokm-orange-500">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">Birthdays</p>
                <p className="text-3xl font-bold text-slate-900 font-sf-pro">{hrMetrics.upcomingBirthdays}</p>
                <p className="text-xs text-mokm-pink-600 font-sf-pro">This week</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-mokm-pink-500 to-mokm-purple-500">
                <Gift className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">Open Positions</p>
                <p className="text-3xl font-bold text-slate-900 font-sf-pro">{hrMetrics.openPositions}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">Turnover Rate</p>
                <p className="text-3xl font-bold text-slate-900 font-sf-pro">{hrMetrics.turnoverRate}%</p>
                <p className="text-xs text-green-600 font-sf-pro">Below target</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
        <CardHeader>
          <CardTitle className="text-slate-900 font-sf-pro">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600">
              <UserPlus className="h-6 w-6" />
              <span className="font-sf-pro">Add Employee</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-mokm-green-500 to-mokm-blue-500 hover:from-mokm-green-600 hover:to-mokm-blue-600">
              <DollarSign className="h-6 w-6" />
              <span className="font-sf-pro">Process Payroll</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 hover:from-mokm-orange-600 hover:to-mokm-pink-600">
              <UserCheck className="h-6 w-6" />
              <span className="font-sf-pro">Approve Leave</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-mokm-purple-500 to-mokm-pink-500 hover:from-mokm-purple-600 hover:to-mokm-pink-600">
              <Calendar className="h-6 w-6" />
              <span className="font-sf-pro">Schedule Interview</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sf-pro">Employee Management</h2>
          <p className="text-slate-600 font-sf-pro">Manage your company workforce</p>
        </div>
        
        <Button className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>
      
      {/* Filters */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-slate-500 font-sf-pro">
              <Filter className="h-4 w-4" />
              <span>Department:</span>
            </div>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro text-sm"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-1 text-sm text-slate-500 font-sf-pro">
              <Filter className="h-4 w-4" />
              <span>Status:</span>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map(employee => (
            <Card key={employee.id} className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/70 transition-colors"
                  onClick={() => toggleEmployeeDetails(employee.id)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500 text-white flex items-center justify-center font-medium font-sf-pro">
                      {employee.avatar ? (
                        <img src={employee.avatar} alt={employee.name} className="h-10 w-10 rounded-full" />
                      ) : (
                        getInitials(employee.name)
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-slate-900 font-sf-pro">{employee.name}</div>
                      <div className="text-sm text-slate-600 font-sf-pro">{employee.position}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-sf-pro ${getStatusBadgeColor(employee.status)}`}>
                    {employee.status === 'on-leave' ? 'On Leave' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                  </span>
                </div>
                
                {selectedEmployee === employee.id && (
                  <div className="p-4 bg-white/30 border-t border-white/20">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-slate-400 mr-2" />
                        <div>
                          <div className="text-xs text-slate-500 font-sf-pro">Email</div>
                          <div className="text-sm text-slate-900 font-sf-pro">{employee.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-slate-400 mr-2" />
                        <div>
                          <div className="text-xs text-slate-500 font-sf-pro">Phone</div>
                          <div className="text-sm text-slate-900 font-sf-pro">{employee.phone}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-slate-400 mr-2" />
                        <div>
                          <div className="text-xs text-slate-500 font-sf-pro">Department</div>
                          <div className="text-sm text-slate-900 font-sf-pro">{employee.department}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-slate-400 mr-2" />
                        <div>
                          <div className="text-xs text-slate-500 font-sf-pro">Start Date</div>
                          <div className="text-sm text-slate-900 font-sf-pro">{formatDate(employee.startDate)}</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-2 pt-2 border-t border-white/20">
                        <Button variant="outline" size="sm" className="flex-1 font-sf-pro">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        
                        <Button variant="outline" size="sm" className="px-3 font-sf-pro">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="outline" size="sm" className="px-3 text-red-600 hover:text-red-700 font-sf-pro">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
              <CardContent className="text-center py-12">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-mokm-purple-100 to-mokm-blue-100 flex items-center justify-center">
                  <UserPlus className="h-12 w-12 text-mokm-purple-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-500 font-sf-pro">No employees found</h3>
                <p className="mt-1 text-slate-400 font-sf-pro">
                  Add employees or adjust your filters to see employees
                </p>
                <div className="mt-6">
                  <Button className="bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 hover:from-mokm-blue-600 hover:to-mokm-purple-600 font-sf-pro">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Employee actions */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
        <CardHeader>
          <CardTitle className="text-slate-900 font-sf-pro">Employee Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center space-x-2 py-3 font-sf-pro">
              <Upload className="h-5 w-5" />
              <span>Import Employees</span>
            </Button>
            
            <Button variant="outline" className="flex items-center justify-center space-x-2 py-3 font-sf-pro">
              <Download className="h-5 w-5" />
              <span>Export Employee Data</span>
            </Button>
            
            <Button variant="outline" className="flex items-center justify-center space-x-2 py-3 font-sf-pro">
              <FileText className="h-5 w-5" />
              <span>Employee Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDirectory = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              >
                <option value="all">All Departments</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLegacyEmployees.map((employee) => (
          <Card key={employee.id} className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500 flex items-center justify-center text-white font-bold font-sf-pro">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-sf-pro">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-sm text-slate-600 font-sf-pro">{employee.jobTitle}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-sf-pro">
                  <Briefcase className="h-4 w-4" />
                  {employee.department}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-sf-pro">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-sf-pro">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-sf-pro">
                  <MapPin className="h-4 w-4" />
                  {employee.location}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full font-sf-pro ${getStatusColor(employee.status)}`}>
                    {employee.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full font-sf-pro ${getEmploymentTypeColor(employee.employmentType)}`}>
                    {employee.employmentType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="font-sf-pro">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderModulePlaceholder = (title: string, description: string, icon: React.ReactNode) => (
    <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 font-sf-pro">{title}</h3>
        <p className="text-slate-600 mb-6 font-sf-pro">{description}</p>
        <Button className="bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 hover:from-mokm-orange-600 hover:to-mokm-pink-600 font-sf-pro">
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  );

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
              <h1 className="text-3xl font-bold text-slate-900 font-sf-pro">HR Management</h1>
              <p className="text-slate-600 font-sf-pro">Manage employees, payroll, and human resources</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Users className="h-4 w-4" /> },
            { id: 'employees', label: 'Employees', icon: <Users className="h-4 w-4" /> },
            { id: 'directory', label: 'Employee Directory', icon: <Users className="h-4 w-4" /> },
            { id: 'attendance', label: 'Time & Attendance', icon: <Clock className="h-4 w-4" /> },
            { id: 'recruitment', label: 'Recruitment', icon: <UserPlus className="h-4 w-4" /> },
            { id: 'performance', label: 'Performance', icon: <Target className="h-4 w-4" /> },
            { id: 'payroll', label: 'Payroll', icon: <DollarSign className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-sf-pro ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500 text-white shadow-colored'
                  : 'glass backdrop-blur-sm bg-white/50 border border-white/20 text-slate-700 hover:bg-white/70'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'employees' && renderEmployees()}
          {activeTab === 'directory' && renderDirectory()}
          {activeTab === 'attendance' && renderModulePlaceholder(
            'Time & Attendance',
            'Track employee hours, manage timesheets, and monitor attendance patterns.',
            <Clock className="h-8 w-8 text-white" />
          )}
          {activeTab === 'recruitment' && renderModulePlaceholder(
            'Recruitment',
            'Manage job postings, track candidates, and streamline the hiring process.',
            <UserPlus className="h-8 w-8 text-white" />
          )}
          {activeTab === 'performance' && renderModulePlaceholder(
            'Performance Management',
            'Set goals, conduct reviews, and track employee performance metrics.',
            <Target className="h-8 w-8 text-white" />
          )}
          {activeTab === 'payroll' && renderModulePlaceholder(
            'Payroll Management',
            'Process payroll, manage compensation, and handle tax calculations.',
            <DollarSign className="h-8 w-8 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HRManagement;
