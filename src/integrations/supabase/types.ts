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
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          certificate_id: string | null
          commission: number | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          partner_level: string
          password: string
          phone: string
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }
        Insert: {
          certificate_id?: string | null
          commission?: number | null
          company_name: string
          contact_person: string
          created_at?: string | null
          email: string
          id?: string
          join_date?: string | null
          partner_level: string
          password: string
          phone?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          test_passed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          certificate_id?: string | null
          commission?: number | null
          company_name?: string
          contact_person?: string
          created_at?: string | null
          email?: string
          id?: string
          join_date?: string | null
          partner_level?: string
          password?: string
          phone?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          test_passed?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
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
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
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
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string
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
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string
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
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
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
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
          payment_destination: string | null
          status: string
          tariff_end_date: string | null
          tariff_start_date: string | null
          updated_at: string | null
        }
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
          commission: number | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          partner_level: string
          password: string
          phone: string
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
          id: string
          name: string
          partner_id: string
          phone: string | null
          registration_date: string | null
          updated_at: string | null
        }[]
      }
      delete_client: {
        Args: { p_client_id: string }
        Returns: boolean
      }
      get_all_clients: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          email: string
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
          title: string
        }[]
      }
      get_all_partners: {
        Args: Record<PropertyKey, never>
        Returns: {
          certificate_id: string | null
          commission: number | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          partner_level: string
          password: string
          phone: string
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
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
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
      get_partner_by_credentials: {
        Args: { p_email: string; p_password: string }
        Returns: {
          certificate_id: string | null
          commission: number | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          partner_level: string
          password: string
          phone: string
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      get_partner_by_id: {
        Args: { p_id: string }
        Returns: {
          certificate_id: string | null
          commission: number | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          partner_level: string
          password: string
          phone: string
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
          id: string
          name: string
          partner_id: string
          phone: string | null
          registration_date: string | null
          updated_at: string | null
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
        Returns: {
          certificate_id: string | null
          commission: number | null
          company_name: string
          contact_person: string
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          partner_level: string
          password: string
          phone: string
          role: Database["public"]["Enums"]["user_role"] | null
          test_passed: boolean | null
          updated_at: string | null
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
