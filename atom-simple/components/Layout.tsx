import Link from 'next/link'
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
};

export default Layout;



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <Link href="/" className="text-2xl font-bold">
            Atombooks Website
          </Link>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/auth">Sign In</Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-200 p-4 text-center">
        © 2024 All rights reserved.
      </footer>
    </div>
  )
}