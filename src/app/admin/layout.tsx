"use client";
import React from 'react';
import Header from "./_components/Header";

export default function AdminLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="lg:flex lg:p-3 text-secondary-700 h-dvh">
        <Header />
        {children}
      </div>
    </>
  );
}
