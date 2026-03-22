import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AdminHero() {
  const qc = useQueryClient();
  const { data: hero, isLoading } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: async () => { const { data } = await supabase.from("hero_section").select("*").limit(1).single(); return data; },
  });

  const [form, setForm] = useState({
    headline: "", subheadline: "", description: "", background_type: "color",
    background_value: "", primary_cta_text: "", primary_cta_link: "",
    secondary_cta_text: "", secondary_cta_link: "", is_visible: true,
  });

  useEffect(() => {
    if (hero) setForm({
      headline: hero.headline || "", subheadline: hero.subheadline || "",
      description: hero.description || "", background_type: hero.background_type || "color",
      background_value: hero.background_value || "", primary_cta_text: hero.primary_cta_text || "",
      primary_cta_link: hero.primary_cta_link || "", secondary_cta_text: hero.secondary_cta_text || "",
      secondary_cta_link: hero.secondary_cta_link || "", is_visible: hero.is_visible ?? true,
    });
  }, [hero]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (hero?.id) { await supabase.from("hero_section").update(form).eq("id", hero.id); }
      else { await supabase.from("hero_section").insert(form); }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-hero"] }); qc.invalidateQueries({ queryKey: ["hero_section"] }); toast.success("Hero saved!"); },
    onError: () => toast.error("Failed to save."),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Hero Section</h1>
        <button onClick={() => mutation.mutate()} disabled={mutation.isPending} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50">
          <Save size={14} /> Save
        </button>
      </div>
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 max-w-2xl">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Headline</label>
          <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subheadline</label>
          <input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Primary CTA Text</label>
            <input value={form.primary_cta_text} onChange={(e) => setForm({ ...form, primary_cta_text: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Primary CTA Link</label>
            <input value={form.primary_cta_link} onChange={(e) => setForm({ ...form, primary_cta_link: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Secondary CTA Text</label>
            <input value={form.secondary_cta_text} onChange={(e) => setForm({ ...form, secondary_cta_text: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Secondary CTA Link</label>
            <input value={form.secondary_cta_link} onChange={(e) => setForm({ ...form, secondary_cta_link: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} className="rounded" />
          <span className="text-sm">Visible on website</span>
        </label>
      </div>
    </div>
  );
}
