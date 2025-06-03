
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-business-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-business hover:shadow-business-lg transition-shadow duration-300 animate-float">
              <img 
                src="/lovable-uploads/8021eb93-6e6a-421e-a8ff-bed101269a7c.png" 
                alt="MOKMzansiBooks Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">MOKMzansiBooks</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-700 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-0.5 drop-shadow-sm">Home</Link>
            <Link to="/features" className="text-gray-600 hover:text-purple-700 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-0.5 drop-shadow-sm">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-purple-700 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-0.5 drop-shadow-sm">Pricing</Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-700 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-0.5 drop-shadow-sm">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-purple-700 font-medium transition-all duration-300 transform hover:scale-105 shadow-business hover:shadow-business-lg">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:from-orange-500 hover:via-pink-600 hover:to-purple-600 text-white shadow-business-lg hover:shadow-business-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-600 hover:text-purple-700 transition-colors duration-300 p-2 rounded-lg shadow-business hover:shadow-business-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 animate-fade-in shadow-business-lg">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-600 hover:text-purple-700 font-medium transition-colors duration-300 p-2 rounded-lg hover:bg-gray-50">Home</Link>
            <Link to="/features" className="block text-gray-600 hover:text-purple-700 font-medium transition-colors duration-300 p-2 rounded-lg hover:bg-gray-50">Features</Link>
            <Link to="/pricing" className="block text-gray-600 hover:text-purple-700 font-medium transition-colors duration-300 p-2 rounded-lg hover:bg-gray-50">Pricing</Link>
            <Link to="/contact" className="block text-gray-600 hover:text-purple-700 font-medium transition-colors duration-300 p-2 rounded-lg hover:bg-gray-50">Contact</Link>
            <div className="pt-4 space-y-2">
              <Link to="/login" className="block">
                <Button variant="ghost" className="w-full text-gray-600 font-medium shadow-business hover:shadow-business-lg">Log In</Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:from-orange-500 hover:via-pink-600 hover:to-purple-600 text-white shadow-business-lg hover:shadow-business-xl">
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
