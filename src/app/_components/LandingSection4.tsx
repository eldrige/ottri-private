'use client';
import StartIcon from "@/components/icons/StartIcon";
import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Sara from "@/assets/sara1.png";
import Sara2 from "@/assets/sara2.png";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";

export default function LandingSection4() {
    return (
        <div className="flex flex-col gap-16 py-24 px-36">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-heading-3 font-medium">What Our Customers Say</h1>
                <p className="text-surface-500">
                    Join thousands of satisfied customers who trust Ottri with their homes
                </p>
                <div className="flex items-center gap-0.5">
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                    <StartIcon />
                </div>
                <p className="text-surface-500">
                    4.9 out of 5 stars{" "}
                    <span className="text-primary-700 ml-2">2,45 + reviews</span>
                </p>
            </div>
            <ReviewSlider />
        </div>
    );
}

type ReviewCardProps = {
    name: string;
    location: string;
    review: string;
    service: string;
    image: StaticImageData;
};

function ReviewCard({
    name,
    location,
    review,
    service,
    image,
}: ReviewCardProps) {
    return (
        <div className="bg-white xl:min-w-100 ml-8 xl:min-h-76.25 p-6 justify-between flex flex-col gap-4 rounded-lg shadow-custom">
            <div className="flex items-center gap-0.5">
                <StartIcon />
                <StartIcon />
                <StartIcon />
                <StartIcon />
                <StartIcon />
            </div>
            <p className="text-surface-700">{review}</p>
            <hr />
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <Image
                        className="flex-1 rounded-full h-fit"
                        src={image}
                        width="50"
                        alt={`${name}'s Image`}
                    />
                    <div className="">
                        <p className="text-lg ">{name}</p>
                        <span className="text-surface-500 text-base ">{location}</span>
                    </div>
                </div>
                <p className="text-primary-700">{service}</p>
            </div>
        </div>
    );
}

function ReviewSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const reviews = [
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”",
            service: "Recurring Cleaning",
            image: Sara
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "Move-out Cleaning",
            image: Sara2
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "One-Time Cleaning",
            image: Sara2
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”",
            service: "Recurring Cleaning",
            image: Sara
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "Move-out Cleaning",
            image: Sara2
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "One-Time Cleaning",
            image: Sara2
        }
    ];

    const goToPrev = () => {
        if (isTransitioning) return; // Prevent rapid clicks
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1)); // Stay at 0 if at start
    };

    const goToNext = () => {
        if (isTransitioning) return; // Prevent rapid clicks
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1)); // Reset to 0 if at end
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
            sliderRef.current.style.transform = `translateX(-${currentIndex * 450}px)`; // 450px is card width
        }
        // Reset transition state after animation completes
        const timeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 500); // Match transition duration

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        <div className="w-full py-8 overflow-hidden">
            <div
                ref={sliderRef}
                className="flex"
                style={{ width: `${reviews.length * 450}px` }} // Total width for all cards
            >
                {reviews.map((review, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: '450px' }}>
                        <ReviewCard
                            name={review.name}
                            location={review.location}
                            review={review.review}
                            service={review.service}
                            image={review.image}
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-10 max-w-[82rem] mx-auto w-full items-center justify-end mt-4">
                <button
                    onClick={goToPrev}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous review"
                    disabled={isTransitioning || currentIndex === 0}
                >
                    <LeftArrowIcon />
                </button>
                <button
                    onClick={goToNext}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next review"
                    disabled={isTransitioning}
                >
                    <RightArrowIcon />
                </button>
            </div>
        </div>
    );
}