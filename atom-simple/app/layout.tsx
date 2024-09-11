import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Atom Simple - Video Content Platform",
  description: "Access exclusive video content on Atom Simple",
  keywords: ["video", "content", "streaming", "exclusive"],
  authors: [{ name: "Atom Simple Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="min-h-screen flex flex-col">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <nav className="container mx-auto px-4 py-4">
              {/* Add navigation menu items here */}
            </nav>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-6 text-center text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}