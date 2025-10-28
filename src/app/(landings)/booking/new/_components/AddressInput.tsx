import { Input } from "@/components/ui/Input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react";

interface ApiResType {
  results: AddressDetails[];
}

export interface AddressDetails {
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
  onChange?: (value: string | null, result?: AddressDetails) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  label?: string;
  onSelectedAddress?: (address: AddressDetails | null) => void;
}

export default function AddressInput({
  value = "",
  onChange,
  placeholder = "Enter address",
  error,
  required,
  label,
  onSelectedAddress
}: AddressInputProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [apiResults, setApiResults] = useState<AddressDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatUSAddress = (address: string): string => {
    return address
      .replace(/, United States of America$/, "")
      .replace(/, USA$/, "")
      .replace(/, United States$/, "");
  };
  const handleSelectAddress = (address: AddressDetails | null) => {
    if (address) {
      const formattedAddress = formatUSAddress(address.formatted);
      if (onChange) {
        onChange(formattedAddress, address);
        setSearchTerm(formattedAddress);
      }
      if (onSelectedAddress) {
        onSelectedAddress(address);
      }
    } else {
      if (onChange) {
        onChange(null);
      }
      if (onSelectedAddress) {
        onSelectedAddress(null);
      }
    }
  };

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchTerm(value);
    if (onChange && value.trim() === "") {
      onChange("");
      setApiResults([]);
    }
    if (value.trim().length < 3) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (searchTerm.trim().length < 3) {
        setApiResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchTerm}&filter=countrycode:us&apiKey=${apiKey}&format=json`
        );
        const data = res.data as ApiResType;
        setApiResults(data.results);
        if (
          data.results.length > 0 &&
          formatUSAddress(data.results[0].formatted) === value
        ) {
          handleSelectAddress(data.results[0]);
        } else if (value) {
          handleSelectAddress(null);
          handleSearch(value);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      <Combobox onChange={handleSelectAddress}>
        <div className="relative w-full">
          <ComboboxInput
            as={Input}
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              handleSearch(value);
            }}
            placeholder={placeholder}
            required={required}
            label={label}
            aria-label="Address search"
            className="w-full"
            displayValue={() => searchTerm}
          />

          {isLoading && (
            <div className="absolute right-3 bottom-3 transform">
              <div className="animate-spin h-4 w-4 border-2 border-primary-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>

        {error && <p className="text-xs text-error mt-1">{error}</p>}

        <ComboboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md border border-gray-200 overflow-auto">
          {apiResults.length === 0 &&
          searchTerm.trim().length >= 3 &&
          !isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found
            </div>
          ) : (
            apiResults.map((result, index) => (
              <ComboboxOption
                key={index}
                value={result}
                className={({ focus }) =>
                  `px-4 py-2 cursor-pointer text-sm ${focus ? "bg-gray-100" : ""}`
                }
              >
                {formatUSAddress(result.formatted)}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
