import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";
import CallIcon from "@/components/icons/CallIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/Button";
import InstagramIcon from "@/components/icons/InstagramIcon";
import XIcon from "@/components/icons/XIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
// import ChatIcon from "@/components/icons/ChatIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="pt-16 mt-8 md:mt-24 pb-8 md:py-24 px-6 sm:px-0 mx-auto container flex flex-col">
      <div className="flex flex-col md:flex-row gap-8">
        <FooterBrand />
        <ServicesSection />
        <CompanySection />
        <CTASection />
      </div>
      <div className="md:py-16 py-8">
        <hr className="border-0.75 text-surface-300" />
      </div>
      <FooterBottom />
    </div>
  );
}

const FooterBrand = () => (
  <div className="flex-1 gap-4 flex flex-col">
    <div className="w-64 flex items-center gap-2.5 text-heading-4">
      <Image className="h-8 max-w-fit" src={logo} alt="Ottri Logo" />
      <span className="text-white">Ottri</span>
    </div>
    <p className="text-surface-300">
      The most trusted cleaning service platform in the region. Professional,
      reliable, and affordable home cleaning solutions.
    </p>
    <ContactInfo />
  </div>
);

const ContactInfo = () => (
  <>
    <div className="*:*:fill-surface-300 flex gap-0.75 items-center">
      <CallIcon />
      <p className="text-surface-300">502-390-7925</p>
    </div>
    <a href="mailto:info@ottri.net" className="flex gap-0.75 items-center">
      <EmailIcon />
      <p className="text-surface-300">info@ottri.net</p>
    </a>
    <div className="flex gap-0.75 items-center">
      <LocationIcon className="text-surface-300" />
      <p className="text-surface-300">Serving 6 metro areas</p>
    </div>
  </>
);

const ServicesSection = () => (
  <div className="flex-1 flex flex-col gap-4">
    <h1 className="text-white text-heading-4">Services</h1>
    <ul className="text-surface-300 *:hover:text-primary-700 gap-4 flex flex-col">
      <Link href="/services">One-Time Cleaning</Link>
      <Link href="/services">Recurring Cleaning</Link>
      <Link href="/services">Move-in/Move-out Cleaning</Link>
      <Link href="/services">Post-construction Cleaning</Link>
      <Link href="/services">Office cleaning</Link>
    </ul>
  </div>
);

const CompanySection = () => (
  <div className="flex-1 flex flex-col gap-4">
    <h1 className="text-white text-heading-4">Company</h1>
    <ul className="text-surface-300 *:hover:text-primary-700 gap-4 flex flex-col">
      <Link href="/about">About Us</Link>
      <Link href="/how-we-work">How it works</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/blog">Blogs</Link>
      <Link href="/jobs">Job Openings</Link>
      <Link href="/help-center">Help center</Link>
    </ul>
  </div>
);

const CTASection = () => (
  <div className="flex-1 flex flex-col gap-4">
    <h1 className="text-white text-heading-4">Ready to book?</h1>
    <p className="text-surface-300">
      Get your home professionally cleaned in just a few clicks.
    </p>
    <div className="flex flex-col gap-4">
      <Link href="/booking/new">
        <Button className="whitespace-nowrap border-primary-700" size="xs">
          Book a cleaning now
        </Button>
      </Link>
    </div>
    <div className="flex flex-col items-center md:items-start gap-1">
      <p className="text-surface-300">Follow us</p>
      <ul className="flex items-center gap-2.75">
        <li>
          <a href="https://www.instagram.com/">
            <InstagramIcon />
          </a>
        </li>
        <li>
          <a href="https://x.com/">
            <XIcon />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/">
            <FacebookIcon />
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const FooterBottom = () => (
  <div className="flex flex-col-reverse md:flex-row gap-8 text-surface-300 justify-between">
    <p>© 2025 Ottri. All rights reserved. Licensed, bonded, and insured.</p>
    <ul className="flex md:flex-row flex-col gap-4 *:hover:text-primary-700 ">
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/terms-services">Terms of Services</Link>
      <Link href="/cookie-policy">Cookie Policy</Link>
    </ul>
  </div>
);
