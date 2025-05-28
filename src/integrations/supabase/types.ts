export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certificates: {
        Row: {
          certificate_id: string
          created_at: string | null
          id: string
          issue_date: string | null
          partner_id: string
        }
        Insert: {
          certificate_id: string
          created_at?: string | null
          id?: string
          issue_date?: string | null
          partner_id: string
        }
        Update: {
          certificate_id?: string
          created_at?: string | null
          id?: string
          issue_date?: string | null
          partner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string | null
          email: string
          first_payment_date: string | null
          id: string
          name: string
          partner_id: string
          phone: string | null
          registration_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_payment_date?: string | null
          id?: string
          name: string
          partner_id: string
          phone?: string | null
          registration_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_payment_date?: string | null
          id?: string
          name?: string
          partner_id?: string
          phone?: string | null
          registration_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          id: string
          images: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          images?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          images?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }
        Insert: {
          certificate_id?: string | null
          company_name: string
          contact_person: string
          created_at?: string | null
          email: string
          id?: string
          join_date?: string | null
          password: string
          phone?: string
          referral_access_enabled?: boolean | null
          referral_code?: string | null
          referrer_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          test_passed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          certificate_id?: string | null
          company_name?: string
          contact_person?: string
          created_at?: string | null
          email?: string
          id?: string
          join_date?: string | null
          password?: string
          phone?: string
          referral_access_enabled?: boolean | null
          referral_code?: string | null
          referrer_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          test_passed?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_details: {
        Row: {
          created_at: string | null
          details: Json
          id: string
          is_primary: boolean | null
          partner_id: string
          payment_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          details: Json
          id?: string
          is_primary?: boolean | null
          partner_id: string
          payment_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json
          id?: string
          is_primary?: boolean | null
          partner_id?: string
          payment_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_details_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          client_id: string
          commission_amount: number
          commission_paid: boolean | null
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
          partnership_year: number | null
          payment_destination: string | null
          status: string
          tariff_end_date: string | null
          tariff_start_date: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          client_id: string
          commission_amount: number
          commission_paid?: boolean | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string
          partnership_year?: number | null
          payment_destination?: string | null
          status: string
          tariff_end_date?: string | null
          tariff_start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          commission_amount?: number
          commission_paid?: boolean | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string
          partnership_year?: number | null
          payment_destination?: string | null
          status?: string
          tariff_end_date?: string | null
          tariff_start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_commissions: {
        Row: {
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          paid_at: string | null
          payment_id: string
          referee_id: string
          referrer_id: string
        }
        Insert: {
          commission_amount: number
          commission_rate?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_id: string
          referee_id: string
          referrer_id: string
        }
        Update: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payment_id?: string
          referee_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_commissions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_commissions_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_commissions_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      test_questions: {
        Row: {
          correct_answer: number
          created_at: string | null
          id: string
          options: Json
          question: string
          updated_at: string | null
        }
        Insert: {
          correct_answer: number
          created_at?: string | null
          id?: string
          options: Json
          question: string
          updated_at?: string | null
        }
        Update: {
          correct_answer?: number
          created_at?: string | null
          id?: string
          options?: Json
          question?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_payment_as_admin: {
        Args: {
          p_client_id: string
          p_amount: number
          p_date: string
          p_status: string
          p_admin_id: string
        }
        Returns: {
          amount: number
          client_id: string
          commission_amount: number
          commission_paid: boolean | null
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
          partnership_year: number | null
          payment_destination: string | null
          status: string
          tariff_end_date: string | null
          tariff_start_date: string | null
          updated_at: string | null
        }
      }
      add_payment_with_details: {
        Args: {
          p_client_id: string
          p_amount: number
          p_date: string
          p_status: string
          p_payment_destination: string
          p_tariff_start_date: string
          p_tariff_end_date: string
          p_admin_id: string
        }
        Returns: {
          amount: number
          client_id: string
          commission_amount: number
          commission_paid: boolean | null
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
          partnership_year: number | null
          payment_destination: string | null
          status: string
          tariff_end_date: string | null
          tariff_start_date: string | null
          updated_at: string | null
        }
      }
      calculate_client_partnership_year: {
        Args: { p_client_id: string; p_payment_date: string }
        Returns: number
      }
      calculate_commission_by_year: {
        Args: { p_amount: number; p_partnership_year: number }
        Returns: number
      }
      calculate_partnership_year: {
        Args: { p_partner_id: string; p_payment_date: string }
        Returns: number
      }
      calculate_referral_commission: {
        Args: { p_payment_id: string }
        Returns: undefined
      }
      check_client_exists: {
        Args: { p_email: string; p_phone?: string }
        Returns: {
          does_exist: boolean
          existing_partner_company: string
        }[]
      }
      check_partner_exists: {
        Args: { p_email: string }
        Returns: boolean
      }
      complete_partner_test: {
        Args: { p_partner_id: string }
        Returns: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      create_client: {
        Args: {
          p_partner_id: string
          p_name: string
          p_email: string
          p_phone?: string
        }
        Returns: {
          created_at: string | null
          email: string
          first_payment_date: string | null
          id: string
          name: string
          partner_id: string
          phone: string | null
          registration_date: string | null
          updated_at: string | null
        }[]
      }
      create_notification: {
        Args: { p_title: string; p_content: string }
        Returns: {
          content: string
          created_at: string | null
          id: string
          images: Json | null
          title: string
          updated_at: string | null
        }[]
      }
      delete_client: {
        Args: { p_client_id: string }
        Returns: boolean
      }
      delete_notification: {
        Args: { p_id: string }
        Returns: boolean
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_all_clients: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          email: string
          first_payment_date: string | null
          id: string
          name: string
          partner_id: string
          phone: string | null
          registration_date: string | null
          updated_at: string | null
        }[]
      }
      get_all_notifications: {
        Args: Record<PropertyKey, never>
        Returns: {
          content: string
          created_at: string | null
          id: string
          images: Json | null
          title: string
          updated_at: string | null
        }[]
      }
      get_all_partners: {
        Args: Record<PropertyKey, never>
        Returns: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      get_all_payments: {
        Args: Record<PropertyKey, never>
        Returns: {
          amount: number
          client_id: string
          commission_amount: number
          commission_paid: boolean | null
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
          partnership_year: number | null
          payment_destination: string | null
          status: string
          tariff_end_date: string | null
          tariff_start_date: string | null
          updated_at: string | null
        }[]
      }
      get_all_test_questions: {
        Args: Record<PropertyKey, never>
        Returns: {
          correct_answer: number
          created_at: string | null
          id: string
          options: Json
          question: string
          updated_at: string | null
        }[]
      }
      get_client_payments: {
        Args: { p_client_id: string }
        Returns: {
          id: string
          client_id: string
          amount: number
          date: string
          status: string
          commission_amount: number
          commission_paid: boolean
          payment_destination: string
          tariff_start_date: string
          tariff_end_date: string
          created_by: string
          created_at: string
        }[]
      }
      get_client_payments_with_commission: {
        Args: { p_client_id: string }
        Returns: {
          id: string
          client_id: string
          amount: number
          date: string
          status: string
          commission_amount: number
          commission_paid: boolean
          payment_destination: string
          tariff_start_date: string
          tariff_end_date: string
          created_by: string
          created_at: string
        }[]
      }
      get_partner_by_credentials: {
        Args: { p_email: string; p_password: string }
        Returns: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      get_partner_by_id: {
        Args: { p_id: string }
        Returns: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      get_partner_clients: {
        Args: { p_partner_id: string }
        Returns: {
          created_at: string | null
          email: string
          first_payment_date: string | null
          id: string
          name: string
          partner_id: string
          phone: string | null
          registration_date: string | null
          updated_at: string | null
        }[]
      }
      get_partner_commission_totals: {
        Args: { p_partner_id: string }
        Returns: {
          total_commission: number
          paid_commission: number
          pending_commission: number
          client_count: number
        }[]
      }
      get_partner_payment_details: {
        Args: { p_partner_id: string }
        Returns: {
          created_at: string | null
          details: Json
          id: string
          is_primary: boolean | null
          partner_id: string
          payment_type: string
          updated_at: string | null
        }[]
      }
      get_partner_payments_with_commission: {
        Args: { p_partner_id: string }
        Returns: {
          id: string
          client_id: string
          client_name: string
          amount: number
          date: string
          status: string
          commission_amount: number
          commission_paid: boolean
        }[]
      }
      get_partner_referral_commissions: {
        Args: { p_partner_id: string }
        Returns: {
          id: string
          referee_name: string
          referee_company: string
          commission_amount: number
          commission_rate: number
          created_at: string
          paid_at: string
          payment_date: string
          client_name: string
        }[]
      }
      get_partner_referrals: {
        Args: { p_partner_id: string }
        Returns: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      insert_partner_direct: {
        Args:
          | {
              p_company_name: string
              p_contact_person: string
              p_email: string
              p_password: string
              p_partner_level?: string
              p_certificate_id?: string
              p_commission?: number
            }
          | {
              p_company_name: string
              p_contact_person: string
              p_email: string
              p_password: string
              p_partner_level?: string
              p_commission?: number
              p_phone?: string
            }
          | {
              p_company_name: string
              p_contact_person: string
              p_email: string
              p_password: string
              p_partner_level?: string
              p_commission?: number
              p_phone?: string
              p_referral_code?: string
            }
          | {
              p_company_name: string
              p_contact_person: string
              p_email: string
              p_password: string
              p_phone?: string
            }
        Returns: {
          certificate_id: string | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          password: string
          phone: string
          referral_access_enabled: boolean | null
          referral_code: string | null
          referrer_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      mark_commission_paid: {
        Args: { p_payment_id: string }
        Returns: boolean
      }
      mark_partner_commissions_paid: {
        Args: { p_partner_id: string; p_admin_id: string }
        Returns: {
          updated_count: number
          total_amount: number
        }[]
      }
      mark_referral_commissions_paid: {
        Args: { p_referrer_id: string }
        Returns: {
          updated_count: number
          total_amount: number
        }[]
      }
      save_partner_payment_details: {
        Args: {
          p_partner_id: string
          p_payment_type: string
          p_details: Json
          p_is_primary?: boolean
        }
        Returns: {
          created_at: string | null
          details: Json
          id: string
          is_primary: boolean | null
          partner_id: string
          payment_type: string
          updated_at: string | null
        }[]
      }
      update_notification: {
        Args: {
          p_id: string
          p_title: string
          p_content: string
          p_images?: Json
        }
        Returns: {
          content: string
          created_at: string | null
          id: string
          images: Json | null
          title: string
          updated_at: string | null
        }[]
      }
      update_partner_referral_access: {
        Args: { p_partner_id: string; p_referral_access_enabled: boolean }
        Returns: boolean
      }
      update_partner_referral_code: {
        Args: { p_partner_id: string }
        Returns: string
      }
      validate_referral_code: {
        Args: { p_referral_code: string }
        Returns: {
          is_valid: boolean
          referrer_id: string
          referrer_name: string
          referrer_company: string
        }[]
      }
    }
    Enums: {
      user_role: "admin" | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "partner"],
    },
  },
} as const
