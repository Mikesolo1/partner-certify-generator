import React, { createContext, useContext, useState, useEffect } from 'react';
import { Partner, Client, Payment, TestQuestion } from '@/types';
import * as api from '@/api/partnersApi';
import { supabase } from '@/integrations/supabase/client';
import { calculatePartnerLevel } from '@/api/partnersApi';
import { useToast } from '@/hooks/use-toast';

interface PartnersContextType {
  partners: Partner[];
  currentPartner: Partner | null;
  testQuestions: TestQuestion[];
  partnerLevel: {
    level: string;
    commission: number;
    nextLevelAt: number | null;
    progress: number;
  } | null;
  addPartner: (partner: Partner) => Promise<Partner>;
  updatePartner: (id: string, updatedPartner: Partner) => Promise<Partner>;
  getPartnerById: (id: string) => Promise<Partner>;
  loginPartner: (email: string, password: string) => Promise<Partner | null>;
  logoutPartner: () => void;
  addClient: (partnerId: string, client: Client) => Promise<Client>;
  removeClient: (partnerId: string, clientId: string) => Promise<boolean>;
  updateClient: (partnerId: string, client: Client) => Promise<Client>;
  completeTest: (partnerId: string) => Promise<Partner>;
  addPayment: (clientId: string, payment: Omit<Payment, 'id' | 'client_id'>) => Promise<Payment>;
  refreshPartnerLevel: (partnerId: string) => Promise<void>;
  loading: boolean;
}

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const usePartners = (): PartnersContextType => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
};

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [partnerLevel, setPartnerLevel] = useState<{
    level: string;
    commission: number;
    nextLevelAt: number | null;
    progress: number;
  } | null>(null);
  const { toast } = useToast();

  const testQuestions: TestQuestion[] = [
    {
      id: '1',
      question: 'Что такое WABA?',
      options: [
        'Web Application Business Account',
        'WhatsApp Business Account',
        'Wide Area Business Administration',
        'Wireless Application Business API'
      ],
      correctAnswer: 1
    },
    {
      id: '2',
      question: 'Какая основная услуга предоставляется компанией S3?',
      options: [
        'Облачное хранилище',
        'Интеграция WABA',
        'Электронная коммерция',
        'Системная аналитика'
      ],
      correctAnswer: 1
    },
    {
      id: '3',
      question: 'Какое преимущество дает интеграция WABA?',
      options: [
        'Увеличение скорости загрузки сайта',
        'Официальное использование WhatsApp API',
        'Доступ к Google Analytics',
        'Оптимизация для поисковых систем'
      ],
      correctAnswer: 1
    },
    {
      id: '4',
      question: 'Какой минимальный партнерский уровень необходим для получения сертификата?',
      options: [
        'Бронзовый',
        'Серебряный',
        'Золотой',
        'Любой уровень дает доступ к сертификату'
      ],
      correctAnswer: 3
    },
    {
      id: '5',
      question: 'Как начисляется партнерская комиссия?',
      options: [
        'Фиксированная сумма за каждого клиента',
        'Процент от суммы оплаты клиентов',
        'На основе количества интеграций',
        'Единоразовый бонус за регистрацию клиента'
      ],
      correctAnswer: 1
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const partnersData = await api.fetchPartners();
        setPartners(partnersData);
        
        const storedCurrentPartner = localStorage.getItem('currentPartner');
        if (storedCurrentPartner) {
          try {
            const parsedPartner = JSON.parse(storedCurrentPartner);
            if (parsedPartner.id) {
              const refreshedPartner = await api.fetchPartnerById(parsedPartner.id);
              setCurrentPartner(refreshedPartner);
              
              const clients = await api.fetchPartnerClients(refreshedPartner.id);
              
              const clientsWithPayments = clients.filter(client => 
                client.payments && client.payments.some(payment => payment.status === "оплачено")
              ).length;
              
              const levelInfo = calculatePartnerLevel(clientsWithPayments);
              setPartnerLevel(levelInfo);
            }
          } catch (error) {
            console.error('Error parsing stored partner or fetching data', error);
            localStorage.removeItem('currentPartner');
            setCurrentPartner(null);
            
            toast({
              title: "Ошибка авторизации",
              description: "Не удалось восстановить сессию. Пожалуйста, войдите снова.",
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error('Error fetching initial data', error);
        toast({
          title: "Ошибка загрузки данных",
          description: "Не удалось загрузить данные с сервера. Проверьте подключение.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    if (currentPartner) {
      localStorage.setItem('currentPartner', JSON.stringify(currentPartner));
    } else {
      localStorage.removeItem('currentPartner');
    }
  }, [currentPartner]);

  const addPartner = async (partner: Partner) => {
    try {
      const newPartnerData = {
        company_name: partner.companyName || partner.company_name,
        contact_person: partner.contactPerson || partner.contact_person,
        email: partner.email,
        partner_level: "Бронзовый",
        join_date: new Date().toISOString(),
        certificate_id: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        password: partner.password,
        test_passed: false,
        role: 'user',
        commission: 20
      };
      
      const newPartner = await api.createPartner(newPartnerData);
      setPartners((prev) => [...prev, newPartner]);
      return newPartner;
    } catch (error) {
      console.error('Error adding partner:', error);
      throw error;
    }
  };

  const updatePartner = async (id: string, updatedPartner: Partner) => {
    try {
      const partnerData = {
        company_name: updatedPartner.companyName || updatedPartner.company_name,
        contact_person: updatedPartner.contactPerson || updatedPartner.contact_person,
        email: updatedPartner.email,
        partner_level: updatedPartner.partnerLevel || updatedPartner.partner_level,
        test_passed: updatedPartner.testPassed || updatedPartner.test_passed,
        role: updatedPartner.role,
        commission: updatedPartner.commission
      };
      
      const updated = await api.updatePartner(id, partnerData);
      
      setPartners((prev) => 
        prev.map((partner) => partner.id === id ? updated : partner)
      );
      
      if (currentPartner && currentPartner.id === id) {
        setCurrentPartner(updated);
      }
      
      return updated;
    } catch (error) {
      console.error('Error updating partner:', error);
      throw error;
    }
  };

  const getPartnerById = async (id: string) => {
    try {
      return await api.fetchPartnerById(id);
    } catch (error) {
      console.error('Error getting partner by ID:', error);
      throw error;
    }
  };
  
  const loginPartner = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      
      if (error || !data) {
        console.error('Login failed:', error);
        return null;
      }
      
      const partner: Partner = {
        id: data.id,
        companyName: data.company_name,
        contactPerson: data.contact_person,
        email: data.email,
        partnerLevel: data.partner_level,
        joinDate: data.join_date,
        certificateId: data.certificate_id,
        password: data.password,
        testPassed: data.test_passed,
        commission: data.commission,
        role: data.role
      };
      
      setCurrentPartner(partner);
      
      const clients = await api.fetchPartnerClients(partner.id!);
      
      const clientsWithPayments = clients.filter(client => 
        client.payments && client.payments.some(payment => payment.status === "оплачено")
      ).length;
      
      const levelInfo = calculatePartnerLevel(clientsWithPayments);
      setPartnerLevel(levelInfo);
      
      return partner;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };
  
  const logoutPartner = () => {
    setCurrentPartner(null);
    setPartnerLevel(null);
    localStorage.removeItem('currentPartner');
  };
  
  const addClient = async (partnerId: string, client: Client) => {
    try {
      const clientData = {
        name: client.name,
        email: client.email,
        phone: client.phone || '',
        partner_id: partnerId,
        registration_date: new Date().toISOString()
      };
      
      const newClient = await api.createClient(clientData);
      
      if (currentPartner && currentPartner.id === partnerId) {
        refreshPartnerLevel(partnerId);
      }
      
      return newClient;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  };
  
  const removeClient = async (partnerId: string, clientId: string) => {
    try {
      await api.deleteClient(clientId);
      
      if (currentPartner && currentPartner.id === partnerId) {
        refreshPartnerLevel(partnerId);
      }
      
      return true;
    } catch (error) {
      console.error('Error removing client:', error);
      throw error;
    }
  };
  
  const updateClient = async (partnerId: string, client: Client) => {
    try {
      const clientData = {
        name: client.name,
        email: client.email,
        phone: client.phone || '',
      };
      
      const updated = await api.updateClient(client.id, clientData);
      
      return updated;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  };
  
  const completeTest = async (partnerId: string) => {
    try {
      const updated = await api.completeTest(partnerId);
      
      setPartners((prev) =>
        prev.map((partner) => partner.id === partnerId ? { ...partner, testPassed: true } : partner)
      );
      
      if (currentPartner && currentPartner.id === partnerId) {
        setCurrentPartner({ ...currentPartner, testPassed: true });
      }
      
      return updated;
    } catch (error) {
      console.error('Error completing test:', error);
      throw error;
    }
  };
  
  const addPayment = async (clientId: string, payment: Omit<Payment, 'id' | 'client_id'>) => {
    try {
      const partnerId = currentPartner?.id;
      if (!partnerId) {
        throw new Error('No current partner');
      }
      
      const commissionRate = currentPartner.commission || 20;
      const commissionAmount = Math.round(payment.amount * (commissionRate / 100));
      
      const paymentData = {
        client_id: clientId,
        amount: payment.amount,
        date: payment.date || new Date().toISOString(),
        status: payment.status || 'оплачено',
        commission_amount: commissionAmount
      };
      
      const newPayment = await api.createPayment(paymentData);
      
      await refreshPartnerLevel(partnerId);
      
      return newPayment;
    } catch (error) {
      console.error('Error adding payment:', error);
      throw error;
    }
  };
  
  const refreshPartnerLevel = async (partnerId: string) => {
    try {
      const clients = await api.fetchPartnerClients(partnerId);
      
      const clientsWithPayments = clients.filter(client => 
        client.payments && client.payments.some(payment => payment.status === "оплачено")
      ).length;
      
      const levelInfo = calculatePartnerLevel(clientsWithPayments);
      
      await api.updatePartner(partnerId, {
        partner_level: levelInfo.level,
        commission: levelInfo.commission
      });
      
      if (currentPartner && currentPartner.id === partnerId) {
        setCurrentPartner({
          ...currentPartner,
          partnerLevel: levelInfo.level,
          commission: levelInfo.commission
        });
        setPartnerLevel(levelInfo);
      }
    } catch (error) {
      console.error('Error refreshing partner level:', error);
      throw error;
    }
  };

  const value = {
    partners,
    currentPartner,
    testQuestions,
    partnerLevel,
    addPartner,
    updatePartner,
    getPartnerById,
    loginPartner,
    logoutPartner,
    addClient,
    removeClient,
    updateClient,
    completeTest,
    addPayment,
    refreshPartnerLevel,
    loading,
  };

  return <PartnersContext.Provider value={value}>{children}</PartnersContext.Provider>;
};
