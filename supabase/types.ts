Warning: --linked is deprecated and will be removed in v4. Use --remote instead
Target: project kaedinvizitiu's Project (vtacthvtjcyrqfdexvkx) · production
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agent_runs: {
        Row: {
          agent_type: string
          created_at: string
          error_code: string | null
          finished_at: string | null
          id: string
          input_hash: string | null
          metadata: Json
          mission_id: string
          model_name: string | null
          model_provider: string | null
          output_hash: string | null
          run_key: string
          started_at: string | null
          status: string
        }
        Insert: {
          agent_type: string
          created_at?: string
          error_code?: string | null
          finished_at?: string | null
          id?: string
          input_hash?: string | null
          metadata?: Json
          mission_id: string
          model_name?: string | null
          model_provider?: string | null
          output_hash?: string | null
          run_key: string
          started_at?: string | null
          status: string
        }
        Update: {
          agent_type?: string
          created_at?: string
          error_code?: string | null
          finished_at?: string | null
          id?: string
          input_hash?: string | null
          metadata?: Json
          mission_id?: string
          model_name?: string | null
          model_provider?: string | null
          output_hash?: string | null
          run_key?: string
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
        ]
      }
      approvals: {
        Row: {
          approval_type: string
          decided_at: string | null
          decided_by: string | null
          id: string
          metadata: Json
          mission_id: string
          reason: string
          requested_at: string
          signal_id: string | null
          status: string
        }
        Insert: {
          approval_type: string
          decided_at?: string | null
          decided_by?: string | null
          id?: string
          metadata?: Json
          mission_id: string
          reason: string
          requested_at?: string
          signal_id?: string | null
          status: string
        }
        Update: {
          approval_type?: string
          decided_at?: string | null
          decided_by?: string | null
          id?: string
          metadata?: Json
          mission_id?: string
          reason?: string
          requested_at?: string
          signal_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "approvals_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string
          event_hash: string
          event_type: string
          id: string
          mission_id: string | null
          occurred_at: string
          payload: Json
          portfolio_id: string | null
          previous_event_hash: string | null
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type: string
          event_hash: string
          event_type: string
          id?: string
          mission_id?: string | null
          occurred_at: string
          payload?: Json
          portfolio_id?: string | null
          previous_event_hash?: string | null
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          event_hash?: string
          event_type?: string
          id?: string
          mission_id?: string | null
          occurred_at?: string
          payload?: Json
          portfolio_id?: string | null
          previous_event_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      fills: {
        Row: {
          created_at: string
          fees: number
          fill_key: string
          filled_at: string
          id: string
          order_id: string
          price: number
          quantity: number
          slippage: number
          source: string
        }
        Insert: {
          created_at?: string
          fees?: number
          fill_key: string
          filled_at: string
          id?: string
          order_id: string
          price: number
          quantity: number
          slippage?: number
          source: string
        }
        Update: {
          created_at?: string
          fees?: number
          fill_key?: string
          filled_at?: string
          id?: string
          order_id?: string
          price?: number
          quantity?: number
          slippage?: number
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "fills_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "paper_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      normalized_facts: {
        Row: {
          as_of_at: string | null
          available_at: string
          confidence: number | null
          created_at: string
          fact_key: string
          fact_type: string
          id: string
          mission_id: string
          period_end: string | null
          period_start: string | null
          quality_status: string
          source_id: string
          symbol: string | null
          unit: string | null
          value_json: Json | null
          value_numeric: number | null
          value_text: string | null
        }
        Insert: {
          as_of_at?: string | null
          available_at: string
          confidence?: number | null
          created_at?: string
          fact_key: string
          fact_type: string
          id?: string
          mission_id: string
          period_end?: string | null
          period_start?: string | null
          quality_status?: string
          source_id: string
          symbol?: string | null
          unit?: string | null
          value_json?: Json | null
          value_numeric?: number | null
          value_text?: string | null
        }
        Update: {
          as_of_at?: string | null
          available_at?: string
          confidence?: number | null
          created_at?: string
          fact_key?: string
          fact_type?: string
          id?: string
          mission_id?: string
          period_end?: string | null
          period_start?: string | null
          quality_status?: string
          source_id?: string
          symbol?: string | null
          unit?: string | null
          value_json?: Json | null
          value_numeric?: number | null
          value_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "normalized_facts_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "normalized_facts_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_orders: {
        Row: {
          asset_type: string
          client_order_id: string
          created_at: string
          id: string
          limit_price: number | null
          maximum_known_loss: number | null
          mission_id: string
          order_type: string
          portfolio_id: string
          quantity: number
          rejection_reason: string | null
          risk_check_status: string
          side: string
          signal_id: string | null
          status: string
          symbol: string
        }
        Insert: {
          asset_type: string
          client_order_id: string
          created_at?: string
          id?: string
          limit_price?: number | null
          maximum_known_loss?: number | null
          mission_id: string
          order_type: string
          portfolio_id: string
          quantity: number
          rejection_reason?: string | null
          risk_check_status: string
          side: string
          signal_id?: string | null
          status: string
          symbol: string
        }
        Update: {
          asset_type?: string
          client_order_id?: string
          created_at?: string
          id?: string
          limit_price?: number | null
          maximum_known_loss?: number | null
          mission_id?: string
          order_type?: string
          portfolio_id?: string
          quantity?: number
          rejection_reason?: string | null
          risk_check_status?: string
          side?: string
          signal_id?: string | null
          status?: string
          symbol?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_orders_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paper_orders_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paper_orders_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          base_currency: string
          created_at: string
          id: string
          is_default: boolean
          mode: string
          name: string
          strategy_version: string
          updated_at: string
        }
        Insert: {
          base_currency?: string
          created_at?: string
          id?: string
          is_default?: boolean
          mode?: string
          name: string
          strategy_version?: string
          updated_at?: string
        }
        Update: {
          base_currency?: string
          created_at?: string
          id?: string
          is_default?: boolean
          mode?: string
          name?: string
          strategy_version?: string
          updated_at?: string
        }
        Relationships: []
      }
      positions: {
        Row: {
          asset_type: string
          average_cost: number
          id: string
          opened_at: string | null
          portfolio_id: string
          quantity: number
          realized_pnl: number
          symbol: string
          updated_at: string
        }
        Insert: {
          asset_type: string
          average_cost: number
          id?: string
          opened_at?: string | null
          portfolio_id: string
          quantity: number
          realized_pnl?: number
          symbol: string
          updated_at?: string
        }
        Update: {
          asset_type?: string
          average_cost?: number
          id?: string
          opened_at?: string | null
          portfolio_id?: string
          quantity?: number
          realized_pnl?: number
          symbol?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          agent_run_id: string
          citations: Json
          confidence: number
          created_at: string
          executive_summary: string
          id: string
          invalidation_conditions: string[]
          mission_id: string
          outcome: string
          report_version: number
          score: number
          sections: Json
          time_horizon: string | null
        }
        Insert: {
          agent_run_id: string
          citations?: Json
          confidence: number
          created_at?: string
          executive_summary: string
          id?: string
          invalidation_conditions?: string[]
          mission_id: string
          outcome: string
          report_version: number
          score: number
          sections?: Json
          time_horizon?: string | null
        }
        Update: {
          agent_run_id?: string
          citations?: Json
          confidence?: number
          created_at?: string
          executive_summary?: string
          id?: string
          invalidation_conditions?: string[]
          mission_id?: string
          outcome?: string
          report_version?: number
          score?: number
          sections?: Json
          time_horizon?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_agent_run_id_fkey"
            columns: ["agent_run_id"]
            isOneToOne: false
            referencedRelation: "agent_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
        ]
      }
      research_missions: {
        Row: {
          benchmark: string | null
          created_at: string
          data_cutoff_at: string
          id: string
          is_simulated: boolean
          mission_key: string
          objective: string
          portfolio_id: string | null
          status: string
          symbols: string[]
          target_type: string
          time_horizon: string | null
          trigger_type: string
          updated_at: string
        }
        Insert: {
          benchmark?: string | null
          created_at?: string
          data_cutoff_at: string
          id?: string
          is_simulated?: boolean
          mission_key: string
          objective: string
          portfolio_id?: string | null
          status?: string
          symbols?: string[]
          target_type: string
          time_horizon?: string | null
          trigger_type: string
          updated_at?: string
        }
        Update: {
          benchmark?: string | null
          created_at?: string
          data_cutoff_at?: string
          id?: string
          is_simulated?: boolean
          mission_key?: string
          objective?: string
          portfolio_id?: string | null
          status?: string
          symbols?: string[]
          target_type?: string
          time_horizon?: string | null
          trigger_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_missions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      runtime_test_records: {
        Row: {
          created_at: string
          id: string
          label: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
        }
        Relationships: []
      }
      signals: {
        Row: {
          action: string
          confidence: number
          created_at: string
          id: string
          mission_id: string
          rationale: string
          report_id: string
          score: number
          symbol: string
        }
        Insert: {
          action: string
          confidence: number
          created_at?: string
          id?: string
          mission_id: string
          rationale: string
          report_id: string
          score: number
          symbol: string
        }
        Update: {
          action?: string
          confidence?: number
          created_at?: string
          id?: string
          mission_id?: string
          rationale?: string
          report_id?: string
          score?: number
          symbol?: string
        }
        Relationships: [
          {
            foreignKeyName: "signals_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signals_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          available_at: string
          content_hash: string
          created_at: string
          freshness_status: string
          id: string
          licensing_status: string
          metadata: Json
          mission_id: string
          provider: string
          published_at: string | null
          relevant_excerpt: string | null
          retrieved_at: string
          source_type: string
          title: string | null
          url: string | null
        }
        Insert: {
          available_at: string
          content_hash: string
          created_at?: string
          freshness_status?: string
          id?: string
          licensing_status?: string
          metadata?: Json
          mission_id: string
          provider: string
          published_at?: string | null
          relevant_excerpt?: string | null
          retrieved_at: string
          source_type: string
          title?: string | null
          url?: string | null
        }
        Update: {
          available_at?: string
          content_hash?: string
          created_at?: string
          freshness_status?: string
          id?: string
          licensing_status?: string
          metadata?: Json
          mission_id?: string
          provider?: string
          published_at?: string | null
          relevant_excerpt?: string | null
          retrieved_at?: string
          source_type?: string
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sources_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "research_missions"
            referencedColumns: ["id"]
          },
        ]
      }
      strategies: {
        Row: {
          configuration: Json
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          portfolio_id: string
          version: number
        }
        Insert: {
          configuration?: Json
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          name: string
          portfolio_id: string
          version: number
        }
        Update: {
          configuration?: Json
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          portfolio_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "strategies_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

