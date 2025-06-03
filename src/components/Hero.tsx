
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-slate-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-mokm-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mokm-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-mokm-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight transform transition-all duration-700 hover:scale-105">
              South African Accounting
              <span className="block text-mokm-purple-700 drop-shadow-lg">
                Software Built For
              </span>
              <span className="block text-mokm-blue-700 drop-shadow-lg">Your Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
              Helping South Africans grow, one page at a time. Streamline your finances with our comprehensive platform designed specifically for SA businesses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-500">
            <Link to="/signup">
              <Button size="lg" className="bg-mokm-purple-600 hover:bg-mokm-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                Start Free 30-Day Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-mokm-blue-300 text-mokm-blue-700 hover:bg-mokm-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 animate-fade-in delay-700">
            <div className="flex items-center gap-2 transition-transform hover:scale-105">
              <CheckCircle className="h-4 w-4 text-mokm-blue-600" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2 transition-transform hover:scale-105">
              <CheckCircle className="h-4 w-4 text-mokm-purple-600" />
              <span>Full Access</span>
            </div>
            <div className="flex items-center gap-2 transition-transform hover:scale-105">
              <CheckCircle className="h-4 w-4 text-mokm-pink-600" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
