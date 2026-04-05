import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import GridBackground from "@/components/GridBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import AnimatedSkillBar from "@/components/AnimatedSkillBar";
import TiltCard from "@/components/TiltCard";
import { useProfile, useHeroSection, useSocialLinks, useProjects, useSkills, useExperiences, useTestimonials, usePageSections, useTechnicalHighlights, useCoursework, useLeadershipActivities, useAchievements, useInterests } from "@/hooks/usePortfolioData";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github, Linkedin, Twitter, Mail, MapPin, Briefcase, Code2, Star, Download, Compass, Trophy, BookOpen, Users, Target, Zap, Cpu, Wrench, FlaskConical, Lightbulb } from "lucide-react";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
  email: <Mail size={18} />,
};

const highlightIcons = [Target, Zap, Cpu, Wrench, FlaskConical, Lightbulb];

export default function HomePage() {
  const { data: profile } = useProfile();
  const { data: hero } = useHeroSection();
  const { data: socialLinks } = useSocialLinks();
  const { data: projects } = useProjects(true);
  const { data: allProjects } = useProjects();
  const { data: skills } = useSkills();
  const { data: experiences } = useExperiences();
  const { data: testimonials } = useTestimonials(true);
  const { data: sections } = usePageSections("home");
  const { data: highlights } = useTechnicalHighlights();
  const { data: coursework } = useCoursework();
  const { data: leadership } = useLeadershipActivities();
  const { data: achievements } = useAchievements();
  const { data: interests } = useInterests();

  const isSectionVisible = (key: string) => {
    const s = (sections ?? []).find((sec) => sec.section_key === key);
    return s ? s.is_visible : true;
  };

  const getSectionData = (key: string) =>
    (sections ?? []).find((sec) => sec.section_key === key);

  const skillsByCategory = (skills ?? []).reduce((acc, skill) => {
    const cat = skill.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <PublicLayout>
      {/* Hero */}
      {hero?.is_visible !== false && (
        <section className="relative bg-hero text-hero-foreground pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <GridBackground />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              {profile?.availability_status === "available" && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6 animate-fade-up">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {profile.availability_text || "Available for work"}
                </div>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-5 animate-fade-up text-balance hero-gradient-text" style={{ animationDelay: "80ms" }}>
                {hero?.headline || profile?.full_name || "Welcome"}
              </h1>
              {hero?.subheadline && (
                <p className="text-xl md:text-2xl text-hero-foreground/60 font-medium mb-3 animate-fade-up" style={{ animationDelay: "160ms" }}>
                  {hero.subheadline}
                </p>
              )}
              {(hero?.description || profile?.short_intro) && (
                <p className="text-base md:text-lg text-hero-foreground/50 max-w-xl leading-relaxed mb-8 animate-fade-up text-pretty" style={{ animationDelay: "240ms" }}>
                  {hero?.description || profile?.short_intro}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: "320ms" }}>
                {hero?.primary_cta_text && (
                  <Link
                    to={hero.primary_cta_link || "/projects"}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 active:scale-[0.97] transition-all hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                  >
                    {hero.primary_cta_text}
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
                {hero?.secondary_cta_text && (
                  <Link
                    to={hero.secondary_cta_link || "/contact"}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-hero-foreground/20 text-hero-foreground font-semibold rounded-lg hover:bg-hero-foreground/5 active:scale-[0.97] transition-all"
                  >
                    {hero.secondary_cta_text}
                  </Link>
                )}
                {profile?.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-hero-foreground/20 text-hero-foreground font-semibold rounded-lg hover:bg-hero-foreground/5 active:scale-[0.97] transition-all"
                  >
                    <Download size={16} /> Resume
                  </a>
                )}
              </div>

              {(socialLinks ?? []).length > 0 && (
                <div className="flex gap-2 animate-fade-up" style={{ animationDelay: "400ms" }}>
                  {(socialLinks ?? []).map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg text-hero-foreground/40 hover:text-hero-foreground hover:bg-hero-foreground/5 transition-all hover:scale-110"
                      aria-label={link.platform}
                    >
                      {socialIconMap[link.platform.toLowerCase()] || <ExternalLink size={18} />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Stats Strip with animated counters */}
      {isSectionVisible("stats") && profile && (
        <RevealSection>
          <section className="border-b border-border bg-surface-sunken">
            <div className="container py-10 flex flex-wrap justify-center gap-12 md:gap-20">
              {[
                { label: "Projects", value: profile.projects_completed || 0, icon: <Code2 size={20} /> },
                { label: "Years Experience", value: profile.years_experience || 0, icon: <Briefcase size={20} /> },
                { label: "Skills", value: (skills ?? []).length, icon: <Star size={20} /> },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">{stat.icon}</div>
                  <div>
                    <p className="text-2xl font-bold">
                      <AnimatedCounter target={stat.value} suffix="+" />
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>
      )}

      {/* Technical Highlights */}
      {(highlights ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Core Strengths</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">Technical Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(highlights ?? []).map((h: any, i: number) => {
                  const Icon = highlightIcons[i % highlightIcons.length];
                  return (
                    <RevealSection key={h.id} delay={i * 60}>
                      <TiltCard className="h-full">
                        <div className="h-full p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.15)] transition-all duration-300 group">
                          <div className="p-2.5 rounded-lg bg-primary/8 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Icon size={20} />
                          </div>
                          <h3 className="font-semibold mb-2">{h.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                        </div>
                      </TiltCard>
                    </RevealSection>
                  );
                })}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Featured Projects */}
      {isSectionVisible("featured_projects") && (projects ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28 bg-surface-sunken">
            <div className="container">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                    {getSectionData("featured_projects")?.section_subtitle || "Portfolio"}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-balance">
                    {getSectionData("featured_projects")?.section_title || "Featured Projects"}
                  </h2>
                </div>
                <Link to="/projects" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group">
                  View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(projects ?? []).slice(0, 6).map((project, i) => (
                  <RevealSection key={project.id} delay={i * 80}>
                    <TiltCard className="h-full" intensity={5}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="group block h-full bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                      >
                        {project.image_url ? (
                          <div className="aspect-video overflow-hidden bg-muted relative">
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                            <Code2 size={32} className="text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            {(project as any).project_context && (project as any).project_context !== "personal" && (
                              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-primary/8 text-primary">
                                {(project as any).project_context.replace(/_/g, " ")}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.short_description}</p>
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">{tag}</span>
                              ))}
                            </div>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                            View Case Study <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>
                    </TiltCard>
                  </RevealSection>
                ))}
              </div>
              <div className="md:hidden mt-8 text-center">
                <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View all projects <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Experience Timeline */}
      {isSectionVisible("experience") && (experiences ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Career</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">
                {getSectionData("experience")?.section_title || "Experience"}
              </h2>
              <div className="max-w-2xl relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden md:block" />
                <div className="space-y-6">
                  {(experiences ?? []).slice(0, 4).map((exp, i) => (
                    <RevealSection key={exp.id} delay={i * 80}>
                      <div className="flex gap-4 group">
                        {/* Timeline dot */}
                        <div className="hidden md:flex flex-col items-center pt-5">
                          <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary group-hover:bg-primary transition-all duration-300 z-10" />
                        </div>
                        <div className="flex-1 p-5 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
                          <div className="flex items-start gap-3">
                            {exp.org_logo_url && (
                              <img src={exp.org_logo_url} alt={exp.organization} className="w-10 h-10 rounded-lg object-contain flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold">{exp.role}</h3>
                              <p className="text-sm text-muted-foreground">{exp.organization} · {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}</p>
                              {exp.description && (
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{exp.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealSection>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <Link to="/experience" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group">
                  View full experience <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Relevant Coursework */}
      {(coursework ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28 bg-surface-sunken">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Academic</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">Relevant Coursework</h2>
              <div className="flex flex-wrap gap-3">
                {(coursework ?? []).map((c: any, i: number) => (
                  <RevealSection key={c.id} delay={i * 40}>
                    <div className="group px-4 py-2.5 bg-card rounded-xl border border-border text-sm font-medium hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm transition-all duration-300 cursor-default">
                      <span className="group-hover:text-primary transition-colors">{c.name}</span>
                      {c.category && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">{c.category}</span>
                      )}
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Skills with animated bars */}
      {isSectionVisible("skills") && Object.keys(skillsByCategory).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                {getSectionData("skills")?.section_subtitle || "Expertise"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">
                {getSectionData("skills")?.section_title || "Skills & Technologies"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skillsByCategory).map(([category, items]) => (
                  <div key={category} className="bg-card rounded-xl p-6 border border-border hover:border-primary/10 transition-all duration-300">
                    <h3 className="font-semibold capitalize mb-5 text-sm uppercase tracking-wider text-muted-foreground">{category.replace(/_/g, " ")}</h3>
                    <div className="space-y-4">
                      {(items ?? []).map((skill) => (
                        <AnimatedSkillBar key={skill.id} name={skill.name} proficiency={skill.proficiency || 0} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Leadership / Activities */}
      {(leadership ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28 bg-surface-sunken">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Involvement</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">Leadership & Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {(leadership ?? []).map((item: any, i: number) => (
                  <RevealSection key={item.id} delay={i * 60}>
                    <div className="p-5 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-md bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Users size={14} />
                        </div>
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.organization}{item.start_date ? ` · ${item.start_date} — ${item.end_date || "Present"}` : ""}</p>
                      {item.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{item.description}</p>}
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Achievements / Awards */}
      {(achievements ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Recognition</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">Awards & Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                {(achievements ?? []).map((a: any, i: number) => (
                  <RevealSection key={a.id} delay={i * 60}>
                    <div className="p-5 bg-card rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                          <Trophy size={14} />
                        </div>
                        <h3 className="font-semibold text-sm">{a.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{a.issuer}{a.date ? ` · ${a.date}` : ""}</p>
                      {a.description && <p className="text-xs text-muted-foreground mt-2">{a.description}</p>}
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* About Preview */}
      {isSectionVisible("about") && profile?.short_intro && (
        <RevealSection>
          <section className="py-20 md:py-28 bg-surface-sunken">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">About</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                  {getSectionData("about")?.section_title || "A Little About Me"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">{profile.short_intro}</p>
                {profile.engineering_interests && (
                  <p className="text-sm text-muted-foreground italic mb-6">{profile.engineering_interests}</p>
                )}
                {profile.location && (
                  <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
                    <MapPin size={14} /> {profile.location}
                  </p>
                )}
                <div>
                  <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group">
                    Read more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* What I'm Looking For */}
      {profile?.seeking_statement && (
        <RevealSection>
          <section className="py-20 md:py-28">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary w-fit mx-auto mb-4">
                  <Compass size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">What I'm Looking For</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{profile.seeking_statement}</p>
                {profile.preferred_roles && (
                  <p className="text-sm text-muted-foreground italic">{profile.preferred_roles}</p>
                )}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Interests */}
      {(interests ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28 bg-surface-sunken">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Direction</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">Areas of Technical Interest</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
                {(interests ?? []).map((int: any, i: number) => (
                  <RevealSection key={int.id} delay={i * 60}>
                    <div className="p-5 bg-card rounded-xl border border-border text-center hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group">
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{int.title}</h3>
                      {int.description && <p className="text-xs text-muted-foreground">{int.description}</p>}
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Testimonials */}
      {isSectionVisible("testimonials") && (testimonials ?? []).length > 0 && (
        <RevealSection>
          <section className="py-20 md:py-28">
            <div className="container">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">
                {getSectionData("testimonials")?.section_title || "What People Say"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {(testimonials ?? []).slice(0, 4).map((t, i) => (
                  <RevealSection key={t.id} delay={i * 80}>
                    <div className="p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all duration-300 relative">
                      <div className="absolute top-4 right-5 text-5xl font-serif text-primary/10 leading-none">"</div>
                      <p className="text-foreground leading-relaxed mb-4 italic relative z-10">"{t.content}"</p>
                      <div className="flex items-center gap-3">
                        {t.author_image_url && (
                          <img src={t.author_image_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover ring-2 ring-border" />
                        )}
                        <div>
                          <p className="font-semibold text-sm">{t.author_name}</p>
                          <p className="text-xs text-muted-foreground">{t.author_title}{t.author_company ? ` at ${t.author_company}` : ""}</p>
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* Contact CTA */}
      {isSectionVisible("contact_cta") && (
        <RevealSection>
          <section className="relative py-20 md:py-28 bg-hero text-hero-foreground overflow-hidden">
            <GridBackground />
            <div className="container text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                {getSectionData("contact_cta")?.section_title || "Let's Work Together"}
              </h2>
              <p className="text-hero-foreground/50 mb-8 max-w-md mx-auto">
                {getSectionData("contact_cta")?.section_subtitle || "Available for internship and engineering opportunities."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 active:scale-[0.97] transition-all hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                >
                  Get in Touch <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                {profile?.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 border border-hero-foreground/20 text-hero-foreground font-semibold rounded-lg hover:bg-hero-foreground/5 active:scale-[0.97] transition-all"
                  >
                    <Download size={16} /> Resume
                  </a>
                )}
              </div>
            </div>
          </section>
        </RevealSection>
      )}
    </PublicLayout>
  );
}
