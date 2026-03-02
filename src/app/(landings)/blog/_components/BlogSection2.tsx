import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React from "react";

export default function BlogSection2() {
  return (
    <div className="bg-secondary-700 py-8 md:py-16 flex items-center justify-center mb-12">
      <div className="flex flex-col px-6 md:px-0 text-center items-center gap-2 justify-center">
        <h2 className="text-heading-2.5 text-white">
          Stay Updated with Cleaning Tips
        </h2>
        <p className="text-surface-300/80 text-center">
          Get weekly cleaning tips, exclusive guides, and special offers
          delivered to your inbox.
        </p>
        <div className="w-full max-w-xl mt-2">
          <form
            className="flex flex-col md:flex-row items-center gap-2 w-full"
            action=""
          >
            <Input
              className="py-3 w-full md:flex-2"
              name="email"
              type="text"
              placeholder="Enter your email...."
            />
            <Button
              className="text-body py-2 md:flex-1 border-secondary-700 w-full text-white text-lg hover:border-primary-700"
              type="submit"
            >
              Subscribe
            </Button>
          </form>
        </div>
        <p className="text-surface-300/80 text-center">
          No spam, unsubscribe anytime. Join 2,000+ happy subscribers.
        </p>
      </div>
    </div>
  );
}
