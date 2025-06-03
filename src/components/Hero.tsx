
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              South African Accounting
              <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Software Built For
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">Your Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
              Helping South Africans grow, one page at a time. Streamline your finances with our comprehensive platform designed specifically for SA businesses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-500">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free 30-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-2 border-purple-400 text-purple-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:border-transparent px-8 py-4 text-lg font-semibold transition-all duration-300">
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 animate-fade-in delay-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Full Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
