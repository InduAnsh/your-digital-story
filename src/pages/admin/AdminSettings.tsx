import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const qc = useQueryClient();
  const { data: settings } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: async () => { const { data } = await supabase.from("site_settings").select("*").limit(1).single(); return data; },
  });
  const { data: footer } = useQuery({
    queryKey: ["admin-footer"],
    queryFn: async () => { const { data } = await supabase.from("footer_content").select("*").limit(1).single(); return data; },
  });
  const { data: contactSettings } = useQuery({
    queryKey: ["admin-contact-settings"],
    queryFn: async () => { const { data } = await supabase.from("contact_settings").select("*").limit(1).single(); return data; },
  });

  const [siteForm, setSiteForm] = useState({ site_title: "", site_description: "", logo_url: "", favicon_url: "" });
  const [footerForm, setFooterForm] = useState({ copyright_text: "", tagline: "", show_social_links: true, show_nav_links: true });
  const [contactForm, setContactForm] = useState({ success_message: "", error_message: "", scheduling_link: "", show_phone: true, show_email: true, show_location: true });

  useEffect(() => { if (settings) setSiteForm({ site_title: settings.site_title || "", site_description: settings.site_description || "", logo_url: settings.logo_url || "", favicon_url: settings.favicon_url || "" }); }, [settings]);
  useEffect(() => { if (footer) setFooterForm({ copyright_text: footer.copyright_text || "", tagline: footer.tagline || "", show_social_links: footer.show_social_links ?? true, show_nav_links: footer.show_nav_links ?? true }); }, [footer]);
  useEffect(() => { if (contactSettings) setContactForm({ success_message: contactSettings.success_message || "", error_message: contactSettings.error_message || "", scheduling_link: contactSettings.scheduling_link || "", show_phone: contactSettings.show_phone ?? true, show_email: contactSettings.show_email ?? true, show_location: contactSettings.show_location ?? true }); }, [contactSettings]);

  const saveSite = useMutation({
    mutationFn: async () => {
      if (settings?.id) { await supabase.from("site_settings").update(siteForm).eq("id", settings.id); }
      else { await supabase.from("site_settings").insert(siteForm); }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-site-settings"] }); qc.invalidateQueries({ queryKey: ["site_settings"] }); toast.success("Site settings saved!"); },
  });

  const saveFooter = useMutation({
    mutationFn: async () => {
      if (footer?.id) { await supabase.from("footer_content").update(footerForm).eq("id", footer.id); }
      else { await supabase.from("footer_content").insert(footerForm); }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-footer"] }); qc.invalidateQueries({ queryKey: ["footer_content"] }); toast.success("Footer saved!"); },
  });

  const saveContact = useMutation({
    mutationFn: async () => {
      if (contactSettings?.id) { await supabase.from("contact_settings").update(contactForm).eq("id", contactSettings.id); }
      else { await supabase.from("contact_settings").insert(contactForm); }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-contact-settings"] }); qc.invalidateQueries({ queryKey: ["contact_settings"] }); toast.success("Contact settings saved!"); },
  });

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Site Settings</h2>
          <button onClick={() => saveSite.mutate()} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90"><Save size={14} /> Save</button>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          {Object.entries(siteForm).map(([key, val]) => (
            <div key={key}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block capitalize">{key.replace(/_/g, " ")}</label>
              <input value={val} onChange={(e) => setSiteForm({ ...siteForm, [key]: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Footer</h2>
          <button onClick={() => saveFooter.mutate()} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90"><Save size={14} /> Save</button>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Copyright Text</label><input value={footerForm.copyright_text} onChange={(e) => setFooterForm({ ...footerForm, copyright_text: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tagline</label><input value={footerForm.tagline} onChange={(e) => setFooterForm({ ...footerForm, tagline: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={footerForm.show_social_links} onChange={(e) => setFooterForm({ ...footerForm, show_social_links: e.target.checked })} className="rounded" /><span className="text-sm">Show social links</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={footerForm.show_nav_links} onChange={(e) => setFooterForm({ ...footerForm, show_nav_links: e.target.checked })} className="rounded" /><span className="text-sm">Show nav links</span></label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Contact Settings</h2>
          <button onClick={() => saveContact.mutate()} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90"><Save size={14} /> Save</button>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Success Message</label><input value={contactForm.success_message} onChange={(e) => setContactForm({ ...contactForm, success_message: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Error Message</label><input value={contactForm.error_message} onChange={(e) => setContactForm({ ...contactForm, error_message: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Scheduling Link</label><input value={contactForm.scheduling_link} onChange={(e) => setContactForm({ ...contactForm, scheduling_link: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={contactForm.show_email} onChange={(e) => setContactForm({ ...contactForm, show_email: e.target.checked })} className="rounded" /><span className="text-sm">Show email</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={contactForm.show_phone} onChange={(e) => setContactForm({ ...contactForm, show_phone: e.target.checked })} className="rounded" /><span className="text-sm">Show phone</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={contactForm.show_location} onChange={(e) => setContactForm({ ...contactForm, show_location: e.target.checked })} className="rounded" /><span className="text-sm">Show location</span></label>
          </div>
        </div>
      </div>
    </div>
  );
}
