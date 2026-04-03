import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import { useProfile, useEducation, useCertifications, useInterests } from "@/hooks/usePortfolioData";
import { MapPin, Download, Compass } from "lucide-react";

export default function AboutPage() {
  const { data: profile } = useProfile();
  const { data: education } = useEducation();
  const { data: certifications } = useCertifications();
  const { data: interests } = useInterests();
  const p = profile as any;

  return (
    <PublicLayout>
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl">
            <RevealSection>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">About</p>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance leading-[1.1]">
                {profile?.full_name || "About Me"}
              </h1>
            </RevealSection>

            <RevealSection delay={80}>
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                {profile?.profile_image_url && (
                  <img
                    src={profile.profile_image_url}
                    alt={profile.full_name || "Profile"}
                    className="w-48 h-48 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                  />
                )}
                <div>
                  {profile?.title && (
                    <p className="text-lg font-medium text-primary mb-2">{profile.title}</p>
                  )}
                  {profile?.location && (
                    <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                      <MapPin size={14} /> {profile.location}
                    </p>
                  )}
                  {profile?.full_bio && (
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-pretty">{profile.full_bio}</p>
                  )}
                </div>
              </div>
            </RevealSection>

            {/* Engineering Interests */}
            {p?.engineering_interests && (
              <RevealSection delay={120}>
                <div className="p-6 bg-card rounded-xl border border-border mb-8">
                  <h2 className="text-lg font-bold mb-3">Engineering Interests</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{p.engineering_interests}</p>
                </div>
              </RevealSection>
            )}

            {/* Seeking Statement */}
            {p?.seeking_statement && (
              <RevealSection delay={140}>
                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass size={16} className="text-primary" />
                    <h2 className="text-lg font-bold">What I'm Looking For</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{p.seeking_statement}</p>
                  {p.preferred_roles && (
                    <p className="text-sm text-muted-foreground mt-3 italic">{p.preferred_roles}</p>
                  )}
                </div>
              </RevealSection>
            )}

            {profile?.resume_url && (
              <RevealSection delay={160}>
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 active:scale-[0.97] transition-all mb-12"
                >
                  <Download size={16} /> Download Resume
                </a>
              </RevealSection>
            )}
          </div>

          {/* Education */}
          {(education ?? []).length > 0 && (
            <RevealSection>
              <div className="max-w-3xl mt-16">
                <h2 className="text-2xl font-bold mb-8">Education</h2>
                <div className="space-y-4">
                  {(education ?? []).map((edu) => (
                    <div key={edu.id} className="p-5 bg-card rounded-xl border border-border">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution} · {edu.field_of_study}</p>
                      <p className="text-xs text-muted-foreground mt-1">{edu.start_year} — {edu.end_year}</p>
                      {edu.description && <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          )}

          {/* Interests */}
          {(interests ?? []).length > 0 && (
            <RevealSection>
              <div className="max-w-3xl mt-16">
                <h2 className="text-2xl font-bold mb-8">Areas of Technical Interest</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(interests ?? []).map((int: any) => (
                    <div key={int.id} className="p-4 bg-card rounded-xl border border-border text-center">
                      <h3 className="font-semibold text-sm">{int.title}</h3>
                      {int.description && <p className="text-xs text-muted-foreground mt-1">{int.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          )}

          {/* Certifications */}
          {(certifications ?? []).length > 0 && (
            <RevealSection>
              <div className="max-w-3xl mt-16">
                <h2 className="text-2xl font-bold mb-8">Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(certifications ?? []).map((cert) => (
                    <div key={cert.id} className="p-5 bg-card rounded-xl border border-border">
                      <h3 className="font-semibold text-sm">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.issue_date}</p>
                      {cert.credential_url && (
                        <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary mt-2 inline-block hover:underline">
                          View credential →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
