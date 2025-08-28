import React from "react";
import { Nav, NavLink } from "./Nav";
import BoxIcon2 from "@/components/icons/BoxIcon2";
import DollarIcon2 from "@/components/icons/DollarIcon2";
import GraphIcon from "@/components/icons/GraphIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import MarketingIcon from "@/components/icons/MarketingIcon";
import { CalendarIcon, UsersIcon } from "lucide-react";

type NavItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  end?: boolean;
};

export default function AdminNavbar() {
  const navItems: NavItem[] = [
    {
      href: "/admin",
      icon: <GraphIcon className="size-4" />,
      label: "Overview",
      end: true
    },
    {
      href: "/admin/bookings",
      icon: <CalendarIcon className="size-4" />,
      label: "Bookings",
      badge: 2
    },
    {
      href: "/admin/staff-jobs",
      icon: <UsersIcon className="size-4" />,
      label: "Staffs & Jobs"
    },
    {
      href: "/admin/financials",
      icon: <DollarIcon2 className="size-4" />,
      label: "Financials"
    },
    {
      href: "/admin/inventory",
      icon: <BoxIcon2 className="size-4" />,
      label: "Inventory"
    },
    {
      href: "/admin/service-zones",
      icon: <LocationIcon className="size-4" />,
      label: "Service Zones"
    },
    {
      href: "/admin/marketing",
      icon: <MarketingIcon className="size-4" />,
      label: "Marketing"
    }
  ];

  return (
    <Nav>
      {navItems.map((item, index) => (
        <NavLink key={index} href={item.href} end={item.end}>
          {item.icon}
          {item.label}
          {item.badge && (
            <span className="ml-auto text-white text-tiny w-4 aspect-square rounded-full bg-secondary-700 flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </Nav>
  );
}
