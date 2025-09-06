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
        "mt-8 flex flex-col gap-2.5 text-secondary-700/70 text-sm",
        className
      )}
    >
      <p>Navigation</p>
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "py-2 px-3 rounded-lg flex items-center gap-2",
        pathname === props.href
          ? "bg-surface-75 text-secondary-700"
          : "hover:bg-surface-75"
      )}
    />
  );
}
