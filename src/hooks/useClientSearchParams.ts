"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function useClientSearchParams() {
  const pathname = usePathname();
  const initialSearchParams = useSearchParams();
  const [currentParams, setCurrentParams] = useState(
    () => new URLSearchParams(initialSearchParams.toString())
  );

  const setSearchParam = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(currentParams.toString());
      if (value) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }

      const queryString = newParams.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      window.history.pushState({}, "", newUrl);
      setCurrentParams(newParams);
    },
    [pathname, currentParams]
  );

  return { setSearchParam, searchParams: currentParams };
}
