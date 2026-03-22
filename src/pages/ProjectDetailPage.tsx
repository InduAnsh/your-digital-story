import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import { useProjectBySlug, useProjectMedia, useProjects } from "@/hooks/usePortfolioData";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useProjectBySlug(slug || "");
  const { data: media } = useProjectMedia(project?.id || "");
  const { data: allProjects } = useProjects();

  const related = (allProjects ?? []).filter((p) => p.id !== project?.id && (p.tags ?? []).some((t) => (project?.tags ?? []).includes(t))).slice(0, 3);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-20 container">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded-xl" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!project) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-20 container text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/projects" className="text-primary hover:underline">← Back to projects</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Banner */}
      {project.banner_url && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img src={project.banner_url} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      <section className={`${project.banner_url ? "pt-12" : "pt-32"} pb-20`}>
        <div className="container max-w-4xl">
          <RevealSection>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={14} /> Back to projects
            </Link>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-balance leading-[1.1]">{project.title}</h1>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-lg bg-muted text-muted-foreground">{tag}</span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-10">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:opacity-90 active:scale-[0.97] transition-all">
                  <Globe size={14} /> Live Site
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-medium rounded-lg text-sm hover:bg-muted active:scale-[0.97] transition-all">
                  <ExternalLink size={14} /> Demo
                </a>
              )}
              {project.repo_url && (
                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-medium rounded-lg text-sm hover:bg-muted active:scale-[0.97] transition-all">
                  <Github size={14} /> Source Code
                </a>
              )}
            </div>
          </RevealSection>

          {project.image_url && !project.banner_url && (
            <RevealSection delay={80}>
              <img src={project.image_url} alt={project.title} className="w-full rounded-xl mb-12 shadow-lg" />
            </RevealSection>
          )}

          {/* Content sections */}
          <div className="prose prose-slate max-w-none space-y-10">
            {project.full_description && (
              <RevealSection>
                <div>
                  <h2 className="text-xl font-bold mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.full_description}</p>
                </div>
              </RevealSection>
            )}
            {project.problem && (
              <RevealSection>
                <div>
                  <h2 className="text-xl font-bold mb-3">The Problem</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.problem}</p>
                </div>
              </RevealSection>
            )}
            {project.solution && (
              <RevealSection>
                <div>
                  <h2 className="text-xl font-bold mb-3">The Solution</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.solution}</p>
                </div>
              </RevealSection>
            )}
            {project.process && (
              <RevealSection>
                <div>
                  <h2 className="text-xl font-bold mb-3">Process</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.process}</p>
                </div>
              </RevealSection>
            )}
            {project.tools && project.tools.length > 0 && (
              <RevealSection>
                <div>
                  <h2 className="text-xl font-bold mb-3">Tools & Technologies</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-muted">{tool}</span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            )}
            {project.results && (
              <RevealSection>
                <div>
                  <h2 className="text-xl font-bold mb-3">Results</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.results}</p>
                </div>
              </RevealSection>
            )}
          </div>

          {/* Media Gallery */}
          {(media ?? []).length > 0 && (
            <RevealSection>
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(media ?? []).map((m) => (
                    <div key={m.id} className="rounded-xl overflow-hidden border border-border">
                      {m.media_type === "image" ? (
                        <img src={m.media_url} alt={m.caption || ""} className="w-full" />
                      ) : (
                        <video src={m.media_url} controls className="w-full" />
                      )}
                      {m.caption && <p className="text-xs text-muted-foreground p-3">{m.caption}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          )}

          {/* Related Projects */}
          {related.length > 0 && (
            <RevealSection>
              <div className="mt-16">
                <h2 className="text-xl font-bold mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <Link key={p.id} to={`/projects/${p.slug}`} className="group p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-all">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.short_description}</p>
                    </Link>
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
