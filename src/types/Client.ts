
import { Payment } from './Payment';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate?: string;
  registration_date?: string;
  date?: string;
  partner_id?: string;
  payments?: Payment[];
}
