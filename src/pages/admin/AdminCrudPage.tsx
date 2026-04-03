import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";

type ItemType = "experience" | "skill" | "education" | "testimonial" | "nav_item" | "social_link" | "certification" | "coursework" | "leadership_activity" | "achievement" | "technical_highlight" | "interest";

interface CrudConfig {
  table: string;
  title: string;
  fields: { label: string; field: string; type?: string; textarea?: boolean; options?: { label: string; value: string }[] }[];
  defaultItem: Record<string, any>;
}

const configs: Record<ItemType, CrudConfig> = {
  experience: {
    table: "experiences", title: "Experience",
    fields: [
      { label: "Role", field: "role" }, { label: "Organization", field: "organization" },
      { label: "Location", field: "location" }, { label: "Logo URL", field: "org_logo_url" },
      { label: "Start Date", field: "start_date" }, { label: "End Date", field: "end_date" },
      { label: "Description", field: "description", textarea: true },
      { label: "Type", field: "experience_type", options: [{ label: "Work", value: "work" }, { label: "Internship", value: "internship" }, { label: "Research", value: "research" }, { label: "Volunteer", value: "volunteer" }, { label: "Leadership", value: "leadership" }] },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { role: "", organization: "", location: "", org_logo_url: "", start_date: "", end_date: "", description: "", experience_type: "work", is_current: false, is_visible: true, display_order: 0 },
  },
  skill: {
    table: "skills", title: "Skills",
    fields: [
      { label: "Name", field: "name" }, { label: "Icon", field: "icon" },
      { label: "Category", field: "category", options: [
        { label: "Engineering Software", value: "engineering_software" },
        { label: "Programming", value: "programming" },
        { label: "Hardware / Fabrication", value: "hardware_fabrication" },
        { label: "Analysis / Methods", value: "analysis_methods" },
        { label: "Laboratory Tools", value: "laboratory_tools" },
        { label: "Soft Skills", value: "soft_skills" },
        { label: "Technical", value: "technical" },
        { label: "Tools", value: "tools" },
        { label: "Languages", value: "languages" },
      ] },
      { label: "Proficiency", field: "proficiency", type: "number" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { name: "", category: "engineering_software", icon: "", proficiency: 80, is_visible: true, display_order: 0 },
  },
  education: {
    table: "education", title: "Education",
    fields: [
      { label: "Degree", field: "degree" }, { label: "Institution", field: "institution" },
      { label: "Field of Study", field: "field_of_study" }, { label: "Start Year", field: "start_year" },
      { label: "End Year", field: "end_year" }, { label: "Description", field: "description", textarea: true },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { degree: "", institution: "", field_of_study: "", start_year: "", end_year: "", description: "", is_visible: true, display_order: 0 },
  },
  testimonial: {
    table: "testimonials", title: "Testimonials",
    fields: [
      { label: "Author Name", field: "author_name" }, { label: "Author Title", field: "author_title" },
      { label: "Author Company", field: "author_company" }, { label: "Author Image URL", field: "author_image_url" },
      { label: "Content", field: "content", textarea: true }, { label: "Rating", field: "rating", type: "number" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { author_name: "", author_title: "", author_company: "", author_image_url: "", content: "", rating: 5, is_featured: false, is_visible: true, display_order: 0 },
  },
  nav_item: {
    table: "nav_items", title: "Navigation",
    fields: [
      { label: "Label", field: "label" }, { label: "Path", field: "path" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { label: "", path: "", is_visible: true, display_order: 0 },
  },
  social_link: {
    table: "social_links", title: "Social Links",
    fields: [
      { label: "Platform", field: "platform", options: [{ label: "GitHub", value: "github" }, { label: "LinkedIn", value: "linkedin" }, { label: "Twitter", value: "twitter" }, { label: "Email", value: "email" }, { label: "Website", value: "website" }, { label: "YouTube", value: "youtube" }, { label: "Dribbble", value: "dribbble" }] },
      { label: "URL", field: "url" }, { label: "Icon", field: "icon" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { platform: "github", url: "", icon: "", is_visible: true, display_order: 0 },
  },
  certification: {
    table: "certifications", title: "Certifications",
    fields: [
      { label: "Name", field: "name" }, { label: "Issuer", field: "issuer" },
      { label: "Issue Date", field: "issue_date" }, { label: "Credential URL", field: "credential_url" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { name: "", issuer: "", issue_date: "", credential_url: "", is_visible: true, display_order: 0 },
  },
  coursework: {
    table: "coursework", title: "Coursework",
    fields: [
      { label: "Name", field: "name" },
      { label: "Category", field: "category", options: [
        { label: "Core", value: "core" }, { label: "Elective", value: "elective" },
        { label: "Lab", value: "lab" }, { label: "Math", value: "math" },
      ] },
      { label: "Description", field: "description", textarea: true },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { name: "", category: "core", description: "", is_visible: true, display_order: 0 },
  },
  leadership_activity: {
    table: "leadership_activities", title: "Leadership & Activities",
    fields: [
      { label: "Title / Role", field: "title" },
      { label: "Organization", field: "organization" },
      { label: "Start Date", field: "start_date" },
      { label: "End Date", field: "end_date" },
      { label: "Description", field: "description", textarea: true },
      { label: "Responsibilities", field: "responsibilities", textarea: true },
      { label: "Accomplishments", field: "accomplishments", textarea: true },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { title: "", organization: "", start_date: "", end_date: "", description: "", responsibilities: "", accomplishments: "", is_visible: true, display_order: 0 },
  },
  achievement: {
    table: "achievements", title: "Achievements & Awards",
    fields: [
      { label: "Title", field: "title" },
      { label: "Issuer", field: "issuer" },
      { label: "Date", field: "date" },
      { label: "Description", field: "description", textarea: true },
      { label: "Type", field: "achievement_type", options: [
        { label: "Award", value: "award" }, { label: "Scholarship", value: "scholarship" },
        { label: "Certification", value: "certification" }, { label: "Competition", value: "competition" },
        { label: "Dean's List", value: "deans_list" }, { label: "Training", value: "training" },
      ] },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { title: "", issuer: "", date: "", description: "", achievement_type: "award", is_visible: true, display_order: 0 },
  },
  technical_highlight: {
    table: "technical_highlights", title: "Technical Highlights",
    fields: [
      { label: "Title", field: "title" },
      { label: "Description", field: "description", textarea: true },
      { label: "Icon", field: "icon" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { title: "", description: "", icon: "", is_visible: true, display_order: 0 },
  },
  interest: {
    table: "interests", title: "Technical Interests",
    fields: [
      { label: "Title", field: "title" },
      { label: "Description", field: "description", textarea: true },
      { label: "Icon", field: "icon" },
      { label: "Display Order", field: "display_order", type: "number" },
    ],
    defaultItem: { title: "", description: "", icon: "", is_visible: true, display_order: 0 },
  },
};

export default function AdminCrudPage({ type }: { type: ItemType }) {
  const config = configs[type];
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: [`admin-${config.table}`],
    queryFn: async () => {
      const { data } = await supabase.from(config.table as any).select("*").order("display_order");
      return (data ?? []) as any[];
    },
  });

  const saveMut = useMutation({
    mutationFn: async () => {
      const payload = { ...editing };
      delete payload.created_at; delete payload.updated_at;
      if (editing.id) {
        await supabase.from(config.table as any).update(payload).eq("id", editing.id);
      } else {
        delete payload.id;
        await supabase.from(config.table as any).insert(payload);
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [`admin-${config.table}`] }); qc.invalidateQueries({ queryKey: [config.table] }); setEditing(null); toast.success("Saved!"); },
    onError: (e: any) => toast.error(e.message || "Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { await supabase.from(config.table as any).delete().eq("id", id); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [`admin-${config.table}`] }); toast.success("Deleted"); },
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      await supabase.from(config.table as any).update({ is_visible: visible }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [`admin-${config.table}`] }),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{editing.id ? "Edit" : "New"} {config.title}</h1>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm font-medium rounded-lg bg-muted hover:bg-muted/80 transition-all">Cancel</button>
            <button onClick={() => saveMut.mutate()} disabled={saveMut.isPending} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 disabled:opacity-50">
              <Save size={14} /> Save
            </button>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 space-y-4 max-w-2xl">
          {config.fields.map(({ label, field, type, textarea, options }) => (
            <div key={field}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
              {options ? (
                <select value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : textarea ? (
                <textarea value={editing[field] || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} rows={3} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              ) : (
                <input type={type || "text"} value={editing[field] ?? ""} onChange={(e) => setEditing({ ...editing, [field]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              )}
            </div>
          ))}
          {"is_visible" in config.defaultItem && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.is_visible ?? true} onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })} className="rounded" />
              <span className="text-sm">Visible</span>
            </label>
          )}
          {"is_featured" in config.defaultItem && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.is_featured ?? false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="rounded" />
              <span className="text-sm">Featured</span>
            </label>
          )}
          {"is_current" in config.defaultItem && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.is_current ?? false} onChange={(e) => setEditing({ ...editing, is_current: e.target.checked })} className="rounded" />
              <span className="text-sm">Current</span>
            </label>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{config.title}</h1>
        <button onClick={() => setEditing({ ...config.defaultItem, display_order: items?.length ?? 0 })} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 active:scale-[0.97] transition-all">
          <Plus size={14} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {(items ?? []).map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-all">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item[config.fields[0].field]}</p>
              {config.fields[1] && <p className="text-xs text-muted-foreground truncate">{item[config.fields[1].field]}</p>}
            </div>
            <div className="flex items-center gap-1">
              {"is_visible" in item && (
                <button onClick={() => toggleVisibility.mutate({ id: item.id, visible: !item.is_visible })} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                  {item.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              )}
              <button onClick={() => setEditing({ ...item })} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-all">Edit</button>
              <button onClick={() => { if (confirm("Delete?")) deleteMut.mutate(item.id); }} className="p-2 rounded-lg text-destructive hover:bg-destructive/8 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {(items ?? []).length === 0 && <p className="text-center text-muted-foreground py-10">No items yet.</p>}
      </div>
    </div>
  );
}
