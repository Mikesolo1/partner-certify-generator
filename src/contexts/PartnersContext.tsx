
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Partner, Client, Payment, TestQuestion } from '@/types/partner';

interface PartnersContextType {
  partners: Partner[];
  currentPartner: Partner | null;
  testQuestions: TestQuestion[];
  addPartner: (partner: Partner) => void;
  updatePartner: (id: string, updatedPartner: Partner) => void;
  getPartnerById: (id: string) => Partner | undefined;
  loginPartner: (email: string, password: string) => Partner | null;
  logoutPartner: () => void;
  addClient: (partnerId: string, client: Client) => void;
  removeClient: (partnerId: string, clientId: string) => void;
  updateClient: (partnerId: string, client: Client) => void;
  completeTest: (partnerId: string) => void;
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

  // Вопросы для тестирования партнеров
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

  // Загрузка данных из localStorage при первом рендере
  useEffect(() => {
    const storedPartners = localStorage.getItem('partners');
    const storedCurrentPartner = localStorage.getItem('currentPartner');
    
    if (storedPartners) {
      try {
        setPartners(JSON.parse(storedPartners));
      } catch (error) {
        console.error('Error parsing stored partners', error);
        setPartners([]);
      }
    } else {
      // Демо-данные для примера
      const samplePartners: Partner[] = [
        {
          id: '1',
          companyName: 'ТехноРешения',
          contactPerson: 'Алексей Иванов',
          email: 'alex@techsolutions.com',
          password: 'password123',
          partnerLevel: 'Золотой',
          joinDate: '2023-01-15',
          certificateId: 'CERT-123456',
          testPassed: true,
          clients: [
            {
              id: '101',
              name: 'ООО "Звезда"',
              email: 'info@zvezda.ru',
              phone: '+7 (495) 123-45-67',
              registrationDate: '2023-02-10',
              payments: [
                {
                  id: 'p1',
                  amount: 15000,
                  date: '2023-03-01',
                  status: 'оплачено',
                  commissionAmount: 1500
                }
              ]
            }
          ],
          commission: 10
        },
        {
          id: '2',
          companyName: 'Глобал Системс',
          contactPerson: 'Мария Гарсия',
          email: 'maria@globalsys.com',
          password: 'password123',
          partnerLevel: 'Серебряный',
          joinDate: '2023-03-22',
          certificateId: 'CERT-789012',
          testPassed: false,
          clients: [],
          commission: 8
        },
        {
          id: '3',
          companyName: 'ДатаФлоу Аналитика',
          contactPerson: 'Вэй Чжан',
          email: 'wei@dataflow.io',
          password: 'password123',
          partnerLevel: 'Платиновый',
          joinDate: '2022-11-05',
          certificateId: 'CERT-345678',
          testPassed: true,
          clients: [
            {
              id: '201',
              name: 'ИП Петров',
              email: 'petrov@mail.ru',
              phone: '+7 (903) 987-65-43',
              registrationDate: '2022-12-15',
              payments: [
                {
                  id: 'p2',
                  amount: 25000,
                  date: '2023-01-10',
                  status: 'оплачено',
                  commissionAmount: 3000
                },
                {
                  id: 'p3',
                  amount: 10000,
                  date: '2023-04-05',
                  status: 'оплачено',
                  commissionAmount: 1200
                }
              ]
            },
            {
              id: '202',
              name: 'ООО "Меркурий"',
              email: 'info@mercury.com',
              phone: '+7 (495) 555-77-88',
              registrationDate: '2023-02-20',
              payments: [
                {
                  id: 'p4',
                  amount: 30000,
                  date: '2023-03-15',
                  status: 'оплачено',
                  commissionAmount: 3600
                }
              ]
            }
          ],
          commission: 12
        }
      ];
      setPartners(samplePartners);
      localStorage.setItem('partners', JSON.stringify(samplePartners));
    }

    if (storedCurrentPartner) {
      try {
        setCurrentPartner(JSON.parse(storedCurrentPartner));
      } catch (error) {
        console.error('Error parsing stored current partner', error);
        setCurrentPartner(null);
      }
    }
    
    setLoading(false);
  }, []);

  // Сохранение партнеров в localStorage при изменении
  useEffect(() => {
    if (partners.length > 0) {
      localStorage.setItem('partners', JSON.stringify(partners));
    }
  }, [partners]);

  // Сохранение текущего партнера в localStorage при изменении
  useEffect(() => {
    if (currentPartner) {
      localStorage.setItem('currentPartner', JSON.stringify(currentPartner));
    } else {
      localStorage.removeItem('currentPartner');
    }
  }, [currentPartner]);

  const addPartner = (partner: Partner) => {
    const newPartner = {
      ...partner,
      id: `${Date.now()}`,
      clients: [],
      testPassed: false,
      commission: 10 // Базовая комиссия для новых партнеров
    };
    setPartners((prevPartners) => [...prevPartners, newPartner]);
  };

  const updatePartner = (id: string, updatedPartner: Partner) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === id ? { ...updatedPartner, id } : partner
      )
    );
    
    // Обновляем текущего партнера, если он изменен
    if (currentPartner && currentPartner.id === id) {
      setCurrentPartner({ ...updatedPartner, id });
    }
  };

  const getPartnerById = (id: string) => {
    return partners.find((partner) => partner.id === id);
  };
  
  const loginPartner = (email: string, password: string) => {
    const partner = partners.find(p => p.email === email && p.password === password);
    if (partner) {
      setCurrentPartner(partner);
      return partner;
    }
    return null;
  };
  
  const logoutPartner = () => {
    setCurrentPartner(null);
  };
  
  const addClient = (partnerId: string, client: Client) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) => {
        if (partner.id === partnerId) {
          const updatedClients = [...(partner.clients || []), client];
          const updatedPartner = { ...partner, clients: updatedClients };
          
          // Обновляем текущего партнера, если он изменен
          if (currentPartner && currentPartner.id === partnerId) {
            setCurrentPartner(updatedPartner);
          }
          
          return updatedPartner;
        }
        return partner;
      })
    );
  };
  
  const removeClient = (partnerId: string, clientId: string) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) => {
        if (partner.id === partnerId && partner.clients) {
          const updatedClients = partner.clients.filter(c => c.id !== clientId);
          const updatedPartner = { ...partner, clients: updatedClients };
          
          // Обновляем текущего партнера, если он изменен
          if (currentPartner && currentPartner.id === partnerId) {
            setCurrentPartner(updatedPartner);
          }
          
          return updatedPartner;
        }
        return partner;
      })
    );
  };
  
  const updateClient = (partnerId: string, updatedClient: Client) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) => {
        if (partner.id === partnerId && partner.clients) {
          const updatedClients = partner.clients.map(client => 
            client.id === updatedClient.id ? updatedClient : client
          );
          const updatedPartner = { ...partner, clients: updatedClients };
          
          // Обновляем текущего партнера, если он изменен
          if (currentPartner && currentPartner.id === partnerId) {
            setCurrentPartner(updatedPartner);
          }
          
          return updatedPartner;
        }
        return partner;
      })
    );
  };
  
  const completeTest = (partnerId: string) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) => {
        if (partner.id === partnerId) {
          const updatedPartner = { ...partner, testPassed: true };
          
          // Обновляем текущего партнера, если он изменен
          if (currentPartner && currentPartner.id === partnerId) {
            setCurrentPartner(updatedPartner);
          }
          
          return updatedPartner;
        }
        return partner;
      })
    );
  };

  const value = {
    partners,
    currentPartner,
    testQuestions,
    addPartner,
    updatePartner,
    getPartnerById,
    loginPartner,
    logoutPartner,
    addClient,
    removeClient,
    updateClient,
    completeTest,
    loading,
  };

  return <PartnersContext.Provider value={value}>{children}</PartnersContext.Provider>;
};
