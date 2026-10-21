import type { Metadata } from "next";
import ContactFormWrapper from "@/components/contact/ContactFormWrapper";
import { socialLinks } from "@/data/socials";

export const metadata: Metadata = { title: "Contact", description: "knagai portalへのお問い合わせ。" };

export default function Contact() {
  return (
    <div className="site-shell grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div>
        <p className="eyebrow mb-7">Get in touch</p>
        <h1 className="display text-[clamp(4rem,9vw,7rem)]">LET’S<br />TALK<span className="text-accent-strong">.</span></h1>
        <p className="mt-8 max-w-md text-lg leading-8 text-muted">プロダクト開発や技術に関するご相談など、お気軽にご連絡ください。</p>
        <div className="mt-10 flex flex-col gap-3 text-sm font-bold">
          <a className="arrow-link w-fit hover:opacity-55" href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="arrow-link w-fit hover:opacity-55" href={socialLinks.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="arrow-link w-fit hover:opacity-55" href={socialLinks.note} target="_blank" rel="noreferrer">note</a>
        </div>
      </div>
      <ContactFormWrapper />
    </div>
  );
}
