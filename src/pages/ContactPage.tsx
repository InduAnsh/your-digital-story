import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import { useProfile, useSocialLinks, useContactSettings } from "@/hooks/usePortfolioData";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Calendar } from "lucide-react";
import { toast } from "sonner";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
  email: <Mail size={18} />,
};

export default function ContactPage() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const { data: settings } = useContactSettings();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error(settings?.error_message || "Something went wrong.");
    } else {
      toast.success(settings?.success_message || "Message sent!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <PublicLayout>
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <RevealSection>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Contact</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance leading-[1.1]">Get in Touch</h1>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mt-10">
            {/* Info */}
            <RevealSection delay={80} className="md:col-span-2">
              <div className="space-y-6">
                {settings?.show_email !== false && profile?.email && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/8 text-primary"><Mail size={18} /></div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-sm font-medium hover:text-primary transition-colors">{profile.email}</a>
                    </div>
                  </div>
                )}
                {settings?.show_phone !== false && profile?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/8 text-primary"><Phone size={18} /></div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                      <a href={`tel:${profile.phone}`} className="text-sm font-medium hover:text-primary transition-colors">{profile.phone}</a>
                    </div>
                  </div>
                )}
                {settings?.show_location !== false && profile?.location && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/8 text-primary"><MapPin size={18} /></div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                      <p className="text-sm font-medium">{profile.location}</p>
                    </div>
                  </div>
                )}

                {settings?.scheduling_link && (
                  <a
                    href={settings.scheduling_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-medium rounded-lg text-sm hover:bg-muted/80 transition-colors"
                  >
                    <Calendar size={14} /> Schedule a call
                  </a>
                )}

                {(socialLinks ?? []).length > 0 && (
                  <div className="pt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Social</p>
                    <div className="flex gap-2">
                      {(socialLinks ?? []).map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                          aria-label={link.platform}
                        >
                          {socialIconMap[link.platform.toLowerCase()] || <ExternalLink size={18} />}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealSection>

            {/* Form */}
            <RevealSection delay={160} className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                      maxLength={255}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                    maxLength={200}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    maxLength={2000}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </RevealSection>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
