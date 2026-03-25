"use client";
import logo from "@/assets/logo.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminNavbar from "./AdminNavbar";
import MenuIcon from "@/components/icons/MenuIcon";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/app/dashboard/_services/mutations";
import { Button } from "@/components/ui/Button";
import { LogOut, Loader2 } from "lucide-react";
import { useGetUserProfile } from "@/app/dashboard/_services/queries";

export default function Header() {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogoutMutation();
  const { data: profileData } = useGetUserProfile();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [showMobile, setShowMobile] = useState(false);
  useEffect(() => {
    if (showMobile) {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "auto";
      };
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {};
  }, [showMobile]);

  return (
    <>
      {/* Desktop Header */}
      <div className="fixed top-0 left-0 py-3 pl-3 h-full">
        <header className="hidden lg:flex h-full flex-col w-60 bg-surface-50 rounded-lg p-4">
          <Link
            href="/admin/"
            className="flex items-center gap-2.5 text-heading-5 lg:text-heading-4"
          >
            <Image
              className="h-8 lg:h-10 max-w-fit"
              src={logo}
              alt="Ottri Logo"
            />
          </Link>

          <hr className="text-black/10 mt-4" />

          <AdminNavbar />

          <hr className="text-black/10 mt-auto mb-6" />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 py-2">
              <div className="h-10 aspect-square rounded-full bg-gray-900" />
              <div>
                <p className="text-sm font-medium">{profileData?.email}</p>
                <p className="text-xs text-secondary-700/50">
                  {profileData?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size={"2xs"}
              className="flex justify-center text-red-600 hover:text-red-800 hover:bg-red-50"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </>
              )}
            </Button>
          </div>
        </header>
      </div>

      {/* Mobile Header */}
      <header className="sticky top-1 z-50 h-14 px-4 mx-1 mt-1 flex lg:hidden items-center justify-between text-white bg-secondary-700 rounded-2xl shadow-custom">
        <button
          onClick={() => setShowMobile(!showMobile)}
          className="cursor-pointer p-2"
        >
          <MenuIcon className="size-6" />
        </button>
        <Link href="/admin" className="text-heading-5 font-semibold">
          Ottri
        </Link>
        <div className="bg-gray-400 rounded-full h-10 aspect-square" />
      </header>

      {/* Popup Mobile Open Nav Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 w-full h-dvh bg-black/50 flex flex-col transition-all lg:hidden",
          showMobile ? "opacity-100" : "invisible opacity-0"
        )}
        onClick={() => setShowMobile(false)} // Close when clicking the overlay
      >
        <header className="min-h-14 px-4 mx-1 mt-1 flex items-center text-white bg-secondary-700 rounded-2xl shadow-custom">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling to the overlay
              setShowMobile(!showMobile);
            }}
            className="cursor-pointer p-2"
          >
            <MenuIcon className="size-6" />
          </button>
        </header>
        <div
          className={cn(
            "flex flex-col px-4 mt-2 mx-1 mb-1 h-full max-w-sm text-secondary-700 bg-white shadow-custom-strong rounded-2xl transition",
            showMobile ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside nav from closing it
        >
          <AdminNavbar onNav={() => setShowMobile(false)} />
          <div className="flex flex-col gap-2 mb-6 mt-auto">
            <div className="flex gap-2 py-2">
              <div className="h-10 aspect-square rounded-full bg-gray-500" />
              <div>
                <p className="text-sm font-medium">{profileData?.email}</p>
                <p className="text-xs text-secondary-700/50">
                  {profileData?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex justify-center text-red-600 hover:text-red-800 hover:bg-red-50"
              disabled={isLoggingOut}
              size={"2xs"}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
