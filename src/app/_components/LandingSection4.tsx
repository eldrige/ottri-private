'use client'
import StartIcon from "@/components/icons/StartIcon";
import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Sara from "@/assets/sara1.png";
import Sara2 from "@/assets/sara2.png";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";

export default function LandingSection4() {
    return (
        <div className="flex flex-col gap-16 py-24 px-32">
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
        <div className="bg-white xl:min-w-100 ml-8 xl:min-h-76.25 p-6 justify-between flex flex-col gap-4 rounded-lg shadow-custom flex-1">
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
            review: "“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "Move-out Cleaning",
            image: Sara2
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
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
            review: "“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "Move-out Cleaning",
            image: Sara2
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            review: "“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "One-Time Cleaning",
            image: Sara2
        }
    ];

    const goToPrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? reviews.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === reviews.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Auto-scroll to the current index
    useEffect(() => {
        if (sliderRef.current) {
            const cardWidth = 700; // Adjust based on your card width
            sliderRef.current.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    return (
        <div className="w-full ">
            <div
                ref={sliderRef}
                className="flex overflow-x-auto py-5 scrollbar-hide snap-x snap-mandatory  [scrollbar-width:none] [-ms-overflow-style:none] 
             [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {reviews.map((review, index) => (
                    <div key={index} className="snap-start">
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

            <div className="self-end gap-10 max-w-[82rem] mx-auto flex w-full items-center justify-end mt-4">
                <button
                    onClick={goToPrev}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous review"
                >
                    <LeftArrowIcon />
                </button>
                <button
                    onClick={goToNext}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next review"
                >
                    <RightArrowIcon />
                </button>
            </div>
        </div>
    );
}