import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save, Eye, EyeOff, Star } from "lucide-react";

export default function AdminProjects() {
  const qc = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => { const { data } = await supabase.from("projects").select("*").order("display_order"); return data ?? []; },
  });

  const [editing, setEditing] = useState<any>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [toolsInput, setToolsInput] = useState("");

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { await supabase.from("projects").delete().eq("id", id); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-projects"] }); toast.success("Deleted"); },
  });

  const saveMut = useMutation({
    mutationFn: async () => {
      const payload = {
        ...editing,
        tags: tagsInput.split(",").map((t: string) => t.trim()).filter(Boolean),
        tools: toolsInput.split(",").map((t: string) => t.trim()).filter(Boolean),
      };
      delete payload.created_at; delete payload.updated_at;
      if (editing.id) {
        await supabase.from("projects").update(payload).eq("id", editing.id);
      } else {
        await supabase.from("projects").insert(payload);
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-projects"] }); setEditing(null); toast.success("Saved!"); },
    onError: (e: any) => toast.error(e.message || "Failed"),
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      await supabase.from("projects").update({ is_visible: visible }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });

  const toggleFeatured = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      await supabase.from("projects").update({ is_featured: featured }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });

  const startNew = () => {
    setEditing({ title: "", slug: "", short_description: "", full_description: "", problem: "", solution: "", process: "", results: "", image_url: "", banner_url: "", live_url: "", demo_url: "", repo_url: "", status: "completed", is_featured: false, is_visible: true, display_order: (projects?.length ?? 0) });
    setTagsInput(""); setToolsInput("");
  };

  const startEdit = (p: any) => {
    setEditing({ ...p });
    setTagsInput((p.tags ?? []).join(", "));
    setToolsInput((p.tools ?? []).join(", "));
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{editing.id ? "Edit Project" : "New Project"}</h1>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm font-medium rounded-lg bg-muted hover:bg-muted/80 transition-all">Cancel</button>
            <button onClick={() => saveMut.mutate()} disabled={saveMut.isPending} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 disabled:opacity-50">
              <Save size={14} /> Save
            </button>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 space-y-4 max-w-2xl">
          {[
            { label: "Title", field: "title" },
            { label: "Slug", field: "slug" },
            { label: "Short Description", field: "short_description", textarea: true },
            { label: "Full Description", field: "full_description", textarea: true },
            { label: "Problem", field: "problem", textarea: true },
            { label: "Solution", field: "solution", textarea: true },
            { label: "Process", field: "process", textarea: true },
            { label: "Results", field: "results", textarea: true },
            { label: "Image URL", field: "image_url" },
            { label: "Banner URL", field: "banner_url" },
            { label: "Live URL", field: "live_url" },
            { label: "Demo URL", field: "demo_url" },
            { label: "Repo URL", field: "repo_url" },
          ].map(({ label, field, textarea }) => (
            <div key={field}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
              {textarea ? (
                <textarea value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} rows={3} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              ) : (
                <input value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              )}
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tags (comma separated)</label>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tools (comma separated)</label>
            <input value={toolsInput} onChange={(e) => setToolsInput(e.target.value)} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
              <select value={editing.status || "completed"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planned">Planned</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Display Order</label>
              <input type="number" value={editing.display_order || 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.is_visible ?? true} onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })} className="rounded" />
              <span className="text-sm">Visible</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.is_featured ?? false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="rounded" />
              <span className="text-sm">Featured</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 active:scale-[0.97] transition-all">
          <Plus size={14} /> Add Project
        </button>
      </div>
      <div className="space-y-2">
        {(projects ?? []).map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-all">
            {p.image_url && <img src={p.image_url} alt="" className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground truncate">{p.short_description}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleFeatured.mutate({ id: p.id, featured: !p.is_featured })} className={`p-2 rounded-lg transition-colors ${p.is_featured ? "text-accent" : "text-muted-foreground hover:text-foreground"}`} title="Toggle featured">
                <Star size={14} fill={p.is_featured ? "currentColor" : "none"} />
              </button>
              <button onClick={() => toggleVisibility.mutate({ id: p.id, visible: !p.is_visible })} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors" title="Toggle visibility">
                {p.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button onClick={() => startEdit(p)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-all">Edit</button>
              <button onClick={() => { if (confirm("Delete this project?")) deleteMut.mutate(p.id); }} className="p-2 rounded-lg text-destructive hover:bg-destructive/8 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {(projects ?? []).length === 0 && <p className="text-center text-muted-foreground py-10">No projects yet. Add your first one!</p>}
      </div>
    </div>
  );
}
