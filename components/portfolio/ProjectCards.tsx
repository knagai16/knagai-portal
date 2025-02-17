import ProjectCard from "./ProjectCard";

export interface Project {
  title: string;
  period: string;
  role: string;
  technologies: string[];
  description: string;
}

const projects: Project[] = [
  {
    title: "くじ引きサービス",
    period: "2018年6月〜2021年11月",
    role: "バックエンドエンジニア",
    technologies: ["Java", "Spring Boot", "Kubernetes"],
    description:
      "くじ引きサービスの新機能開発・運用を担当。Spring Boot（Java）を用いた API 設計・開発や、Kubernetesを活用したマイクロサービスの運用を行う。",
  },
  {
    title: "クラウド会計ソフト",
    period: "2021年12月〜2025年2月",
    role: "フルスタックエンジニア",
    technologies: [
      "Ruby",
      "React",
      "TypeScript",
      "AWS EKS",
      "AWS Lambda",
      "AWS S3",
    ],
    description:
      "クラウド会計ソフトの新機能開発・保守運用を担当。Ruby on Rails、 React + TypeScript を用いた開発、gRPCを用いたマイクロサービス構築を行う。",
  },
  {
    title: "ポートフォリオサイト",
    period: "2025年2月〜現在",
    role: "個人開発",
    technologies: ["React", "TypeScript"],
    description:
      "個人の活動でポートフォリオサイトを作成・保守運用を担当。React + TypeScript を用いて開発。",
  },
];

const ProjectCards = () => {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </>
  );
};

export default ProjectCards;
