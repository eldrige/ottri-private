"use client"
import Calculator from "@/components/icons/Calculator";
import RangeSlider from "./RangeSlider";
import { useState } from "react";

export default function LandingSection8() {
  const [squareFootage, setSquareFootage] = useState(1500);

  // Calculate square footage based on slider value (1-100)
  const calculateSquareFootage = (value: number) => {
    // Map the range value (1-100) to a square footage range (e.g., 500-3500)
    const minSqFt = 500;
    const maxSqFt = 3000;
    const sqFt = Math.round(minSqFt + ((value - 1) / 99) * (maxSqFt - minSqFt));
    setSquareFootage(value);
  };

  return (
    <section>
      <h2 className="text-heading-2 text-center">Transparent, Fair Pricing</h2>
      <p className="mt-4 text-subtitle text-surface-500 text-center max-w-3xl mx-auto">No hidden fees, no surprises. Get an instant quote based on your home&apos;s specific needs.</p>

      <div className="mt-16 grid grid-cols-2">
        <div className="mr-8 p-8 shadow-custom border rounded-lg">
          <h5 className="text-heading-5 text-secondary-700 flex items-center gap-4">
            <Calculator className="text-primary-700" />
            Quick Price Calculator
          </h5>
          <form className="mt-4 space-y-4">
            <label className="text-caption">Bedrooms
              <select className="w-full px-4 py-2 text-caption text-surface-500 bg-surface-50 rounded-lg focus:border-none focus:outline-none">
                <option value="2_BEDROOMS">2 Bedrooms</option>
                <option value="1_BEDROOMS">1 Bedroom</option>
                <option value="3_BEDROOMS">3 Bedrooms</option>
              </select>
            </label>
            <label className="text-caption">Bathrooms
              <select className="w-full px-4 py-2 text-caption text-surface-500 bg-surface-50 rounded-lg focus:border-none focus:outline-none">
                <option value="2_BATHROOMS">2 Bathrooms</option>
                <option value="1_BATHROOMS">1 Bathroom</option>
                <option value="3_BATHROOMS">3 Bathrooms</option>
              </select>
            </label>
            <label className="text-caption">Square Footage: {squareFootage.toLocaleString()} sq ft
              <div className="relative mt-2">
                <RangeSlider 
                  min={1}
                  max={3000}
                  defaultValue={50}
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
          </form>
        </div>
      </div>
    </section>
  );
}
