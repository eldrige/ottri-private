'use client';
import StartIcon from "@/components/icons/StartIcon";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import Sara from "@/assets/sara1.png";
import Sara2 from "@/assets/sara2.png";
import CheckIcon from "@/components/icons/CheckIcon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi, } from "@/components/ui/Carousel";

export default function LandingSection4() {
    return (
        <div className="flex w-full text-center flex-col px-4 md:px-0 gap-16 py-24">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-heading-3 font-medium">What Our Customers Say</h1>
                <p className="text-surface-500">
                    Join thousands of satisfied customers who trust Ottri with their homes
                </p>
                <StarRating rating={5} />
                <p className="text-surface-500">
                    4.9 out of 5 stars{" "}
                    <span className="text-primary-700 ml-2">2,45+ reviews</span>
                </p>
            </div>
            <ReviewSlider />
            <ul className="pt-8 sm:pt-24 w-full md:py-32 grid grid-cols-1 sm:grid-cols-2 text-lg lg:grid-cols-4 text-surface-500 *:items-center *:flex md:*:justify-center *:gap-2 gap-7">
                <li>
                    <CheckIcon />
                    <p>Insured & Bonded</p>
                </li>
                <li>
                    <CheckIcon />
                    <p>Background Checked</p>
                </li>
                <li>
                    <CheckIcon />
                    <p>Satisfaction Guaranteed</p>
                </li>
                <li>
                    <CheckIcon />
                    <p>Licensed Professionals</p>
                </li>
            </ul>
        </div>
    );
}

type ReviewCardProps = {
    name: string;
    location: string;
    reviewMessage: string;
    review: number;
    service: string;
    image: StaticImageData;
};

function ReviewCard({
    name,
    location,
    reviewMessage,
    review,
    service,
    image,
}: ReviewCardProps) {
    return (
        <div className="bg-white h-full text-surface-500 xl:min-w-98 xl:min-h-76.25 p-6 justify-between flex flex-col gap-2 md:gap-4 rounded-lg shadow-custom">
            <StarRating rating={review} />
            <p className="text-left">{reviewMessage}</p>
            <hr className="border-0.25 border-surface-500/40" />
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <Image
                        className="flex-shrink-0 rounded-full w-10 h-10 object-cover"
                        src={image}
                        width="48"
                        height="48"
                        alt={`${name}'s Image`}
                    />
                    <div className="flex justify-end text-nowrap items-start flex-col">
                        <p className="text-[0.9rem] md:text-lg ">{name}</p>
                        <p className="text-xs">{location}</p>
                    </div>
                </div>
                <p className="text-primary-700 text-sm sm:text-base">{service}</p>
            </div>
        </div>
    );
}
type StarRatingProps = {
    rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
                <StartIcon
                    key={index}
                    className={index < rating ? "text-yellow-400 fill-current" : "*:fill-white *:stroke-yellow-400"}
                />
            ))}
        </div>
    );
};


function ReviewSlider() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    const reviews = [
        {
            name: "Sara Johnson",
            location: "Downtown",
            reviewMessage: "“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”",
            service: "Recurring Cleaning",
            image: Sara,
            review: 5
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            reviewMessage: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "Move-out Cleaning",
            image: Sara2,
            review: 5

        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            reviewMessage: "“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”",
            service: "Recurring Cleaning",
            image: Sara,
            review: 5
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            reviewMessage: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "Move-out Cleaning",
            image: Sara2,
            review: 5

        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            reviewMessage: "“Trustworthy and dedicated - OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”",
            service: "One-Time Cleaning",
            image: Sara2,
            review: 5
        },
        {
            name: "Sara Johnson",
            location: "Downtown",
            reviewMessage: "“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”",
            service: "Recurring Cleaning",
            image: Sara,
            review: 5
        },
    ];

    useEffect(() => {
        if (!api) return

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])
    return (
        <Carousel setApi={setApi}
            opts={{
                align: "start",
            }}
            className="w-full mx-auto"
        >
            <CarouselContent className="my-4 mr-2 ml-0.25 md:px-6  flex gap-2">
                {reviews.map((review, index) => (
                    <CarouselItem
                        key={index}
                        className=" basis-full md:basis-1/2 lg:basis-1/3"
                    >
                        <ReviewCard
                            {...review}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* Dots */}
            <div className="flex flex-col items-center mt-6">
                <div className="flex md:hidden gap-2  mb-3">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => api?.scrollTo(i)}
                            className={`size-3 rounded-full ${current === i ? 'bg-primary-700' : 'bg-surface-300'}`}
                        />
                    ))}
                </div>

                {/* Navigation buttons - centered on mobile, right-aligned on desktop */}
                <div className="flex gap-2 w-full justify-center sm:justify-end">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </div>
        </Carousel>
    );
}