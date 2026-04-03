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
  const [metricsInput, setMetricsInput] = useState<{ label: string; value: string }[]>([]);

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
        key_metrics: metricsInput.filter(m => m.label.trim() || m.value.trim()),
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
    setEditing({
      title: "", slug: "", short_description: "", full_description: "", problem: "", solution: "", process: "", results: "",
      engineering_analysis: "", challenges: "", my_role: "",
      image_url: "", banner_url: "", live_url: "", demo_url: "", repo_url: "",
      status: "completed", project_context: "personal", project_date: "", duration: "", team_size: "", is_individual: true,
      is_featured: false, is_visible: true, display_order: (projects?.length ?? 0),
    });
    setTagsInput(""); setToolsInput(""); setMetricsInput([]);
  };

  const startEdit = (p: any) => {
    setEditing({ ...p });
    setTagsInput((p.tags ?? []).join(", "));
    setToolsInput((p.tools ?? []).join(", "));
    setMetricsInput(Array.isArray(p.key_metrics) ? p.key_metrics : []);
  };

  const addMetric = () => setMetricsInput([...metricsInput, { label: "", value: "" }]);
  const removeMetric = (i: number) => setMetricsInput(metricsInput.filter((_, idx) => idx !== i));
  const updateMetric = (i: number, field: "label" | "value", val: string) => {
    const updated = [...metricsInput];
    updated[i] = { ...updated[i], [field]: val };
    setMetricsInput(updated);
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
        <div className="bg-card rounded-xl border border-border p-6 space-y-4 max-w-3xl">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Basic Info</h3>
          {[
            { label: "Title", field: "title" },
            { label: "Slug", field: "slug" },
            { label: "Short Description", field: "short_description", textarea: true },
          ].map(({ label, field, textarea }) => (
            <div key={field}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
              {textarea ? (
                <textarea value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} rows={2} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              ) : (
                <input value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              )}
            </div>
          ))}

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 pt-4">Context & Timeline</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project Date / Semester</label>
              <input value={editing.project_date || ""} onChange={(e) => setEditing({ ...editing, project_date: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Fall 2025" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Duration</label>
              <input value={editing.duration || ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. 4 weeks" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Context</label>
              <select value={editing.project_context || "personal"} onChange={(e) => setEditing({ ...editing, project_context: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="personal">Personal Project</option>
                <option value="course">Course Project</option>
                <option value="team">Team Project</option>
                <option value="research">Research Project</option>
                <option value="competition">Competition Project</option>
                <option value="club">Club Project</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Team Size</label>
              <input value={editing.team_size || ""} onChange={(e) => setEditing({ ...editing, team_size: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. 4" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">My Role / Responsibilities</label>
            <textarea value={editing.my_role || ""} onChange={(e) => setEditing({ ...editing, my_role: e.target.value })} rows={2} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={editing.is_individual ?? true} onChange={(e) => setEditing({ ...editing, is_individual: e.target.checked })} className="rounded" />
            <span className="text-sm">Individual project</span>
          </label>

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 pt-4">Case Study Content</h3>
          {[
            { label: "Full Description / Overview", field: "full_description" },
            { label: "Problem Definition", field: "problem" },
            { label: "Design Approach / Solution", field: "solution" },
            { label: "Engineering Analysis (calculations, simulations, FEA, plots)", field: "engineering_analysis" },
            { label: "Build & Implementation (prototype, fabrication, assembly)", field: "process" },
            { label: "Results & Performance (quantitative outcomes)", field: "results" },
            { label: "Challenges & Iterations (problems, changes, lessons)", field: "challenges" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
              <textarea value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} rows={3} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
          ))}

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 pt-4">Key Metrics</h3>
          <p className="text-xs text-muted-foreground">Add quantitative results (e.g. accuracy, load, speed, dimensions).</p>
          {metricsInput.map((m, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={m.label} onChange={(e) => updateMetric(i, "label", e.target.value)} placeholder="Label (e.g. Load Capacity)" className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background" />
              <input value={m.value} onChange={(e) => updateMetric(i, "value", e.target.value)} placeholder="Value (e.g. 50 kg)" className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background" />
              <button onClick={() => removeMetric(i)} className="p-2 text-destructive hover:bg-destructive/8 rounded-lg"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={addMetric} className="text-xs text-primary font-medium hover:underline">+ Add metric</button>

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 pt-4">Media & Links</h3>
          {[
            { label: "Image URL", field: "image_url" },
            { label: "Banner URL", field: "banner_url" },
            { label: "Live URL", field: "live_url" },
            { label: "Demo URL", field: "demo_url" },
            { label: "Repo URL", field: "repo_url" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
              <input value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          ))}

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 pt-4">Tags & Tools</h3>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tags (comma separated)</label>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tools (comma separated)</label>
            <input value={toolsInput} onChange={(e) => setToolsInput(e.target.value)} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 pt-4">Settings</h3>
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
