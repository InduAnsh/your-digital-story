import { Link } from "react-router-dom";
import { useFooterContent, useNavItems, useSocialLinks, useProfile } from "@/hooks/usePortfolioData";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
  email: <Mail size={18} />,
};

export default function Footer() {
  const { data: footer } = useFooterContent();
  const { data: navItems } = useNavItems();
  const { data: socialLinks } = useSocialLinks();
  const { data: profile } = useProfile();

  const visibleNav = (navItems ?? []).filter((n) => n.is_visible);

  return (
    <footer className="bg-hero text-hero-foreground/70">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-bold text-lg text-hero-foreground mb-3">
              {profile?.full_name || "Portfolio"}
            </p>
            {footer?.tagline && (
              <p className="text-sm leading-relaxed">{footer.tagline}</p>
            )}
          </div>

          {/* Nav Links */}
          {footer?.show_nav_links && visibleNav.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-hero-foreground/40 mb-4">
                Pages
              </p>
              <div className="flex flex-col gap-2">
                {visibleNav.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="text-sm hover:text-hero-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {footer?.show_social_links && (socialLinks ?? []).length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-hero-foreground/40 mb-4">
                Connect
              </p>
              <div className="flex gap-3">
                {(socialLinks ?? []).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-hero-foreground/5 hover:bg-hero-foreground/10 text-hero-foreground/60 hover:text-hero-foreground transition-all"
                    aria-label={link.platform}
                  >
                    {socialIconMap[link.platform.toLowerCase()] || <ExternalLink size={18} />}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-hero-foreground/10 text-sm text-center">
          {footer?.copyright_text || `© ${new Date().getFullYear()} All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
