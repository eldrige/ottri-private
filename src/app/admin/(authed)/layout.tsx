"use client";
import React from "react";
import Header from "./_components/Header";
import "./adminStyles.css";

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="lg:ml-63 lg:py-3 lg:pr-3 text-secondary-700">
        {children}
      </div>
    </>
  );
}
