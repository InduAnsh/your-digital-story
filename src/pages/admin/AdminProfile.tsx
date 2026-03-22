import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AdminProfile() {
  const qc = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const { data } = await supabase.from("profile").select("*").limit(1).single();
      return data;
    },
  });

  const [form, setForm] = useState({
    full_name: "", title: "", short_intro: "", full_bio: "", profile_image_url: "",
    resume_url: "", location: "", email: "", phone: "", availability_status: "available",
    availability_text: "", years_experience: 0, projects_completed: 0,
  });

  useEffect(() => {
    if (profile) setForm({
      full_name: profile.full_name || "", title: profile.title || "", short_intro: profile.short_intro || "",
      full_bio: profile.full_bio || "", profile_image_url: profile.profile_image_url || "",
      resume_url: profile.resume_url || "", location: profile.location || "", email: profile.email || "",
      phone: profile.phone || "", availability_status: profile.availability_status || "available",
      availability_text: profile.availability_text || "", years_experience: profile.years_experience || 0,
      projects_completed: profile.projects_completed || 0,
    });
  }, [profile]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (profile?.id) {
        await supabase.from("profile").update(form).eq("id", profile.id);
      } else {
        await supabase.from("profile").insert(form);
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-profile"] }); qc.invalidateQueries({ queryKey: ["profile"] }); toast.success("Profile saved!"); },
    onError: () => toast.error("Failed to save."),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const Field = ({ label, field, type = "text", textarea = false }: { label: string; field: keyof typeof form; type?: string; textarea?: boolean }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      {textarea ? (
        <textarea value={String(form[field])} onChange={(e) => setForm({ ...form, [field]: e.target.value })} rows={4} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
      ) : (
        <input type={type} value={String(form[field])} onChange={(e) => setForm({ ...form, [field]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button onClick={() => mutation.mutate()} disabled={mutation.isPending} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50">
          <Save size={14} /> {mutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" field="full_name" />
          <Field label="Title / Role" field="title" />
        </div>
        <Field label="Short Intro" field="short_intro" textarea />
        <Field label="Full Bio" field="full_bio" textarea />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Profile Image URL" field="profile_image_url" />
          <Field label="Resume URL" field="resume_url" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Email" field="email" />
          <Field label="Phone" field="phone" />
          <Field label="Location" field="location" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Availability Status</label>
            <select value={form.availability_status} onChange={(e) => setForm({ ...form, availability_status: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <Field label="Availability Text" field="availability_text" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Years of Experience" field="years_experience" type="number" />
          <Field label="Projects Completed" field="projects_completed" type="number" />
        </div>
      </div>
    </div>
  );
}
