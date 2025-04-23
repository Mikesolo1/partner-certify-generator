
export interface Partner {
  id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  partnerLevel: string;
  joinDate: string;
  certificateId: string;
  password?: string;
  testPassed?: boolean;
  clients?: Client[];
  commission?: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  payments: Payment[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'оплачено' | 'в ожидании' | 'отменено';
  commissionAmount: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
