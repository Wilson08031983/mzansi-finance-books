
import { FileText, Users, BarChart3, Shield, Clock, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Invoicing',
      description: 'Create professional invoices with automatic VAT calculations tailored for South African tax requirements.',
      gradient: 'from-mokm-pink-500 to-mokm-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Financial Reports',
      description: 'Get insights with comprehensive reports including P&L, cash flow, and tax-ready statements.',
      gradient: 'from-mokm-blue-500 to-mokm-purple-500'
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Manage all your client information, transaction history, and communications in one place.',
      gradient: 'from-mokm-orange-500 to-mokm-pink-500'
    },
    {
      icon: Zap,
      title: 'RFQ Automation',
      description: 'Streamline your request for quotation process and save time on tender documents.',
      gradient: 'from-mokm-purple-500 to-mokm-blue-500'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Stay on top of your finances with real-time updates and automated reminders.',
      gradient: 'from-mokm-pink-500 to-mokm-orange-500'
    },
    {
      icon: Shield,
      title: 'Bank-level Security',
      description: 'Your data is protected with enterprise-grade security and regular backups.',
      gradient: 'from-mokm-blue-500 to-mokm-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-mokm-blue-50 to-mokm-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-mokm-purple-600 via-mokm-pink-600 to-mokm-orange-600 bg-clip-text text-transparent">
            Everything Your Business Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed specifically for South African businesses, from sole proprietors to growing enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
