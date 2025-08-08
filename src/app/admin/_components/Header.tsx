"use client";
import logo from "@/assets/logo.png";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import AdminNavbar from "./AdminNavbar";
import MenuIcon from "@/components/icons/MenuIcon";
import { cn } from "@/lib/utils";

export default function Header() {
  const [showMobile, setShowMobile] = useState(false);
  useEffect(() => {
    if (showMobile) {
      document.body.style.overflowY = "hidden";
      return () => { document.body.style.overflowY = "auto"; };
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => { };
  }, [showMobile]);

  return (
    <>

      {/* Desktop Header */}
      <div className="fixed top-0 left-0 py-3 pl-3 h-full">
        <header className="hidden lg:flex h-full flex-col w-60 bg-surface-50 rounded-lg p-4">
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
      </div>


      {/* Mobile Header */}
      <header className="sticky top-1 h-14 px-4 mx-1 mt-1 flex lg:hidden items-center justify-between text-white bg-secondary-700 rounded-2xl shadow-custom">
        <button onClick={() => setShowMobile(!showMobile)} className="cursor-pointer p-2">
          <MenuIcon className="size-6" />
        </button>
        <Link href="/admin" className="text-heading-5 font-semibold">Ottri</Link>
        <div className="bg-gray-400 rounded-full h-10 aspect-square" />
      </header>


      {/* Popup Mobile Open Nav Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-dvh bg-black/50 flex flex-col transition-all lg:hidden",
          showMobile ? "opacity-100" : "invisible opacity-0"
        )}
        onClick={() => setShowMobile(false)} // Close when clicking the overlay
      >
        <header className="min-h-14 px-4 mx-1 mt-1 flex items-center text-white bg-secondary-700 rounded-2xl shadow-custom">
          <button onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling to the overlay
            setShowMobile(!showMobile);
          }} className="cursor-pointer p-2">
            <MenuIcon className="size-6" />
          </button>
        </header>
        <div
          className={cn(
            "flex flex-col px-4 mt-2 ml-1 mb-1 h-full w-full max-w-sm text-secondary-700 bg-white shadow-custom-strong rounded-2xl transition",
            showMobile ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside nav from closing it
        >
          <AdminNavbar />
          <div className="flex gap-2 py-2 mb-6 mt-auto">
            <div className="h-10 aspect-square rounded-full bg-gray-500" />
            <div>
              <p className="text-sm font-medium">Jenny Murphy</p>
              <p className="text-xs text-secondary-700/50">jennymurphy@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
