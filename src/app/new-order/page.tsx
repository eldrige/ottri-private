"use client";
import CheckCircleBroken from "@/components/icons/CheckCircleBroken";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Building2, HomeIcon, Shield, Trees } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import StepsViewer from "./_components/StepsViewer";

export default function NewOrderPage() {
  const [currStep, setCurrStep] = useState(0);
  
  return (
    <main className="container max-w-5xl mx-auto px-6 mt-2.5 py-8 text-secondary-700">
      <Link className="text-primary-700 text-subtitle flex gap-4" href="/services">
        <ArrowLeft />
        Back to all services
      </Link>

      <div className="mt-8 space-y-8">
        <h1 className="text-heading-2.5">Book Your Cleaning Service</h1>

        <StepsViewer currStep={currStep} />

        <div className="mt-8 grid lg:grid-cols-3 gap-x-8 items-start">
          <div className="lg:col-span-2 lg:bg-white rounded-2xl lg:shadow-custom-light space-y-6 lg:px-8 py-8">
            <h3 className="text-heading-4">Choose your Service</h3>

            <div className="grid lg:grid-cols-2 gap-4 font-medium">
              <button className="flex items-center gap-4 py-3 px-4 border border-black/10 rounded-lg cursor-pointer">
                <HomeIcon className="text-primary-700 size-6" /> Residential Cleaning
              </button>
              <button className="flex items-center gap-4 py-3 px-4 border border-black/10 rounded-lg cursor-pointer">
                <Building2 className="text-primary-700 size-6" /> Commercial Cleaning
              </button>
              <button className="flex items-center gap-4 py-3 px-4 border border-black/10 rounded-lg cursor-pointer">
                <Trees className="text-primary-700" /> Outdoor Cleaning
              </button>
              <button className="flex items-center gap-4 py-3 px-4 border border-black/10 rounded-lg cursor-pointer">
                <Shield className="text-primary-700" /> Specialized Services
              </button>
            </div>

            <hr className="text-surface-500/10" />

            {/* Desktop step buttons */}
            <div className="hidden lg:flex justify-between lg:col-span-2">
              <Button size="xs" disabled={currStep <= 0} onClick={() => setCurrStep(prev => prev - 1)}
                className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
              >Previous</Button>
              <Button size="xs" disabled={currStep >= 7} onClick={() => setCurrStep(prev => prev + 1)}
                className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
              >Next</Button>
            </div>
          </div>
          <div className='lg:bg-white rounded-2xl lg:shadow-custom-light p-4 space-y-8'>
            <h4 className="text-heading-5">Booking Summary</h4>
            <p className="text-caption">Service Type:</p>
            <hr className="text-surface-500/10" />
            <p className="text-caption flex justify-between">
              Subtotal: <span>$00</span>
            </p>
            <hr className="text-surface-500/10" />
            <p className="text-caption font-medium flex justify-between">
              Total: <span className="text-primary-700">$00</span>
            </p>

            <ul className="p-4 space-y-3">
              <li className="flex gap-2 text-label font-normal items-center text-surface-500">
                <CheckCircleBroken className="text-primary-700" />
                Satisfaction Guaranteed
              </li>
              <li className="flex gap-2 text-label font-normal items-center text-surface-500">
                <CheckCircleBroken className="text-primary-700" />
                Insured and bonded cleaners
              </li>
              <li className="flex gap-2 text-label font-normal items-center text-surface-500">
                <CheckCircleBroken className="text-primary-700" />
                All supplies included
              </li>
            </ul>
            {/* Mobile step buttons */}
            <div className="flex lg:hidden justify-between">
              <Button size="xs" disabled={currStep <= 0} onClick={() => setCurrStep(prev => prev - 1)}
                className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
              >Previous</Button>
              <Button size="xs" disabled={currStep >= 7} onClick={() => setCurrStep(prev => prev + 1)}
                className="disabled:bg-white disabled:border-primary-700 disabled:text-primary-700 disabled:opacity-25"
              >Next</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
