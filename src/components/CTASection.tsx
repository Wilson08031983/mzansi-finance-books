
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-1 mb-4 animate-fade-in delay-200">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-white">Trusted by South African businesses</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight animate-fade-in delay-300">
            Ready to Transform Your
            <span className="block">Business Finances?</span>
          </h2>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-500">
            Join thousands of South African entrepreneurs who trust MOKMzansiBooks to manage their finances efficiently and grow their businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-700">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                Contact Sales
              </Button>
            </Link>
          </div>

          <div className="text-blue-100 text-sm animate-fade-in delay-1000">
            No credit card required • Full access • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
