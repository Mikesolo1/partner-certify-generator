
export interface Partner {
  id?: string;
  companyName: string;
  company_name?: string; // Added for compatibility
  contactPerson: string;
  contact_person?: string; // Added for compatibility
  email: string;
  partnerLevel: string;
  partner_level?: string; // Added for compatibility
  joinDate: string;
  join_date?: string; // Added for compatibility
  certificateId?: string;
  certificate_id?: string; // Added for compatibility
  password?: string;
  testPassed?: boolean;
  test_passed?: boolean; // Added for compatibility
  commission?: number;
  role?: string;
}
