import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="w-full py-4 bg-blue-900 dark:bg-blue-400 text-gray-50 dark:text-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-md">
          <nav className="container mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">
              Knagai Portal
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
