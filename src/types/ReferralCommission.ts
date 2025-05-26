
export interface ReferralCommission {
  id: string;
  referee_name: string;
  referee_company: string;
  commission_amount: number;
  commission_rate: number;
  created_at: string;
  paid_at?: string;
  payment_date: string;
  client_name: string;
}
