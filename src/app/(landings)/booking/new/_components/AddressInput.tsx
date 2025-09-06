import { Input } from "@/components/ui/Input";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

interface ApiResType {
  results: Result[];
}

interface Result {
  country_code: string;
  housenumber: string;
  street: string;
  country: string;
  county: string;
  postcode: string;
  state: string;
  state_code: string;
  county_code?: string;
  district?: string;
  city: string;
  lon: number;
  lat: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  plus_code: string;
  plus_code_short: string;
  iso3166_2: string;
  rank: Rank;
  place_id: string;
  name?: string;
  ref?: string;
  hamlet?: string;
  category?: string;
}

interface Rank {
  confidence: number;
  confidence_street_level: number;
  confidence_building_level: number;
  match_type: string;
  importance?: number;
}

interface AddressInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  label?: string;
}

export default function AddressInput({
  value = "",
  onChange,
  placeholder = "Enter address",
  error,
  required,
  label
}: AddressInputProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [apiResults, setApiResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (searchTerm.trim().length < 3) {
        setApiResults([]);
        return;
      }
      //777 Brockton Avenue, Abington MA 2351
      setIsLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchTerm}&filter=countrycode:us&apiKey=${apiKey}&format=json`
        );
        console.log(res.data);
        const data = res.data as ApiResType;
        setApiResults(data.results);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setApiResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchAutocomplete();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
    if (onChange && value.trim() === "") {
      onChange("");
    }
  };

  const formatUSAddress = (address: string): string => {
    return address
      .replace(/, United States of America$/, "")
      .replace(/, USA$/, "")
      .replace(/, United States$/, "");
  };

  const handleSelectAddress = (address: string) => {
    const formattedAddress = formatUSAddress(address);
    setSearchTerm(formattedAddress);
    if (onChange) {
      onChange(formattedAddress);
    }
    setShowDropdown(false);
  };
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setShowDropdown(true)}
          aria-label="Address search"
          aria-autocomplete="list"
          aria-controls="address-suggestions"
          aria-expanded={showDropdown && apiResults.length > 0}
          required={required}
          label={label}
        />
        {isLoading && (
          <div className="absolute right-3 bottom-3 transform">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-error mt-1">{error}</p>}

      {showDropdown && apiResults.length > 0 && (
        <div
          ref={dropdownRef}
          id="address-suggestions"
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md border border-gray-200 overflow-auto"
        >
          <ul role="listbox">
            {apiResults.map((result, index) => {
              const formattedAddress = formatUSAddress(result.formatted);
              return (
                <li
                  key={result.place_id || index}
                  role="option"
                  aria-selected={searchTerm === formattedAddress}
                  className="px-4 py-2 hover:bg-primary-50 cursor-pointer text-sm"
                  onClick={() => handleSelectAddress(result.formatted)}
                >
                  {formattedAddress}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
