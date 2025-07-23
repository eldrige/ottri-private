"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import logo from "@/assets/logo.png";
import { Nav, NavLink } from '@/components/Nav';
import CallIcon from '@/components/icons/CallIcon';
import { Button } from '@/components/ui/Button';
import { Menu, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Navbar() {
  const [showMobile, setShowMobile] = useState(false);
  return (
    <>
      <nav className='sticky top-0 z-50 bg-white px-6 py-5 shadow-lg'>
        <div className='flex justify-between items-center container mx-auto'>

          <Link href="/" className='w-64 flex items-center gap-2.5 text-heading-5 lg:text-heading-4'>
            <Image className='h-8 lg:h-10 w-8 lg:w-10' src={logo} alt='Ottri Logo' />
            <span>Ottri</span>
          </Link>
          <Nav className='hidden xl:flex'>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/how-we-work">How we work</NavLink>
            <NavLink href="/our-team">Our Team</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </Nav>
          <div className='h-10 hidden xl:flex items-center gap-2.5'>
            <span className='whitespace-nowrap flex text-surface-500 px-6'>
              <CallIcon />
              (555) 123-4567
            </span>
            <Button className='whitespace-nowrap' size="xs">Book Now</Button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setShowMobile(prev => !prev)} className='cursor-pointer xl:hidden'>
            {!showMobile ? <Menu /> : <XIcon />}
          </button>
        </div>

      </nav>

      {/* Mobile menu */}
      <MobileNav show={showMobile} setShow={setShowMobile} />
    </>
  );
}



function MobileNav({ show, setShow }: {
  show: boolean,
  setShow: (value: React.SetStateAction<boolean>) => void;
}) {
  return (
    <>
      <div className={cn(
        'xl:hidden fixed top-0 w-full z-50 bg-white px-6 py-8 space-y-6 shadow-custom transition duration-300 -translate-y-full opacity-0',
        show && "translate-y-0 opacity-100"
      )}>
        <div className='flex justify-between'>
          <div className='w-64 flex items-center gap-2.5 text-heading-5'>
            <Image className='h-8 w-8' src={logo} alt='Ottri Logo' />
            <span>Ottri</span>
          </div>
          <button onClick={() => setShow(prev => !prev)} className='cursor-pointer xl:hidden'>
            {<XIcon />}
          </button>
        </div>
        <hr className='text-surface-200' />
        <Nav>
          <NavLink onNavigate={() => setShow(false)} href="/">Home</NavLink>
          <NavLink onNavigate={() => setShow(false)} href="/about">About</NavLink>
          <NavLink onNavigate={() => setShow(false)} href="/services">Services</NavLink>
          <NavLink onNavigate={() => setShow(false)} href="/how-we-work">How we work</NavLink>
          <NavLink onNavigate={() => setShow(false)} href="/our-team">Our Team</NavLink>
          <NavLink onNavigate={() => setShow(false)} href="/blog">Blog</NavLink>
        </Nav>
        <div className='space-y-2.5'>
          <p className='whitespace-nowrap flex justify-center text-surface-500 px-6'>
            <CallIcon />
            (555) 123-4567
          </p>
          <Button className='whitespace-nowrap w-full mt-2.5' size="xs">Book Now</Button>
        </div>
      </div>
      <div className={cn('xl:hidden fixed inset-0 z-30 transition ', show ? "bg-black/70 visible" : "invisible ")}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setShow(false);
        }} />
    </>
  );
}