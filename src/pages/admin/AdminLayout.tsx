import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, User, FolderKanban, Briefcase, Award, 
  MessageSquare, Settings, Globe, Navigation, FileText, 
  LogOut, Star, GraduationCap, Image, Menu, X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Profile", path: "/admin/profile", icon: User },
  { label: "Hero Section", path: "/admin/hero", icon: Globe },
  { label: "Projects", path: "/admin/projects", icon: FolderKanban },
  { label: "Experience", path: "/admin/experience", icon: Briefcase },
  { label: "Skills", path: "/admin/skills", icon: Award },
  { label: "Education", path: "/admin/education", icon: GraduationCap },
  { label: "Testimonials", path: "/admin/testimonials", icon: Star },
  { label: "Navigation", path: "/admin/navigation", icon: Navigation },
  { label: "Social Links", path: "/admin/social-links", icon: Globe },
  { label: "Sections", path: "/admin/sections", icon: FileText },
  { label: "Messages", path: "/admin/messages", icon: MessageSquare },
  { label: "Media", path: "/admin/media", icon: Image },
  { label: "Site Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface-sunken">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link to="/admin" className="font-bold text-lg">Admin Panel</Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  active ? "bg-primary/8 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
            <Globe size={16} /> View Site
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/8 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/20 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-xl border-b border-border h-14 flex items-center px-5">
          <button className="md:hidden mr-3" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </header>
        <div className="p-5 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
