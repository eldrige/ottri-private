"use client";
import Calculator from "@/components/icons/Calculator";
import RangeSlider from "./RangeSlider";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import RewardStars from "@/components/icons/RewardStars";
import { Check, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function LandingSection8() {
  const [squareFootage, setSquareFootage] = useState(1500);

  // Calculate square footage based on slider value (1-100)
  const calculateSquareFootage = (value: number) => {
    setSquareFootage(value);
  };

  return (
    <section className="text-secondary-700 pt-16 lg:pt-24 pb-24 lg:pb-40">
      <h2 className="text-heading-3 lg:text-heading-2 text-center text-black">
        Transparent, Fair Pricing
      </h2>
      <p className="mt-4 text-subtitle text-surface-500 text-center max-w-3xl mx-auto tracking-wider">
        No hidden fees, no surprises. Get an instant quote based on your
        home&apos;s specific needs.
      </p>

      <div className="mt-8 lg:mt-16 grid lg:grid-cols-2 gap-y-8">
        <div className="lg:mr-8 p-8 shadow-custom rounded-lg">
          <h5 className="text-heading-5 text-secondary-700 flex items-center gap-4">
            <Calculator className="text-primary-700" />
            Quick Price Calculator
          </h5>
          <form className="mt-4 flex flex-col gap-4">
            <label className="text-caption text-black">
              Bedrooms
              <select className="w-full px-4 py-2 text-caption text-surface-500 bg-surface-50 rounded-lg focus:border-none focus:outline-none">
                <option value="2_BEDROOMS">2 Bedrooms</option>
                <option value="1_BEDROOMS">1 Bedroom</option>
                <option value="3_BEDROOMS">3 Bedrooms</option>
              </select>
            </label>
            <label className="text-caption text-black">
              Bathrooms
              <select className="w-full px-4 py-2 text-caption text-surface-500 bg-surface-50 rounded-lg focus:border-none focus:outline-none">
                <option value="2_BATHROOMS">2 Bathrooms</option>
                <option value="1_BATHROOMS">1 Bathroom</option>
                <option value="3_BATHROOMS">3 Bathrooms</option>
              </select>
            </label>
            <label className="text-caption text-black">
              Square Footage: {squareFootage.toLocaleString()} sq ft
              <div className="relative mt-2">
                <RangeSlider
                  min={1}
                  max={3000}
                  defaultValue={1500}
                  id="squareFootageSlider"
                  sliderHeight={10}
                  thumbSize={8}
                  trackColor="var(--color-surface-200)"
                  progressColor="var(--color-secondary-700)"
                  thumbColor="var(--color-white)"
                  onChange={(value) => calculateSquareFootage(value)}
                />
              </div>
            </label>

            <label className="text-caption text-black">
              Cleaning Frequency
              <select className="w-full px-4 py-2 text-caption text-surface-500 bg-surface-50 rounded-lg focus:border-none focus:outline-none">
                <option value="1_TIME">One-time cleaning</option>
                <option value="RECURRING">Recurring Cleaning</option>
              </select>
            </label>

            <div className="border border-primary-700 rounded-lg p-4 mt-8">
              <div className="flex items-start">
                <h5 className="text-subtitle text-secondary-700">
                  Estimated Price
                </h5>
                <p className="text-heading-3 font-normal text-primary-700 ml-auto">
                  $140
                </p>
              </div>
              <Link href="/booking/new" className="w-full mt-4">
                <Button size="xs" className="w-full">
                  Book this cleaning
                </Button>
              </Link>
            </div>

            <p className="text-caption text-secondary-700/90 text-center lg:px-4">
              *Final price may vary based on home condition and specific
              requirements. All estimates include cleaning supplies and
              equipment.
            </p>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-heading-4">What&apos;s included</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-black/10 rounded-lg">
              <RewardStars className="text-primary-700" />
              <div className="space-y-2 flex-1">
                <h5 className="font-medium">Complete Cleaning Supplies</h5>
                <p className="text-caption text-surface-500">
                  Professional-grade, eco-friendly products included at no extra
                  cost.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-black/10 rounded-lg">
              <HomeIcon className="text-primary-700" />
              <div className="space-y-2 flex-1">
                <h5 className="font-medium">All Common Areas</h5>
                <p className="text-caption text-surface-500">
                  Kitchen, bathrooms, bedrooms, living areas, and hallways
                  thoroughly cleaned.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-black/10 rounded-lg">
              <Check
                size={24}
                className="bg-primary-700 text-white p-0.5 rounded-full"
              />
              <div className="space-y-2 flex-1">
                <h5 className="font-medium">Satisfaction Guarantee</h5>
                <p className="text-caption text-surface-500">
                  Not happy? We&apos;ll return within 24 hours to make it right,
                  free of charge.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-heading-4 mt-8">Popular add-ons</h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="border border-black/10 rounded-lg p-4 flex flex-col justify-center items-center">
              <p className="text-caption text-surface-500">Inside Oven</p>
              <p className="text-heading-5 text-primary-700 mt-2">+$25</p>
            </div>
            <div className="border border-black/10 rounded-lg p-4 flex flex-col justify-center items-center">
              <p className="text-caption text-surface-500">Inside Fridge</p>
              <p className="text-heading-5 text-primary-700 mt-2">+$20</p>
            </div>
            <div className="border border-black/10 rounded-lg p-4 flex flex-col justify-center items-center">
              <p className="text-caption text-surface-500">Basement</p>
              <p className="text-heading-5 text-primary-700 mt-2">+$40</p>
            </div>
            <div className="border border-black/10 rounded-lg p-4 flex flex-col justify-center items-center">
              <p className="text-caption text-surface-500">Windows</p>
              <p className="text-heading-5 text-primary-700 mt-2">+$30</p>
            </div>
          </div>

          <div className="mt-8 p-6 shadow-custom space-y-6 rounded-lg">
            <h6 className="heading-subtitle font-medium">
              Questions about pricing?
            </h6>
            <p className="text-surface-500 tracking-wide">
              We&apos;re rapidly expanding! Let us know where you&apos;d like
              Ottri service and we&apos;ll notify you when we arrive in your
              neighborhood.
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap *:w-full *:lg:w-auto">
              <Button size="xs">Live Chat</Button>
              <Button variant="default-outline" size="xs">
                Call (702) 555-0122
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
