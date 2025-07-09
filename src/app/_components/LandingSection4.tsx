'use client';
import StartIcon from "@/components/icons/StartIcon";
import Image, { StaticImageData } from "next/image";
import React from "react";
import Sara from "@/assets/sara1.png";
import Sara2 from "@/assets/sara2.png";
import CheckIcon from "@/components/icons/CheckIcon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";

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
            <ul className="pt-16 text-surface-500 flex items-center *:flex *:gap-2 gap-10 *:items-center justify-center">
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
        <div className="bg-white h-full text-surface-500 xl:min-w-98 xl:min-h-76.25 p-6 justify-between flex flex-col gap-4 rounded-lg shadow-custom">
            <StarRating rating={review} />
            <p>{reviewMessage}</p>
            <hr className="border-0.25 border-surface-500/40" />
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <Image
                        className="flex-shrink-0 rounded-full w-12 h-12 object-cover"
                        src={image}
                        width="48"
                        height="48"
                        alt={`${name}'s Image`}
                    />
                    <div className="">
                        <p className="text-lg ">{name}</p>
                        <span>{location}</span>
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
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [isTransitioning, setIsTransitioning] = useState(false);
    // const sliderRef = useRef<HTMLDivElement>(null);

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

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full mx-auto"
        >
            <CarouselContent className="p-2">
                {reviews.map((review, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                        <ReviewCard
                            name={review.name}
                            location={review.location}
                            reviewMessage={review.reviewMessage}
                            service={review.service}
                            image={review.image}
                            review={review.review}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Navigation buttons - centered on mobile, right-aligned on desktop */}
            <div className="flex gap-2 w-full justify-center sm:justify-end mt-6">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    );
}