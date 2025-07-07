import StartIcon from "@/components/icons/StartIcon";
import Image, { StaticImageData } from "next/image";
import React from "react";
import Sara from "@/assets/sara1.png";
import Sara2 from "@/assets/sara2.png";

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
            <div className="flex max-w-[82rem] px-4 mx-auto overflow-x-auto py-5 scrollbar-hide">
                <ReviewCard
                    name="Sara Johnson"
                    location="Downtown"
                    review="“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”"
                    service="Recurring Cleaning"
                    image={Sara}
                />
                <ReviewCard
                    name="Sara Johnson"
                    location="Downtown"
                    review="“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”"
                    service="Move-out Cleaning"
                    image={Sara2}
                />
                <ReviewCard
                    name="Sara Johnson"
                    location="Downtown"
                    review="“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”"
                    service="One-Time Cleaning"
                    image={Sara2}
                />
                <ReviewCard
                    name="Sara Johnson"
                    location="Downtown"
                    review="“Ottri has transformed my home! The team was professional, thorough, and left my place sparkling clean. I highly recommend their services to anyone looking for a reliable cleaning service.”"
                    service="Recurring Cleaning"
                    image={Sara}
                />
                <ReviewCard
                    name="Sara Johnson"
                    location="Downtown"
                    review="“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”"
                    service="Move-out Cleaning"
                    image={Sara2}
                />
                <ReviewCard
                    name="Sara Johnson"
                    location="Downtown"
                    review="“Trustworthy and dedicated – OTTRI Cleaning Services has made a huge difference in our residential cleaning routine. Our home has never looked better.”"
                    service="One-Time Cleaning"
                    image={Sara2}
                />
            </div>
            <div>

            </div>
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
