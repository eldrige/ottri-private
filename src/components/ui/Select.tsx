import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

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
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Select option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    <div className={`flex flex-col ${className}`} ref={selectRef}>
      {label && (
        <div className="text-gray-800 text-sm font-normal mb-2">{label}</div>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-lg bg-gray-50 px-4 py-3 text-left flex justify-between items-center border border-gray-200"
        >
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronDown
            className={`w-5 h-5 transition-transform text-secondary-700/50 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 px-3 py-3 space-y-1.5 w-full rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  px-2 py-1.5 cursor-pointer rounded
                  ${selectedOption?.value === option.value ? 'bg-primary-700 text-white' : 'hover:bg-gray-100'}
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
