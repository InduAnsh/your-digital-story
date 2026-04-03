import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import { useSkills, useCertifications } from "@/hooks/usePortfolioData";

const categoryOrder = ["engineering_software", "programming", "hardware_fabrication", "analysis_methods", "laboratory_tools", "soft_skills", "technical", "tools", "soft", "languages", "other"];

export default function SkillsPage() {
  const { data: skills } = useSkills();
  const { data: certifications } = useCertifications();

  const skillsByCategory = (skills ?? []).reduce((acc, skill) => {
    const cat = skill.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const sortedCategories = Object.entries(skillsByCategory).sort(([a], [b]) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const formatCategory = (cat: string) => cat.replace(/_/g, " ");

  return (
    <PublicLayout>
      <section className="pt-32 pb-20">
        <div className="container">
          <RevealSection>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Expertise</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance leading-[1.1]">Skills & Technologies</h1>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {sortedCategories.map(([category, items], i) => (
              <RevealSection key={category} delay={i * 80}>
                <div className="bg-card rounded-xl p-6 border border-border h-full">
                  <h3 className="font-semibold capitalize mb-5 text-sm uppercase tracking-wider text-muted-foreground">{formatCategory(category)}</h3>
                  <div className="space-y-3">
                    {(items ?? []).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground tabular-nums">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-700"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {(certifications ?? []).length > 0 && (
            <RevealSection>
              <div className="mt-20">
                <h2 className="text-2xl font-bold mb-8">Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(certifications ?? []).map((cert) => (
                    <div key={cert.id} className="p-5 bg-card rounded-xl border border-border">
                      <h3 className="font-semibold text-sm">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer} · {cert.issue_date}</p>
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
