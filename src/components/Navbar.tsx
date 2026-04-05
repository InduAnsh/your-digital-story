import { Link, useLocation } from "react-router-dom";
import { useNavItems, useProfile, useSiteSettings } from "@/hooks/usePortfolioData";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: navItems } = useNavItems();
  const { data: profile } = useProfile();
  const { data: settings } = useSiteSettings();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const visibleItems = (navItems ?? []).filter((n) => n.is_visible);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-18">
        <Link to="/" className="font-bold text-lg tracking-tight text-foreground">
          {settings?.site_title || profile?.full_name || "Portfolio"}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {visibleItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary animate-scale-in" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border animate-fade-up">
          <div className="container py-4 flex flex-col gap-1">
            {visibleItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
