import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, Briefcase, MessageSquare, Award, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { data: projectsCount } = useQuery({ queryKey: ["admin-projects-count"], queryFn: async () => { const { count } = await supabase.from("projects").select("*", { count: "exact", head: true }); return count ?? 0; }});
  const { data: experienceCount } = useQuery({ queryKey: ["admin-experience-count"], queryFn: async () => { const { count } = await supabase.from("experiences").select("*", { count: "exact", head: true }); return count ?? 0; }});
  const { data: skillsCount } = useQuery({ queryKey: ["admin-skills-count"], queryFn: async () => { const { count } = await supabase.from("skills").select("*", { count: "exact", head: true }); return count ?? 0; }});
  const { data: messagesCount } = useQuery({ queryKey: ["admin-messages-count"], queryFn: async () => { const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false); return count ?? 0; }});
  const { data: testimonialsCount } = useQuery({ queryKey: ["admin-testimonials-count"], queryFn: async () => { const { count } = await supabase.from("testimonials").select("*", { count: "exact", head: true }); return count ?? 0; }});

  const stats = [
    { label: "Projects", value: projectsCount ?? 0, icon: FolderKanban, link: "/admin/projects" },
    { label: "Experience", value: experienceCount ?? 0, icon: Briefcase, link: "/admin/experience" },
    { label: "Skills", value: skillsCount ?? 0, icon: Award, link: "/admin/skills" },
    { label: "Testimonials", value: testimonialsCount ?? 0, icon: Star, link: "/admin/testimonials" },
    { label: "Unread Messages", value: messagesCount ?? 0, icon: MessageSquare, link: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link} className="p-5 bg-card rounded-xl border border-border hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/8 text-primary"><stat.icon size={18} /></div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold tabular-nums">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="p-5 bg-card rounded-xl border border-border">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/projects" className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all">Add Project</Link>
          <Link to="/admin/profile" className="px-4 py-2 text-sm font-medium rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-all">Edit Profile</Link>
          <Link to="/" target="_blank" className="px-4 py-2 text-sm font-medium rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-all inline-flex items-center gap-1.5"><Eye size={14} /> View Site</Link>
        </div>
      </div>
    </div>
  );
}
