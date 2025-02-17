import "./globals.css";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={montserrat.className}>
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <header className="w-full py-4 bg-blue-900 dark:bg-blue-400 text-gray-50 dark:text-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
              style={{ width: "white" }}
            >
              <Image
                style={{ filter: "invert(100%)" }}
                src="/icon.png" // ロゴのパス
                alt="Knagai Portal Logo"
                width={32} // 適宜変更
                height={32} // 適宜変更
              />
              <span className="text-xl font-bold">Knagai Portal</span>
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">
                Profile
              </Link>
              <Link href="/portfolio" className="hover:underline">
                Portfolio
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
