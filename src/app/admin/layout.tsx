import logo from "@/assets/logo.png";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import AdminNavbar from "./_components/AdminNavbar";

export default function AdminLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:flex p-3 text-secondary-700 h-dvh">
      {/* Desktop Header */}
      <header className="hidden lg:flex flex-col w-60 bg-surface-25 rounded-lg p-4 ">
        <Link href="/admin/" className='flex items-center gap-2.5 text-heading-5 lg:text-heading-4'>
          <Image className='h-8 w-8 lg:h-10lg:w-10' src={logo} alt='Ottri Logo' />
          <span>Ottri</span>
        </Link>

        <hr className="text-black/10 mt-4" />

        <AdminNavbar />

        <hr className="text-black/10 mt-auto mb-6" />
        <div className="flex gap-2 py-2">
          <div className="h-10 aspect-square rounded-full bg-gray-900" />
          <div>
            <p className="text-sm font-medium">Jenny Murphy</p>
            <p className="text-xs text-secondary-700/50">jennymurphy@gmail.com</p>
          </div>
        </div>
      </header>
      {/* Mobile Header */}
      <header>
        
      </header>
      {children}
    </div>
  );
}
