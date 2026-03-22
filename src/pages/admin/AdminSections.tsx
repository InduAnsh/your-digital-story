import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AdminSections() {
  const qc = useQueryClient();
  const { data: sections } = useQuery({
    queryKey: ["admin-sections"],
    queryFn: async () => { const { data } = await supabase.from("page_sections").select("*").order("display_order"); return data ?? []; },
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      await supabase.from("page_sections").update({ is_visible: visible }).eq("id", id);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-sections"] }); qc.invalidateQueries({ queryKey: ["page_sections"] }); toast.success("Updated"); },
  });

  const updateSection = useMutation({
    mutationFn: async ({ id, title, subtitle, order }: { id: string; title: string; subtitle: string; order: number }) => {
      await supabase.from("page_sections").update({ section_title: title, section_subtitle: subtitle, display_order: order }).eq("id", id);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-sections"] }); toast.success("Saved"); },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Page Sections</h1>
      <p className="text-sm text-muted-foreground mb-6">Control section titles, visibility, and ordering on your pages.</p>
      <div className="space-y-3 max-w-2xl">
        {(sections ?? []).map((s) => (
          <div key={s.id} className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-sm">{s.section_key} <span className="text-xs text-muted-foreground ml-2">({s.page})</span></p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={s.is_visible ?? true} onChange={(e) => toggleVisibility.mutate({ id: s.id, visible: e.target.checked })} className="rounded" />
                <span className="text-xs">Visible</span>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input defaultValue={s.section_title || ""} onBlur={(e) => updateSection.mutate({ id: s.id, title: e.target.value, subtitle: s.section_subtitle || "", order: s.display_order ?? 0 })} placeholder="Title" className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background" />
              <input defaultValue={s.section_subtitle || ""} onBlur={(e) => updateSection.mutate({ id: s.id, title: s.section_title || "", subtitle: e.target.value, order: s.display_order ?? 0 })} placeholder="Subtitle" className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background" />
              <input type="number" defaultValue={s.display_order ?? 0} onBlur={(e) => updateSection.mutate({ id: s.id, title: s.section_title || "", subtitle: s.section_subtitle || "", order: parseInt(e.target.value) || 0 })} placeholder="Order" className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background" />
            </div>
          </div>
        ))}
        {(sections ?? []).length === 0 && <p className="text-muted-foreground text-center py-10">No sections configured yet. They'll appear here when you add content.</p>}
      </div>
    </div>
  );
}
