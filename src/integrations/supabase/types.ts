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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          credential_url: string | null
          display_order: number | null
          icon_url: string | null
          id: string
          is_visible: boolean | null
          issue_date: string | null
          issuer: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credential_url?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_visible?: boolean | null
          issue_date?: string | null
          issuer?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credential_url?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_visible?: boolean | null
          issue_date?: string | null
          issuer?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      contact_settings: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          scheduling_link: string | null
          show_email: boolean | null
          show_location: boolean | null
          show_phone: boolean | null
          success_message: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          scheduling_link?: string | null
          show_email?: boolean | null
          show_location?: boolean | null
          show_phone?: boolean | null
          success_message?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          scheduling_link?: string | null
          show_email?: boolean | null
          show_location?: boolean | null
          show_phone?: boolean | null
          success_message?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string
          description: string | null
          display_order: number | null
          end_year: string | null
          field_of_study: string | null
          id: string
          institution: string
          institution_logo_url: string | null
          is_visible: boolean | null
          start_year: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          description?: string | null
          display_order?: number | null
          end_year?: string | null
          field_of_study?: string | null
          id?: string
          institution: string
          institution_logo_url?: string | null
          is_visible?: boolean | null
          start_year?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          description?: string | null
          display_order?: number | null
          end_year?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string
          institution_logo_url?: string | null
          is_visible?: boolean | null
          start_year?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          achievements: string[] | null
          created_at: string
          description: string | null
          display_order: number | null
          end_date: string | null
          experience_type: string | null
          id: string
          is_current: boolean | null
          is_visible: boolean | null
          location: string | null
          org_logo_url: string | null
          organization: string
          role: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          experience_type?: string | null
          id?: string
          is_current?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          org_logo_url?: string | null
          organization: string
          role: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          experience_type?: string | null
          id?: string
          is_current?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          org_logo_url?: string | null
          organization?: string
          role?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          copyright_text: string | null
          created_at: string
          id: string
          show_nav_links: boolean | null
          show_social_links: boolean | null
          tagline: string | null
          updated_at: string
        }
        Insert: {
          copyright_text?: string | null
          created_at?: string
          id?: string
          show_nav_links?: boolean | null
          show_social_links?: boolean | null
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          copyright_text?: string | null
          created_at?: string
          id?: string
          show_nav_links?: boolean | null
          show_social_links?: boolean | null
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          background_type: string | null
          background_value: string | null
          created_at: string
          description: string | null
          headline: string | null
          id: string
          is_visible: boolean | null
          primary_cta_link: string | null
          primary_cta_text: string | null
          secondary_cta_link: string | null
          secondary_cta_text: string | null
          subheadline: string | null
          updated_at: string
        }
        Insert: {
          background_type?: string | null
          background_value?: string | null
          created_at?: string
          description?: string | null
          headline?: string | null
          id?: string
          is_visible?: boolean | null
          primary_cta_link?: string | null
          primary_cta_text?: string | null
          secondary_cta_link?: string | null
          secondary_cta_text?: string | null
          subheadline?: string | null
          updated_at?: string
        }
        Update: {
          background_type?: string | null
          background_value?: string | null
          created_at?: string
          description?: string | null
          headline?: string | null
          id?: string
          is_visible?: boolean | null
          primary_cta_link?: string | null
          primary_cta_text?: string | null
          secondary_cta_link?: string | null
          secondary_cta_text?: string | null
          subheadline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_visible: boolean | null
          label: string
          path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          label: string
          path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          label?: string
          path?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          background_type: string | null
          background_value: string | null
          created_at: string
          custom_css: string | null
          display_order: number | null
          id: string
          is_visible: boolean | null
          page: string
          section_key: string
          section_subtitle: string | null
          section_title: string | null
          updated_at: string
        }
        Insert: {
          background_type?: string | null
          background_value?: string | null
          created_at?: string
          custom_css?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          page?: string
          section_key: string
          section_subtitle?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Update: {
          background_type?: string | null
          background_value?: string | null
          created_at?: string
          custom_css?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          page?: string
          section_key?: string
          section_subtitle?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          availability_status: string | null
          availability_text: string | null
          created_at: string
          email: string | null
          full_bio: string | null
          full_name: string
          id: string
          location: string | null
          phone: string | null
          profile_image_url: string | null
          projects_completed: number | null
          resume_url: string | null
          short_intro: string | null
          title: string | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          availability_status?: string | null
          availability_text?: string | null
          created_at?: string
          email?: string | null
          full_bio?: string | null
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          profile_image_url?: string | null
          projects_completed?: number | null
          resume_url?: string | null
          short_intro?: string | null
          title?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          availability_status?: string | null
          availability_text?: string | null
          created_at?: string
          email?: string | null
          full_bio?: string | null
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          profile_image_url?: string | null
          projects_completed?: number | null
          resume_url?: string | null
          short_intro?: string | null
          title?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      project_media: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          media_type: string | null
          media_url: string
          project_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          media_type?: string | null
          media_url: string
          project_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          media_type?: string | null
          media_url?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          banner_url: string | null
          created_at: string
          demo_url: string | null
          display_order: number | null
          full_description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_visible: boolean | null
          live_url: string | null
          problem: string | null
          process: string | null
          repo_url: string | null
          results: string | null
          short_description: string | null
          slug: string
          solution: string | null
          status: string | null
          tags: string[] | null
          title: string
          tools: string[] | null
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          demo_url?: string | null
          display_order?: number | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          live_url?: string | null
          problem?: string | null
          process?: string | null
          repo_url?: string | null
          results?: string | null
          short_description?: string | null
          slug: string
          solution?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          tools?: string[] | null
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          demo_url?: string | null
          display_order?: number | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          live_url?: string | null
          problem?: string | null
          process?: string | null
          repo_url?: string | null
          results?: string | null
          short_description?: string | null
          slug?: string
          solution?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          tools?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_metadata: {
        Row: {
          created_at: string
          description: string | null
          id: string
          keywords: string | null
          og_image_url: string | null
          page: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string | null
          og_image_url?: string | null
          page: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string | null
          og_image_url?: string | null
          page?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          accent_color: string | null
          created_at: string
          dark_mode_enabled: boolean | null
          favicon_url: string | null
          font_body: string | null
          font_heading: string | null
          id: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          site_description: string | null
          site_title: string
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          created_at?: string
          dark_mode_enabled?: boolean | null
          favicon_url?: string | null
          font_body?: string | null
          font_heading?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_description?: string | null
          site_title?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          created_at?: string
          dark_mode_enabled?: boolean | null
          favicon_url?: string | null
          font_body?: string | null
          font_heading?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          site_description?: string | null
          site_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string | null
          created_at: string
          display_order: number | null
          icon: string | null
          id: string
          is_visible: boolean | null
          name: string
          proficiency: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          name: string
          proficiency?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          name?: string
          proficiency?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          display_order: number | null
          icon: string | null
          id: string
          is_visible: boolean | null
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          platform: string
          updated_at?: string
          url?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_company: string | null
          author_image_url: string | null
          author_name: string
          author_title: string | null
          content: string
          created_at: string
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_visible: boolean | null
          rating: number | null
          updated_at: string
        }
        Insert: {
          author_company?: string | null
          author_image_url?: string | null
          author_name: string
          author_title?: string | null
          content: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          rating?: number | null
          updated_at?: string
        }
        Update: {
          author_company?: string | null
          author_image_url?: string | null
          author_name?: string
          author_title?: string | null
          content?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          rating?: number | null
          updated_at?: string
        }
        Relationships: []
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
