"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ComponentProps, ReactNode } from 'react';

export function Nav({ children, className }: { children: ReactNode; className?: string; }) {
  return (
    <nav className={cn("flex lg:items-center flex-col lg:flex-row whitespace-nowrap", className)}>{children}</nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return <Link {...props} className={cn(
    "py-3 px-4 text-surface-500",
    pathname === props.href && "text-primary-700"
  )} />;
}