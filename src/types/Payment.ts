
export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'оплачено' | 'в ожидании' | 'отменено';
  commissionAmount?: number;
  commission_amount?: number;
  client_id?: string;
}
