import ClockIcon from "@/components/icons/ClockIcon";
import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/Button";
import { Shield } from "lucide-react";
import figure from "@/assets/landing-hero-figure-1.png"
import Image from "next/image";


export default function HeroSection() {
  return (
    <section className="py-16 grid grid-cols-2 gap-x-2.5">
        <div className="space-y-6">
          <h1 className="text-heading-1">Cleanliness Is Our Commitment To Your Well-Being.</h1>
          <p className="text-surface-500 text-subtitle tracking-wide">Book your perfect cleaning service in under 3 minutes. Trusted by thousands of homeowners for reliable, thorough, and affordable cleaning solutions.</p>
          <div className="h-6 flex items-center gap-4">
            <span className="flex">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </span>
            <span className="text-surface-500">4.9/5 (2,450+ Reviews)</span>
          </div>
          <div className="text-surface-500 h-6 flex items-center gap-8">
            <span className="flex gap-3">
              <Shield className="text-primary-700" size={24} />
              Insured & Bonded
            </span>
            <span className="flex gap-3">
              <ClockIcon className="text-primary-700" />
              Same Day Booking
            </span>
          </div>
          <div className="space-x-8">
            <Button size="xs">Book a cleaning now</Button>
            <Button size="xs" variant="secondary-outline">Get a free quote</Button>
          </div>

          <div className="mt-24 py-4 px-6 space-y-4 mr-6.5 rounded shadow-custom">
            <h2 className="text-heading-5 text-secondary-700">Quick Estimate</h2>
            <div className="grid grid-cols-3 text-center">
              <div className="space-y-1">
                <p className="text-heading-5 text-primary-700">$89</p>
                <p className="text-caption text-surface-500">1-2 Bedrooms</p>
              </div>
              <div className="space-y-1">
                <p className="text-heading-5 text-primary-700">$129</p>
                <p className="text-caption text-surface-500">3-4 Bedrooms</p>
              </div>
              <div className="space-y-1">
                <p className="text-heading-5 text-primary-700">$169</p>
                <p className="text-caption text-surface-500">5+ Bedrooms</p>
              </div>
            </div>
          </div>
        </div>
        <figure className="">
            <Image className="ml-auto" src={figure} alt="Hero Figure" />
        </figure>
      </section>
  )
}
