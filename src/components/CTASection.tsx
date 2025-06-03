
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-mokm-purple-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-mokm-blue-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-mokm-pink-300/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-mokm-orange-300 fill-current" />
            ))}
            <span className="ml-2 text-white/90">Trusted by South African businesses</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Ready to Transform Your
            <span className="block">Business Finances?</span>
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of South African entrepreneurs who trust MOKMzansiBooks to manage their finances efficiently and grow their businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-mokm-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-mokm-purple-700 px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Sales
              </Button>
            </Link>
          </div>

          <div className="text-white/80 text-sm">
            No credit card required • Full access • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
