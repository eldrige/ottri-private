"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

export function Nav({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        "flex lg:items-center flex-col xl:flex-row whitespace-nowrap",
        className
      )}
    >
      {children}
    </nav>
  );
}

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  end?: boolean;
};

export function NavLink({ end, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end
    ? pathname === props.href
    : pathname.startsWith(`${props.href}`);
  return (
    <Link
      {...props}
      className={cn(
        "py-3 px-4 text-surface-500",
        isActive && "text-primary-700"
      )}
    />
  );
}
