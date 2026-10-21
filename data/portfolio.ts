export interface Project {
  title: string;
  period: string;
  role: string;
  technologies: readonly string[];
  description: string;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
}

export const capabilities: readonly Capability[] = [
  {
    number: "01",
    title: "Full-stack Development",
    description:
      "Go / Rubyによるバックエンドと、React / TypeScriptによるフロントエンドを一貫して設計・開発します。",
  },
  {
    number: "02",
    title: "Product Engineering",
    description:
      "技術選定から設計・実装・運用まで、プロダクトのフェーズに必要な技術課題を領域横断で解決します。",
  },
  {
    number: "03",
    title: "Platform & Security",
    description:
      "AWSやKubernetesを活用した基盤構築に加え、外部・銀行連携やISMSに対応するセキュリティ体制を整備します。",
  },
];

export const projects: readonly Project[] = [
  {
    title: "キャンペーンプラットフォーム",
    period: "2018.08 — 2021.11",
    role: "大手インターネット企業 · Lead Engineer",
    technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "MySQL", "Redis"],
    description:
      "スタンプ・クーポン・くじの開発と運用を担当。大規模キャンペーンの負荷検証やチューニングを経験し、後半は3〜4名のチームをリードして要件定義から保守まで推進。",
  },
  {
    title: "クラウド会計｜制度対応・機能開発",
    period: "2021.12 — 2023.04",
    role: "上場SaaS企業 · Software Engineer",
    technologies: ["Ruby", "Rails", "React", "TypeScript", "Golang", "MySQL"],
    description:
      "所得税・消費税の申告機能、ファイル管理、取引先管理の開発を担当。インボイス制度への対応を含む、会計プロダクトの制度対応と新機能開発に従事。",
  },
  {
    title: "クラウド会計｜開発リード",
    period: "2023.04 — 2025.02",
    role: "上場SaaS企業 · Software Engineer / Team Lead",
    technologies: ["Ruby", "Rails", "React", "TypeScript", "Golang"],
    description:
      "4〜8名のチームで開発リードと実装を担当。業務自動化に関する新機能開発、関連サービスの開発推進、Rubyのバージョンアップを含む基盤改善に取り組む。",
  },
  {
    title: "BtoB決済プロダクト｜0→1",
    period: "2025.03 — Present",
    role: "決済系スタートアップ · Software Engineer / Tech Lead",
    technologies: ["Golang", "React", "TypeScript", "AWS", "ISMS"],
    description:
      "BtoB決済システムとプロダクト開発組織を立ち上げ。プロダクトの技術選定から、バックエンド・フロントエンド設計、外部サービス・金融機関との連携、インフラ構築、ISMSに対応するセキュリティ体制の整備まで担当。",
  },
];
