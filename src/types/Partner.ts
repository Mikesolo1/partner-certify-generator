
export interface Partner {
  id?: string;
  companyName: string;
  company_name?: string; // Added for compatibility
  contactPerson: string;
  contact_person?: string; // Added for compatibility
  email: string;
  joinDate: string;
  join_date?: string; // Added for compatibility
  certificateId?: string;
  certificate_id?: string; // Added for compatibility
  password?: string;
  testPassed?: boolean;
  test_passed?: boolean; // Added for compatibility
  role?: string;
  phone: string;
  referrerId?: string;
  referrer_id?: string; // Added for compatibility
  referralCode?: string;
  referral_code?: string; // Added for compatibility
  referralAccessEnabled?: boolean;
  referral_access_enabled?: boolean; // Added for compatibility
}
