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

export function NavLink(
  props: Omit<ComponentProps<typeof Link>, "className"> & { end?: boolean }
) {
  const pathname = usePathname();
  const { end, ...restProps } = props;
  let isActive = false;
  if (end) isActive = pathname.endsWith(props.href.toString());
  else isActive = pathname.includes(props.href.toString());

  return (
    <Link
      {...restProps}
      className={cn(
        "py-2 px-3 rounded-lg flex items-center gap-2",
        isActive ? "bg-surface-75 text-secondary-700" : "hover:bg-surface-75"
      )}
    />
  );
}
