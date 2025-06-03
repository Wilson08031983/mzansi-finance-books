
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4 animate-fade-in">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/8021eb93-6e6a-421e-a8ff-bed101269a7c.png" 
                  alt="MOKMzansiBooks Logo" 
                  className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-300"
                />
              </div>
              <span className="text-xl font-semibold text-mokm-purple-300 group-hover:text-mokm-purple-200 transition-colors duration-300">MOKMzansiBooks</span>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Helping South African businesses grow, one page at a time. Comprehensive financial management designed specifically for local entrepreneurs.
            </p>
            <div className="space-y-1 text-sm text-gray-400 p-4 bg-gray-800/50 rounded-lg shadow-inner">
              <p><strong>Company:</strong> Morwa Moabelo (Pty) Ltd</p>
              <p><strong>Reg No:</strong> 2018/421571/07</p>
              <p><strong>Established:</strong> 2018, Pretoria Atteridgeville</p>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in delay-200">
            <h4 className="text-lg font-semibold text-mokm-purple-300 drop-shadow-sm">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/features" className="hover:text-mokm-purple-300 transition-all duration-300 hover:translate-x-2 block p-1">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-mokm-purple-300 transition-all duration-300 hover:translate-x-2 block p-1">Pricing</Link></li>
              <li><Link to="/demo" className="hover:text-mokm-purple-300 transition-all duration-300 hover:translate-x-2 block p-1">Demo</Link></li>
              <li><Link to="/integrations" className="hover:text-mokm-purple-300 transition-all duration-300 hover:translate-x-2 block p-1">Integrations</Link></li>
            </ul>
          </div>

          <div className="space-y-4 animate-fade-in delay-400">
            <h4 className="text-lg font-semibold text-mokm-blue-300 drop-shadow-sm">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/help" className="hover:text-mokm-blue-300 transition-all duration-300 hover:translate-x-2 block p-1">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-mokm-blue-300 transition-all duration-300 hover:translate-x-2 block p-1">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-mokm-blue-300 transition-all duration-300 hover:translate-x-2 block p-1">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-mokm-blue-300 transition-all duration-300 hover:translate-x-2 block p-1">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 animate-fade-in delay-600">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MOKMzansiBooks. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-mokm-blue-300 text-sm hover:text-mokm-blue-200 transition-colors duration-300 cursor-pointer">mokgethwamoabelo@gmail.com</span>
              <span className="text-mokm-purple-300 text-sm hover:text-mokm-purple-200 transition-colors duration-300 cursor-pointer">+27 64 550 4029</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
