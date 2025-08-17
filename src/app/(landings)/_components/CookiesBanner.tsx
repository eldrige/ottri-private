"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

export default function CookiesBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full flex justify-center px-4 z-40 transition-all duration-300",
        show ? "translate-y-0 visible" : "translate-y-full invisible"
      )}
    >
      <div className="py-4 px-8 md:p-8 bg-white rounded-t-2xl flex flex-col md:flex-row items-start gap-4 container max-w-4xl shadow-lg shadow-black/25 border-2 border-b-0 border-primary-700">
        <div className="bg-primary-700 text-white p-1 rounded">
          <Cookie size={24} />
        </div>
        <div>
          <h2 className="text-heading-4 text-secondary-700">
            We Use Cookies To Improve Your Experience
          </h2>
          <p className="text-subtitle text-surface-500 mt-3 md:mt-6">
            We use cookies to enhance your browsing experience, provide
            personalized content, and analyze our traffic. By clicking
            &quot;Accept All&quot;, you consent to our use of cookies. You can
            customize your preferences or learn more in our
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-8">
            <Button onClick={() => setShow(!show)} size="xs">
              Accept All
            </Button>
            <Button
              onClick={() => setShow(!show)}
              size="xs"
              variant="ghost-secondary"
            >
              Decline All
            </Button>
            <Button
              size="xs"
              variant="secondary"
              className="-order-1 md:order-none"
            >
              Customize
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
