
export interface Partner {
  id?: string;
  companyName?: string;
  contactPerson?: string;
  email: string;
  partnerLevel?: string;
  joinDate?: string;
  certificateId?: string;
  password?: string;
  testPassed?: boolean;
  commission?: number;
  company_name?: string;
  contact_person?: string;
  partner_level?: string;
  certificate_id?: string;
  test_passed?: boolean;
  join_date?: string;
  role?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate?: string;
  registration_date?: string;
  partner_id?: string;
  payments?: Payment[];
  date?: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'оплачено' | 'в ожидании' | 'отменено';
  commissionAmount?: number;
  commission_amount?: number;
  client_id?: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface PartnerLevelInfo {
  level: string;
  commission: number;
  minClients: number;
  maxClients: number | null;
  color: string;
  icon: string;
  description: string;
}

export const PARTNER_LEVELS: PartnerLevelInfo[] = [
  {
    level: "Бронзовый",
    commission: 20,
    minClients: 0,
    maxClients: 5,
    color: "#CD7F32",
    icon: "award",
    description: "Начальный уровень партнёрства. Получайте 20% комиссии с платежей ваших клиентов"
  },
  {
    level: "Серебряный",
    commission: 25,
    minClients: 6,
    maxClients: 10,
    color: "#C0C0C0",
    icon: "badge",
    description: "Средний уровень. Увеличенная комиссия 25% и расширенная техническая поддержка"
  },
  {
    level: "Золотой",
    commission: 27,
    minClients: 11,
    maxClients: 20,
    color: "#FFD700",
    icon: "medal",
    description: "Высокий уровень. Комиссия 27% и приоритетная поддержка клиентов"
  },
  {
    level: "Платиновый",
    commission: 35,
    minClients: 21,
    maxClients: 50,
    color: "#9B87F5",
    icon: "diamond",
    description: "Элитный уровень. Комиссия 35% и персональный менеджер для вас и ваших клиентов"
  },
  {
    level: "Божественный",
    commission: 50,
    minClients: 51,
    maxClients: null,
    color: "#E5DEFF",
    icon: "star",
    description: "Максимальный уровень. Получайте 50% комиссии и эксклюзивные привилегии"
  }
];

export interface Notification {
  id?: string;
  title: string;
  content: string;
  created_at?: string;
}
