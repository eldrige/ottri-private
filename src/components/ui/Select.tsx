"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from "@headlessui/react";
import { Fragment } from "react";

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
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(value || initialValue);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div
      className={`flex flex-col ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {label && (
        <div className="text-gray-800 text-sm font-normal mb-2">{label}</div>
      )}

      <Listbox
        value={selectedOption}
        onChange={handleSelect}
        disabled={disabled}
      >
        <div className="relative">
          <ListboxButton
            className={cn(
              "w-full rounded-lg bg-gray-50 px-4 py-3 text-left flex justify-between items-center border min-w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              error ? "border-error" : "border-gray-200",
              buttonClassName
            )}
          >
            {({ active }) => (
              <>
                {selectedOption ? (
                  <span>{selectedOption.label}</span>
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform text-secondary-700/50",
                    active && "rotate-180"
                  )}
                />
              </>
            )}
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute min-w-full z-10 mt-1 px-3 py-3 space-y-1.5 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden focus:outline-none">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ focus, selected }) =>
                    cn(
                      "px-2 py-1.5 cursor-pointer rounded",
                      selected && accent === "primary"
                        ? "bg-primary-700 text-white"
                        : selected && accent === "secondary"
                          ? "bg-secondary-700 text-white"
                          : focus
                            ? "bg-gray-100"
                            : ""
                    )
                  }
                >
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};

export default Select;
