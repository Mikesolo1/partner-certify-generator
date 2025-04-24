
export interface Payment {
  id: string;
  client_id: string;
  amount: number;
  date: string;
  status: "оплачено" | "в ожидании" | "отменено";
  commission_amount: number;
  commissionAmount?: number; // Added for compatibility
  created_at?: string;
  updated_at?: string;
  payment_destination?: string;
  tariff_start_date?: string;
  tariff_end_date?: string;
}
