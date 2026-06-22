import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowDown, HiArrowUpRight } from "react-icons/hi2";
import ProjectCards from "@/components/portfolio/ProjectCards";
import { capabilities } from "@/data/portfolio";
import { socialLinks } from "@/data/socials";

export default function Home() {
  return (
    <>
      <section className="site-shell relative min-h-[calc(100svh-5rem)] py-14 sm:py-24">
        <div className="eyebrow mb-10">Software Engineer · Tokyo</div>
        <h1 className="display max-w-5xl text-[clamp(4rem,12vw,9.5rem)]">
          BUILDING<br />PRODUCTS<span className="text-accent-strong">.</span>
        </h1>
        <div className="mt-12 grid gap-10 border-t border-ink/20 pt-8 md:grid-cols-[1fr_1fr]">
          <p className="max-w-xl text-xl font-bold leading-relaxed sm:text-2xl">
            0→1のプロダクトを技術選定からつくる、<br className="hidden sm:block" />ソフトウェアエンジニアです。
          </p>
          <div className="flex flex-col items-start gap-6 md:items-end">
            <p className="max-w-md text-base leading-8 text-muted">
              現在はBtoB決済プロダクトの立ち上げを担当。技術選定からバックエンド、フロントエンド、インフラまで横断して設計・開発しています。
            </p>
            <div className="flex gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 hover:bg-ink hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href={socialLinks.linkedIn}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 hover:bg-ink hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <a href="#about" aria-label="Aboutへスクロール" className="absolute bottom-8 right-0 hidden h-16 w-16 place-items-center rounded-full bg-accent text-xl hover:translate-y-1 sm:grid"><HiArrowDown /></a>
      </section>

      <section id="about" className="bg-ink py-24 text-paper sm:py-32">
        <div className="site-shell grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-accent">What I do</p>
            <p className="mt-8 max-w-xs text-slate-300">プロダクトのフェーズに合わせ、必要な場所へ入り込んで開発します。</p>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {capabilities.map((capability) => (
              <article key={capability.number} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-8">
                <span className="text-sm text-accent">{capability.number}</span>
                <h2 className="text-xl font-bold tracking-tight">{capability.title}</h2>
                <p className="leading-7 text-slate-300">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-24 sm:py-32">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div><p className="eyebrow mb-5">Selected work</p><h2 className="display text-5xl sm:text-7xl">EXPERIENCE</h2></div>
          <Link href="/portfolio" className="hidden items-center gap-2 font-bold hover:opacity-55 sm:flex">すべて見る <HiArrowUpRight /></Link>
        </div>
        <ProjectCards limit={2} />
        <Link href="/portfolio" className="mt-8 inline-flex items-center gap-2 font-bold sm:hidden">すべて見る <HiArrowUpRight /></Link>
      </section>

      <section className="grid-lines border-y border-ink/15 py-20 sm:py-28">
        <div className="site-shell panel flex flex-col items-start justify-between gap-10 p-8 sm:p-14 lg:flex-row lg:items-end">
          <div><p className="eyebrow mb-6">Contact</p><h2 className="display max-w-3xl text-5xl sm:text-7xl">LET’S BUILD<br />SOMETHING.</h2></div>
          <Link href="/contact" className="flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-extrabold hover:scale-[1.03]">お問い合わせ <HiArrowUpRight /></Link>
        </div>
      </section>
    </>
  );
}
