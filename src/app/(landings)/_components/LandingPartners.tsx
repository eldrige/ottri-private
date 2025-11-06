"use client";
import React from "react";
import Image from "next/image";
import partner1 from "@/assets/partner1.png";
import partner2 from "@/assets/partner2.png";
import partner3 from "@/assets/partner3.png";
import partner4 from "@/assets/partner4.png";
import partner5 from "@/assets/partner5.png";

export default function LandingPartners() {
  // For now using the same image, but you can add more partner images later
  const partners = [
    { id: 1, image: partner1, alt: "Partner 1" },
    { id: 2, image: partner2, alt: "Partner 2" },
    { id: 3, image: partner3, alt: "Partner 3" },
    { id: 4, image: partner4, alt: "Partner 4" },
    { id: 5, image: partner5, alt: "Partner 5" }
  ];

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 overflow-hidden bg-white">
      <div className="relative">
        <div className="flex animate-scroll gap-12 md:gap-16">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 transition-all duration-300 "
            >
              <Image
                src={partner.image}
                alt={partner.alt}
                width={500}
                height={500}
                className="object-contain h-16 md:h-32 w-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
