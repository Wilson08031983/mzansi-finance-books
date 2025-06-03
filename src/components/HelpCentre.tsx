
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail, MessageCircle, X } from 'lucide-react';

const HelpCentre = () => {
  const [isOpen, setIsOpen] = useState(false);

  console.log('HelpCentre render, isOpen:', isOpen);

  const handleOpenChange = (open: boolean) => {
    console.log('Dialog open state changing to:', open);
    setIsOpen(open);
  };

  const handleButtonClick = () => {
    console.log('Help Centre button clicked');
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
          onClick={handleButtonClick}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Help Centre</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group z-10"
          >
            <X className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          </button>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800 animate-slide-up pt-4">
            Help Centre
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            Get in touch with our support team for assistance
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4 animate-fade-in delay-200">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email Support</h4>
                <a 
                  href="mailto:mokgethwamoabelo@gmail.com"
                  className="text-purple-600 hover:text-purple-800 transition-colors duration-300"
                >
                  mokgethwamoabelo@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">WhatsApp Support</h4>
                <a 
                  href="https://wa.me/27645504029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 transition-colors duration-300"
                >
                  064 550 4029
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            We're here to help you get the most out of MOKMzansiBooks
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpCentre;
