"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/logo.png";
import { Nav, NavLink } from "@/components/Nav";
import CallIcon from "@/components/icons/CallIcon";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  CreditCard,
  FileText,
  HomeIcon,
  Menu,
  Settings,
  UserIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import userImage from "@/assets/user-profile-figure.png";
import Link from "next/link";
import { SideNavLink } from "./SideNavBar";

export default function Navbar() {
  const [showMobile, setShowMobile] = useState(false);
  return (
    <>
      <nav className="lg:hidden fixed px-2 w-full mx-auto top-1.25 z-50">
        <div className="flex rounded-2xl px-6 py-2 shadow-lg bg-primary-700  text-white justify-between items-center container mx-auto">
          <button
            onClick={() => setShowMobile((prev) => !prev)}
            className="cursor-pointer"
          >
            {!showMobile ? <Menu /> : <XIcon />}
          </button>
          <Link
            href="/"
            className=" flex items-center font-semibold gap-2.5 text-heading-5 lg:text-heading-4"
          >
            <span>Ottri</span>
          </Link>
          <Image
            className="rounded-full size-11"
            src={userImage}
            alt={"user profile"}
          />
        </div>
      </nav>

      {/* Mobile menu */}

      <MobileNav show={showMobile} setShow={setShowMobile} />
    </>
  );
}

function MobileNav({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: React.SetStateAction<boolean>) => void;
}) {
  return (
    <>
      {show && (
        <div className="fixed px-2 top-0 left-0 w-full h-full bg-black/50 z-40">
          <div className="flex h-screen pt-18">
            <div className="flex h-98/100 flex-col w-5/7 pl-3 pr-12 py-5 bg-white rounded-xl">
              <div className="flex  flex-col  gap-2.5">
                <h3 className="text-secondary-800">Navigation</h3>
                <div className="flex flex-col gap-2.5">
                  <SideNavLink
                    onNavigate={() => setShow(false)}
                    href={"/dashboard"}
                  >
                    <HomeIcon />
                    Dashboard
                  </SideNavLink>
                  <SideNavLink
                    onNavigate={() => setShow(false)}
                    href={"/dashboard/my-booking"}
                  >
                    <Calendar />
                    My Bookings
                  </SideNavLink>
                  <SideNavLink
                    onNavigate={() => setShow(false)}
                    href={"/dashboard/service-history"}
                  >
                    <FileText />
                    Service History
                  </SideNavLink>
                  <SideNavLink
                    onNavigate={() => setShow(false)}
                    href={"/dashboard/billing"}
                  >
                    <CreditCard className="rounded-full" />
                    Billing
                  </SideNavLink>
                  <SideNavLink
                    onNavigate={() => setShow(false)}
                    href={"/dashboard/profile"}
                  >
                    <UserIcon className="rounded-full" />
                    Profile
                  </SideNavLink>
                  <SideNavLink
                    onNavigate={() => setShow(false)}
                    href={"/dashboard/settings"}
                  >
                    <Settings className="rounded-full" />
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
                    <h1 className="font-medium text-lg text-black">
                      Jenny Murphy
                    </h1>
                    <p className="text-surface-500 text-[14px]">
                      jennymurphy@gmail.com
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-2/7" onClick={() => setShow(false)} />
          </div>
        </div>
      )}
    </>
  );
}
