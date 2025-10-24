"use client";
import { Loader2 } from "lucide-react";
import "../globals.css";
import DashboardNavbar from "./_components/DashboardNavbar";
import SideNavBar from "./_components/SideNavBar";
import { useGetUserProfile } from "./_services/queries";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: profile, isLoading: isProfileLoading } = useGetUserProfile();
  if (isProfileLoading || !profile) {
    return (
      <div className="h-screen flex gap-2 w-full justify-center items-center">
        <Loader2 className="animate-spin h-6 w-6" />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <main className=" relative">
      <DashboardNavbar />
      <div className="flex px-4">
        <section className="hidden md:block fixed flex-15/100 h-full">
          <SideNavBar user={profile || {}} />
        </section>
        <section className="flex-85/100 ml-[16%] overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
}
