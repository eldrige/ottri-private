"use client";
import Link from "next/link";
import React, { ComponentProps } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import userImage from "@/assets/user-profile-figure.png";
import {
  Calendar,
  CreditCard,
  FileText,
  HomeIcon,
  Settings,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SideNavBar() {
  return (
    <nav className="flex h-screen flex-col gap-8 px-4 py-5">
      <div className="flex border-b border-secondary-800/25 py-5 justify-between items-center container mx-auto">
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
      <div className="flex flex-col text-caption gap-2.5">
        <h3 className="text-secondary-800">Navigation </h3>
        <div className="flex flex-col gap-2.5">
          <SideNavLink href={"/dashboard"}>
            <HomeIcon className="size-5" />
            Dashboard
          </SideNavLink>
          <SideNavLink href={"/dashboard/my-booking"}>
            <Calendar className="size-5" />
            My Bookings
          </SideNavLink>
          <SideNavLink href={"/dashboard/service-history"}>
            <FileText className="size-5" />
            Service History
          </SideNavLink>
          <SideNavLink href={"/dashboard/billing"}>
            <CreditCard className="rounded-full size-5" />
            Billing
          </SideNavLink>
          <SideNavLink href={"/dashboard/profile"}>
            <UserIcon className="rounded-full size-5" />
            Profile
          </SideNavLink>
          <SideNavLink href={"/dashboard/settings"}>
            <Settings className="rounded-full size-5" />
            Settings
          </SideNavLink>
        </div>
      </div>
      <div className="h-full flex items-end ">
        <div className="flex border-t border-secondary-800/25 pt-8 pb-2 gap-4">
          <Image
            className="rounded-full size-12"
            src={userImage}
            alt={"user profile"}
          />
          <Link
            href={"/dashboard/profile"}
            className="flex cursor-pointer flex-col"
          >
            <h1 className="font-medium text-caption text-black">
              Jenny Murphy
            </h1>
            <p className="text-surface-500 text-xs">jennymurphy@gmail.com</p>
          </Link>
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
