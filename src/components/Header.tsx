
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Award, Home, List, Plus } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Award className="h-8 w-8 text-certificate-blue" />
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">CertifyPartner</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-1"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/partners')}
              className="flex items-center space-x-1"
            >
              <List className="h-4 w-4" />
              <span>Partners</span>
            </Button>
            <Button 
              onClick={() => navigate('/add-partner')}
              className="flex items-center space-x-1 bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white"
            >
              <Plus className="h-4 w-4" />
              <span>Add Partner</span>
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <List className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
