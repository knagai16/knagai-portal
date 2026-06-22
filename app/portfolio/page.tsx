import type { Metadata } from "next";
import ProjectCards from "@/components/portfolio/ProjectCards";

export const metadata: Metadata = { title: "Work", description: "これまでに携わったプロジェクトと開発経験。" };

export default function Portfolio() {
  return (
    <div className="site-shell py-16 sm:py-24">
      <div className="mb-14 border-b border-ink/20 pb-12 sm:mb-20">
        <p className="eyebrow mb-7">Experience & projects</p>
        <h1 className="display text-[clamp(4rem,11vw,8rem)]">SELECTED<br />WORK<span className="text-accent-strong">.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">大規模Webサービスの開発・運用から、会計プロダクトの開発リード、BtoB決済システムの0→1立ち上げまで。これまでに携わった仕事を紹介します。</p>
      </div>
      <ProjectCards />
    </div>
  );
}
