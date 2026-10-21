import { projects } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

interface ProjectCardsProps {
  limit?: number;
}

export default function ProjectCards({ limit }: ProjectCardsProps) {
  const recentProjects = [...projects].reverse();
  const visibleProjects = limit
    ? recentProjects.slice(0, limit)
    : recentProjects;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {visibleProjects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
