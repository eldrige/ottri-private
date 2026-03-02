"use client";

import { useState } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  id?: string;
  className?: string;
  thumbSize?: number; // in pixels
  sliderHeight?: number; // in pixels
  trackColor?: string;
  progressColor?: string;
  thumbColor?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export default function RangeSlider({
  min = 1,
  max = 100,
  defaultValue = 50,
  id = "customRange",
  className = "",
  sliderHeight = 12,
  trackColor = "var(--color-surface-200)",
  progressColor = "var(--color-secondary-700)",
  disabled = false,
  onChange
}: RangeSliderProps) {
  const [value, setValue] = useState(defaultValue);

  // Only call onChange when value changes, not on every render
  const handleChange = (newValue: number) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Calculate progress percentage directly in render
  const progressPercentage = ((value - min) / (max - min)) * 100;
  const progressWidthValue = `${progressPercentage}%`;
  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative"
        style={{
          height: `${sliderHeight}px`,
          borderRadius: `${sliderHeight / 2}px`,
          backgroundColor: trackColor
        }}
      >
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: +progressWidthValue.slice(0, -1) + 1 + "%",
            backgroundColor: progressColor,
            borderRadius: `${sliderHeight / 2}px`
          }}
        >
          <div className="h-[80%] aspect-square rounded-full bg-white absolute right-px -translate-y-1/2 top-1/2" />
        </div>

        {/* Input range (invisible but functional) */}
        <input
          type="range"
          id={id}
          min={min + 499}
          max={max}
          step={500}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 10 }}
        />

        {/* Custom thumb */}
        {/* <div
          className="absolute top-0"
          style={{
            left: progressWidthValue,
            transform: "translateX(-50%)",
            width: `${thumbSize}px`,
            height: `${thumbSize}px`,
            backgroundColor: thumbColor,
            borderRadius: "50%",
            marginTop: `${thumbOffset}px`,
            pointerEvents: "none",
            // transition: "left 0.1s ease-out",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        /> */}
      </div>
    </div>
  );
}
