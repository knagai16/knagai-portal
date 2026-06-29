import type { Project } from "@/data/portfolio";
import TechTag from "./TechTag";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="panel group flex min-h-[25rem] flex-col p-7 hover:-translate-y-1 hover:shadow-card sm:p-9">
      <div className="mb-16 flex items-start justify-between gap-4">
        <span className="rounded-full border border-ink/20 px-3 py-1 text-xs font-bold">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-right text-sm text-muted">{project.period}</span>
      </div>
      <div className="mt-auto">
        <p className="mb-3 text-sm font-bold tracking-[0.08em] text-accent-strong">{project.role}</p>
        <h2 className="mb-5 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">{project.title}</h2>
        <p className="mb-7 max-w-2xl leading-7 text-muted">{project.description}</p>
        <div className="flex flex-wrap gap-2">{project.technologies.map((tech) => <TechTag key={tech} tech={tech} />)}</div>
      </div>
    </article>
  );
}
