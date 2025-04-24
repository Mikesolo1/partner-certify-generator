
export interface Payment {
  id: string;
  client_id: string;
  amount: number;
  date: string;
  status: "оплачено" | "в ожидании" | "отменено";
  commission_amount: number;
  created_at?: string;
  updated_at?: string;
}
