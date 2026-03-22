import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.from("profile").select("*").limit(1).single();
      return data;
    },
  });
}

export function useHeroSection() {
  return useQuery({
    queryKey: ["hero_section"],
    queryFn: async () => {
      const { data } = await supabase.from("hero_section").select("*").limit(1).single();
      return data;
    },
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).single();
      return data;
    },
  });
}

export function useNavItems() {
  return useQuery({
    queryKey: ["nav_items"],
    queryFn: async () => {
      const { data } = await supabase.from("nav_items").select("*").order("display_order");
      return data ?? [];
    },
  });
}

export function useSocialLinks() {
  return useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data } = await supabase.from("social_links").select("*").eq("is_visible", true).order("display_order");
      return data ?? [];
    },
  });
}

export function useProjects(featured?: boolean) {
  return useQuery({
    queryKey: ["projects", featured],
    queryFn: async () => {
      let q = supabase.from("projects").select("*").eq("is_visible", true).order("display_order");
      if (featured) q = q.eq("is_featured", true);
      const { data } = await q;
      return data ?? [];
    },
  });
}

export function useProjectBySlug(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
      return data;
    },
    enabled: !!slug,
  });
}

export function useProjectMedia(projectId: string) {
  return useQuery({
    queryKey: ["project_media", projectId],
    queryFn: async () => {
      const { data } = await supabase.from("project_media").select("*").eq("project_id", projectId).order("display_order");
      return data ?? [];
    },
    enabled: !!projectId,
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data } = await supabase.from("experiences").select("*").eq("is_visible", true).order("display_order");
      return data ?? [];
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await supabase.from("skills").select("*").eq("is_visible", true).order("display_order");
      return data ?? [];
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data } = await supabase.from("education").select("*").eq("is_visible", true).order("display_order");
      return data ?? [];
    },
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      const { data } = await supabase.from("certifications").select("*").eq("is_visible", true).order("display_order");
      return data ?? [];
    },
  });
}

export function useTestimonials(featured?: boolean) {
  return useQuery({
    queryKey: ["testimonials", featured],
    queryFn: async () => {
      let q = supabase.from("testimonials").select("*").eq("is_visible", true).order("display_order");
      if (featured) q = q.eq("is_featured", true);
      const { data } = await q;
      return data ?? [];
    },
  });
}

export function useFooterContent() {
  return useQuery({
    queryKey: ["footer_content"],
    queryFn: async () => {
      const { data } = await supabase.from("footer_content").select("*").limit(1).single();
      return data;
    },
  });
}

export function usePageSections(page: string) {
  return useQuery({
    queryKey: ["page_sections", page],
    queryFn: async () => {
      const { data } = await supabase.from("page_sections").select("*").eq("page", page).order("display_order");
      return data ?? [];
    },
  });
}

export function useContactSettings() {
  return useQuery({
    queryKey: ["contact_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("contact_settings").select("*").limit(1).single();
      return data;
    },
  });
}

export function useSeoMetadata(page: string) {
  return useQuery({
    queryKey: ["seo_metadata", page],
    queryFn: async () => {
      const { data } = await supabase.from("seo_metadata").select("*").eq("page", page).single();
      return data;
    },
  });
}
