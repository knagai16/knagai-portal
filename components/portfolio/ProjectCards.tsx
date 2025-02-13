import ProjectCard from "./ProjectCard";

export interface Project {
  title: string;
  period: string;
  role: string;
  technologies: string[];
  description: string;
};

const projects: Project[] = [
  {
      title: "ポートフォリオサイト",
      period: "2025年2月〜現在",
      role: "個人開発",
      technologies: [
        "React",
        "TypeScript",
      ],
      description:
        "個人の活動でポートフォリオサイトを作成・保守運用を担当。React + TypeScript を用いて開発。",
    },
    {
        title: "業務サイト",
        period: "2020年1月〜現在",
        role: "バックエンドエンジニア",
        technologies: [
          "Ruby",
          "Kubernetes",
        ],
        description:
          "XX社の業務サイトのバックエンド開発をRuby on Railsで担当。またKubernetesでのデプロイも担当。",
      },
  ];

const ProjectCards = () => {
    return (
        <>
            {projects.map((project, index) => (
                <ProjectCard project={project} key={index} />
            ))}
        </>
    );
};

export default ProjectCards;
