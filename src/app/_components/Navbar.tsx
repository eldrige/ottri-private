import Image from 'next/image';
import React from 'react';
import logo from "@/assets/logo.png";
import { Nav, NavLink } from '@/components/Nav';
import CallIcon from '@/components/icons/CallIcon';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 bg-white px-16 xl:px-36 py-5 flex justify-between items-center shadow-lg'>
      <div className='w-64 flex items-center gap-2.5 text-heading-4'>
        <Image className='h-10 w-10' src={logo} alt='Ottri Logo' />
        <span>Ottri</span>
      </div>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/how-we-work">How we work</NavLink>
        <NavLink href="/our-team">Our Team</NavLink>
        <NavLink href="/blog">Blog</NavLink>
      </Nav>
      <div className='h-10 flex items-center gap-2.5'>
        <span className='whitespace-nowrap flex text-surface-500 px-6'>
          <CallIcon />
          (555) 123-4567
        </span>
        <Button className='whitespace-nowrap' size="xs">Book Now</Button>
      </div>
    </nav>
  );
}
