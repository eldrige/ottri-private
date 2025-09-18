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
  // console.log(`profile is here: ${profile}`);

  if (isProfileLoading || !profile) {
    return <Loader2 className="animate-spin h-6 w-6" />;
  }
  return (
    <main className=" relative">
      <DashboardNavbar />
      <div className="flex px-4">
        <section className="hidden md:block flex-15/100 h-full">
          <SideNavBar user={profile} />
        </section>
        <section className="flex-85/100 ">{children}</section>
      </div>
    </main>
  );
}
