import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import { useExperiences } from "@/hooks/usePortfolioData";

export default function ExperiencePage() {
  const { data: experiences } = useExperiences();

  const grouped = {
    work: (experiences ?? []).filter((e) => e.experience_type === "work"),
    internship: (experiences ?? []).filter((e) => e.experience_type === "internship"),
    volunteer: (experiences ?? []).filter((e) => e.experience_type === "volunteer"),
    leadership: (experiences ?? []).filter((e) => e.experience_type === "leadership"),
  };

  return (
    <PublicLayout>
      <section className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <RevealSection>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Career</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance leading-[1.1]">Experience</h1>
          </RevealSection>

          {Object.entries(grouped).map(([type, items]) =>
            items.length > 0 ? (
              <RevealSection key={type}>
                <div className="mb-12">
                  <h2 className="text-lg font-semibold capitalize mb-6">{type}</h2>
                  <div className="relative pl-6 border-l-2 border-border space-y-8">
                    {items.map((exp, i) => (
                      <RevealSection key={exp.id} delay={i * 60}>
                        <div className="relative">
                          <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                          <div className="p-5 bg-card rounded-xl border border-border">
                            <div className="flex items-start gap-3">
                              {exp.org_logo_url && (
                                <img src={exp.org_logo_url} alt={exp.organization} className="w-10 h-10 rounded-lg object-contain flex-shrink-0" />
                              )}
                              <div>
                                <h3 className="font-semibold">{exp.role}</h3>
                                <p className="text-sm text-muted-foreground">{exp.organization}{exp.location ? ` · ${exp.location}` : ""}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{exp.start_date} — {exp.is_current ? "Present" : exp.end_date}</p>
                              </div>
                            </div>
                            {exp.description && (
                              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>
                            )}
                            {exp.achievements && exp.achievements.length > 0 && (
                              <ul className="mt-3 space-y-1">
                                {exp.achievements.map((a, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span> {a}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </RevealSection>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ) : null
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
