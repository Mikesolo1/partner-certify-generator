
import React, { useState } from 'react';
import { usePartners } from '@/contexts/PartnersContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PartnerCard from '@/components/PartnerCard';
import Header from '@/components/Header';

const PartnersPage = () => {
  const { partners, loading } = usePartners();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPartners = partners.filter(partner => {
    const searchString = searchTerm.toLowerCase();
    return (
      partner.companyName.toLowerCase().includes(searchString) ||
      partner.contactPerson.toLowerCase().includes(searchString) ||
      partner.email.toLowerCase().includes(searchString) ||
      partner.partnerLevel.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Partners</h1>
            <p className="text-gray-600">Manage your registered partners and their certificates.</p>
          </div>
          
          <Button 
            onClick={() => navigate('/add-partner')}
            className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search partners by name, contact person, or level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading partners...</p>
          </div>
        ) : filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-white">
            <h3 className="text-xl font-medium mb-2">No partners found</h3>
            {searchTerm ? (
              <p className="text-gray-500">Try adjusting your search terms.</p>
            ) : (
              <div className="mt-4">
                <p className="text-gray-500 mb-4">Get started by adding your first partner.</p>
                <Button 
                  onClick={() => navigate('/add-partner')}
                  className="bg-certificate-blue text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Partner
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersPage;
