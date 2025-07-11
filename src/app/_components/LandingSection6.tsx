import MultiImagesIcon from "@/components/icons/MultiImagesIcon";
import VideoIcon from "@/components/icons/VideoIcon";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingSection6() {
  const projects = [
    {
      image: "/landing-section6-figure1.jpg",
      type: "multi-images",
      link: "/services",
    },
    {
      image: "/landing-section6-figure2.jpg",
      link: "/services",
    },
    {
      image: "/landing-section6-figure3.jpg",
      type: "multi-images",
      link: "/services",
    },
    {
      image: "/landing-section6-figure4.jpg",
      type: "video",
      link: "/services",
    },
    {
      image: "/landing-section6-figure5.jpg",
      type: "multi-images",
      link: "/services",
    },
    {
      image: "/landing-section6-figure6.jpg",
      link: "/services",
    },
    {
      image: "/landing-section6-figure7.jpg",
      type: "video",
      link: "/services",
    },
    {
      image: "/landing-section6-figure8.jpg",
      type: "multi-images",
      link: "/services",
    },
    {
      image: "/landing-section6-figure1.jpg",
      type: "video",
      link: "/services",
    },
    {
      image: "/landing-section6-figure2.jpg",
      link: "/services",
    },
    {
      image: "/landing-section6-figure3.jpg",
      type: "multi-images",
      link: "/services",
    },
    {
      image: "/landing-section6-figure4.jpg",
      type: "video",
      link: "/services",
    },
  ];

  return (
    <section className="py-24 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-semibold">
          Some Of Our Cleaning Projects
        </h2>
        <p className="text-subtitle text-surface-500 max-w-[832px] mx-auto">
          At OTTRI LLC, we believe in delivering more than just janitorial and
          office supply services; we provide you with peace of mind and a clean,
          healthy environment.
        </p>
      </div>
      <div className="flex justify-end mb-6">
        <Link
          className="text-primary-500 hover:text-primary-600 transition-colors"
          href="/services"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-max">
        {projects.map((project, index) => (
          <Link key={index} href={project.link} className="block">
            <ProjectCard
              image={project.image}
              type={project.type as "multi-images" | "video" | undefined}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
type ProjectCardProps = {
  image: string;
  type?: "multi-images" | "video";
};

function ProjectCard({ image, type }: ProjectCardProps) {
  return (
    <div
      className={`relative w-full h-48 md:h-56 rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow`}
    >
      <Image
        src={image}
        alt="Cleaning project"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0" />
      {type && (
        <div className="absolute z-20 top-2 right-2 rounded-full p-2 ">
          <div className="w-5 h-5 text-gray-700">
            {type === "multi-images" ? <MultiImagesIcon /> : <VideoIcon />}
          </div>
        </div>
      )}
      <div className="absolute inset-0 h-full w-full bg-black/26" />
    </div>
  );
}
///"/landing-section3-figure1.jpg"
