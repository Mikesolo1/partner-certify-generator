
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Users, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Generate Beautiful Partner Certificates</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Create, manage and distribute professional certificates for your business partners in seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate('/add-partner')}
                className="bg-white text-certificate-blue hover:bg-gray-100 font-medium text-lg px-8 py-6"
              >
                Add New Partner
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/partners')}
                className="bg-transparent text-white border-white hover:bg-white/10 font-medium text-lg px-8 py-6"
              >
                View Partners
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-certificate-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-certificate-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Partner Management</h3>
              <p className="text-gray-600">
                Easily add, edit and manage your partners' information in one centralized location.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-certificate-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-certificate-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Beautiful Certificates</h3>
              <p className="text-gray-600">
                Generate professional-looking certificates with customizable templates for different partner levels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-certificate-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-certificate-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">PDF Generation</h3>
              <p className="text-gray-600">
                Download your certificates as high-quality PDF files ready for printing or digital distribution.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start managing your partners and generating professional certificates today.
            </p>
            <Button 
              onClick={() => navigate('/add-partner')}
              className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white font-medium text-lg px-8 py-6"
            >
              Add Your First Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} CertifyPartner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
