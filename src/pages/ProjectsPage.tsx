import PublicLayout from "@/components/PublicLayout";
import RevealSection from "@/components/RevealSection";
import { useProjects } from "@/hooks/usePortfolioData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, ExternalLink, Github, Calendar, Users } from "lucide-react";

export default function ProjectsPage() {
  const { data: projects } = useProjects();
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const allTags = Array.from(new Set((projects ?? []).flatMap((p) => p.tags ?? [])));

  const filtered = (projects ?? []).filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.short_description ?? "").toLowerCase().includes(search.toLowerCase());
    const matchTag = !tagFilter || (p.tags ?? []).includes(tagFilter);
    return matchSearch && matchTag;
  });

  const featured = filtered.filter((p) => p.is_featured);
  const rest = filtered.filter((p) => !p.is_featured);

  return (
    <PublicLayout>
      <section className="pt-32 pb-20">
        <div className="container">
          <RevealSection>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance leading-[1.1]">Projects</h1>
            <p className="text-muted-foreground max-w-xl mb-10">A collection of engineering projects, from concept through testing and iteration.</p>
          </RevealSection>

          <RevealSection delay={80}>
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTagFilter(null)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      !tagFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {allTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        tag === tagFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </RevealSection>

          {featured.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold mb-6">Featured</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((project, i) => (
                  <RevealSection key={project.id} delay={i * 80}>
                    <ProjectCard project={project} />
                  </RevealSection>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <RevealSection key={project.id} delay={i * 60}>
                <ProjectCard project={project} />
              </RevealSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No projects found.</p>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col">
      <Link to={`/projects/${project.slug}`}>
        {project.image_url && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
          </div>
        )}
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        {/* Context tag */}
        {project.project_context && project.project_context !== "personal" && (
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-primary/8 text-primary w-fit mb-2">
            {project.project_context.replace(/_/g, " ")}
          </span>
        )}
        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors">{project.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.short_description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
          {project.project_date && (
            <span className="inline-flex items-center gap-1"><Calendar size={11} /> {project.project_date}</span>
          )}
          {project.team_size && (
            <span className="inline-flex items-center gap-1"><Users size={11} /> {project.is_individual ? "Individual" : `Team of ${project.team_size}`}</span>
          )}
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">{tag}</span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center gap-3">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
            View Details →
          </Link>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <ExternalLink size={12} /> Live
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <Github size={12} /> Code
            </a>
          )}
          {project.status && (
            <span className="ml-auto text-xs text-muted-foreground capitalize">{project.status}</span>
          )}
        </div>
      </div>
    </div>
  );
}
