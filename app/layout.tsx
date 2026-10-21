import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "knagai portal — Software Engineer", template: "%s — knagai portal" },
  description: "BtoB決済プロダクトの技術選定と立ち上げに取り組むソフトウェアエンジニアのポートフォリオ。",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 backdrop-blur-md">
          <nav className="site-shell flex h-20 items-center justify-between" aria-label="メインナビゲーション">
            <Link href="/" className="group flex items-center gap-3 font-extrabold tracking-[-0.04em]">
              <Image
                src="https://github.com/knagai16.png"
                alt="knagai GitHub avatar"
                width={36}
                height={36}
                className="rounded-full border border-ink/15 group-hover:rotate-6"
                priority
              />
              <span>knagai portal</span>
            </Link>
            <div className="flex items-center gap-5 text-sm font-bold sm:gap-8">
              <Link href="/portfolio" className="hover:opacity-55">Work</Link>
              <Link href="/contact" className="rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-blue-900">Contact</Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-ink/15 py-8">
          <div className="site-shell flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} knagai portal</p>
            <p>Designed & built in Tokyo.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
