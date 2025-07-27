"use client";
import Link from "next/link";
import React, { ComponentProps } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Calendar, FileText, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SideNavBar() {
  return (
    <nav className="flex flex-col gap-8 h-full px-4 py-5">
      <div className="flex border-b-2 border-white/30 py-5 justify-between items-center container mx-auto">
        <Link
          href="/"
          className="w-64 flex items-center gap-2.5 text-heading-5 lg:text-heading-4"
        >
          <Image
            className="h-8 lg:h-10 w-8 lg:w-10"
            src={logo}
            alt="Ottri Logo"
          />
          <span>Ottri</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-secondary-800">Navigation </h3>
        <div className="flex flex-col">
          <SideNavLink href={"/dashboard"}>
            <HomeIcon />
            Dashboard
          </SideNavLink>
          <SideNavLink href={"/dashboard/my-booking"}>
            <Calendar />
            My Bookings
          </SideNavLink>
          <SideNavLink href={"/dashboard/service-history"}>
            <FileText />
            Service History
          </SideNavLink>
        </div>
      </div>
    </nav>
  );
}

export function SideNavLink(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "flex gap-2 text-secondary-800 px-4 py-2.75 w-full rounded-lg items-center",
        pathname === props.href && "bg-primary-700 text-white"
      )}
    />
  );
}
