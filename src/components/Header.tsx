import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/8021eb93-6e6a-421e-a8ff-bed101269a7c.png" 
                alt="MOKMzansiBooks Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-mokm-purple-700">MOKMzansiBooks</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-mokm-purple-600 transition-colors font-medium">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-mokm-purple-600 transition-colors font-medium">Features</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-mokm-purple-600 transition-colors font-medium">Pricing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-mokm-purple-600 transition-colors font-medium">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-mokm-purple-600 font-medium">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-mokm-purple-600 hover:bg-mokm-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-mokm-purple-600 font-medium">Home</Link>
            <Link to="/features" className="block text-gray-700 hover:text-mokm-purple-600 font-medium">Features</Link>
            <Link to="/pricing" className="block text-gray-700 hover:text-mokm-purple-600 font-medium">Pricing</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-mokm-purple-600 font-medium">Contact</Link>
            <div className="pt-4 space-y-2">
              <Link to="/login" className="block">
                <Button variant="ghost" className="w-full text-gray-700 font-medium">Log In</Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full bg-mokm-purple-600 hover:bg-mokm-purple-700 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
