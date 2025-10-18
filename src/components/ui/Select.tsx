"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: SelectOption;
  onChange?: (option: SelectOption) => void;
  className?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  buttonClassName?: string;
  accent?: "primary" | "secondary";
  initialValue?: SelectOption;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
  placeholder = "Select option",
  error,
  disabled = false,
  buttonClassName = "",
  accent = "primary",
  initialValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`flex flex-col ${disabled ? "opacity-50" : ""} ${className}`}
      ref={selectRef}
    >
      {label && (
        <div className="text-gray-800 text-sm font-normal mb-2">{label}</div>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full rounded-lg bg-gray-50 px-4 py-3 text-left flex justify-between items-center border min-w-fit",
            error ? "border-error" : "border-gray-200",
            buttonClassName
          )}
          disabled={disabled}
        >
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : initialValue ? (
            <span>{initialValue?.label}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronDown
            className={`w-5 h-5 transition-transform text-secondary-700/50 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute min-w-full z-10 mt-1 px-3 py-3 space-y-1.5 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  px-2 py-1.5 cursor-pointer rounded
                  ${
                    selectedOption?.value === option.value &&
                    accent === "primary"
                      ? "bg-primary-700 text-white"
                      : selectedOption?.value === option.value &&
                          accent === "secondary"
                        ? "bg-secondary-700 text-white"
                        : "hover:bg-gray-100"
                  }
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};

export default Select;
