import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png";
import CallIcon from './icons/CallIcon';
import EmailIcon from './icons/EmailIcon';
import LocationIcon from './icons/LocationIcon';

export function Footer() {
    return (
        <div className="bg-secondary-700 py-24 px-32">
            <div className='flex gap-4'>
                <div className='flex-1 gap-4 flex flex-col'>
                    <div className='w-64 flex items-center gap-2.5 text-heading-4'>
                        <Image className='h-8 w-8' src={logo} alt='Ottri Logo' />
                        <span className='text-white'>Ottri</span>
                    </div>
                    <p className='text-[#D9D9D9]'>
                        The most trusted cleaning service platform in the region. Professional, reliable, and affordable home cleaning solutions.
                    </p>
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
                </div>
                <div className='flex-1'>
                    <h1 className='text-white text-heading-4'>Services</h1>
                    <p className='text-[#D9D9D9]'>
                        The most trusted cleaning service platform in the region. Professional, reliable, and affordable home cleaning solutions.
                    </p>
                    <div className='*:*:fill-[#D9D9D9] flex'>
                        <CallIcon />
                        <p className='text-[#D9D9D9]'>(555) 123-4567</p>
                    </div>
                    <div className='flex'>
                        <LocationIcon />
                        <p className='text-[#D9D9D9]'>hello@ottri.com</p>
                    </div>
                    <div className='flex'>
                        <EmailIcon />
                        <p className='text-[#D9D9D9]'>Serving 6 metro areas</p>
                    </div>
                </div>
                <div className='flex-1'>
                    <h1 className='text-white text-heading-4    '>Services</h1>
                    <p className='text-[#D9D9D9]'>
                        The most trusted cleaning service platform in the region. Professional, reliable, and affordable home cleaning solutions.
                    </p>
                    <div className='*:*:fill-[#D9D9D9] flex'>
                        <CallIcon />
                        <p className='text-[#D9D9D9]'>(555) 123-4567</p>
                    </div>
                    <div className='flex'>
                        <LocationIcon />
                        <p className='text-[#D9D9D9]'>hello@ottri.com</p>
                    </div>
                    <div className='flex'>
                        <EmailIcon />
                        <p className='text-[#D9D9D9]'>Serving 6 metro areas</p>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}