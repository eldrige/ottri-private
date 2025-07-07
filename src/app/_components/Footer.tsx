import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png";
import CallIcon from '../../components/icons/CallIcon';
import EmailIcon from '../../components/icons/EmailIcon';
import LocationIcon from '../../components/icons/LocationIcon';
import { Button } from '../../components/ui/Button';
import InstagramIcon from '../../components/icons/InstagramIcon';
import XIcon from '../../components/icons/XIcon';
import FacebookIcon from '../../components/icons/FacebookIcon';

// Brand section with logo and description

export default function Footer() {
    return (
        <div className="bg-secondary-700 py-32 xl:px-36 gap-16 flex flex-col">
            <div className='flex gap-8'>
                <FooterBrand />
                <ServicesSection />
                <CompanySection />
                <CTASection />
            </div>
            <div>
                <hr className='border-0.75 text-[#D9D9D9]' />
            </div>
            <FooterBottom />
        </div>
    )
}
const FooterBrand = () => (
    <div className='flex-1 gap-4 flex flex-col'>
        <div className='w-64 flex items-center gap-2.5 text-heading-4'>
            <Image className='h-8 w-8' src={logo} alt='Ottri Logo' />
            <span className='text-white'>Ottri</span>
        </div>
        <p className='text-[#D9D9D9]'>
            The most trusted cleaning service platform in the region. Professional, reliable, and affordable home cleaning solutions.
        </p>
        <ContactInfo />
    </div>
);

// Contact information section
const ContactInfo = () => (
    <>
        <div className='*:*:fill-[#D9D9D9] flex gap-0.75'>
            <CallIcon />
            <p className='text-[#D9D9D9]'>(555) 123-4567</p>
        </div>
        <div className='flex gap-0.75'>
            <LocationIcon />
            <p className='text-[#D9D9D9]'>hello@ottri.com</p>
        </div>
        <div className='flex gap-0.75'>
            <EmailIcon />
            <p className='text-[#D9D9D9]'>Serving 6 metro areas</p>
        </div>
    </>
);

// Services section
const ServicesSection = () => (
    <div className='flex-1 flex flex-col gap-4'>
        <h1 className='text-white text-heading-4'>Services</h1>
        <ul className='text-[#D9D9D9] gap-4 flex flex-col'>
            <li>One-Time Cleaning</li>
            <li>Recurring Cleaning</li>
            <li>Deep Cleaning</li>
            <li>Move-in/Move-out Cleaning</li>
            <li>Post-construction Cleaning</li>
            <li>Office cleaning</li>
        </ul>
    </div>
);

// Company section
const CompanySection = () => (
    <div className='flex-1 flex flex-col gap-4'>
        <h1 className='text-white text-heading-4'>Company</h1>
        <ul className='text-[#D9D9D9] gap-4 flex flex-col'>
            <li>About Us</li>
            <li>How it works</li>
            <li>Careers</li>
            <li>Blogs</li>
            <li>Help center</li>
        </ul>
    </div>
);

// CTA and social section
const CTASection = () => (
    <div className='flex-1 flex flex-col gap-4'>
        <h1 className='text-white text-heading-4'>Ready to book?</h1>
        <p className='text-[#D9D9D9]'>
            Get your home professionally cleaned in just a few clicks.
        </p>
        <div className='flex flex-col gap-4'>
            <Button className='whitespace-nowrap' size="xs">Book a cleaning now</Button>
            <Button className='whitespace-nowrap' size="xs">Live chat support</Button>
        </div>
        <div className='flex flex-col gap-1'>
            <p className='text-[#D9D9D9]'>Follow us</p>
            <div className='flex items-center gap-2'>
                <InstagramIcon />
                <XIcon />
                <FacebookIcon />
            </div>
        </div>
    </div>
);

// Bottom section with copyright and links
const FooterBottom = () => (
    <div className='flex text-[#D9D9D9] justify-between'>
        <p>
            © 2025 Ottri. All rights reserved. Licensed, bonded, and insured.
        </p>
        <ul className='flex gap-4'>
            <li>Privacy Policy</li>
            <li>Terms of Services</li>
            <li>Cookie Policy</li>
        </ul>
    </div>
);
