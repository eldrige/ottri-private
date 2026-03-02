import { Cleaner } from "@/app/admin/types";
import React from "react";
import {
  Star,
  Clock,
  MapPin,
  Calendar,
  Globe,
  MessageCircle
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function CleanerProfile({ cleaner }: { cleaner: Cleaner }) {
  return (
    <div className="bg-white text-secondary-700 h-fit py-5 rounded-lg shadow-lg overflow-hidden">
      {/* Header Image */}
      <div className="relative h-32">
        <Image
          src={cleaner.profile}
          width={500}
          height={500}
          alt="Cleaner at work"
          className="w-full h-full object-cover blur-xs"
        />

        {/* Profile Picture */}
        <div className="absolute bottom-0 left-7 transform translate-y-1/2">
          <div className="w-25 h-25 rounded-full border-3 border-white overflow-hidden bg-white">
            <Image
              src={cleaner.profile}
              width={500}
              height={500}
              alt={cleaner.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 px-6 pb-6 space-y-4">
        {/* Name and Title */}
        <div className="mb-3">
          <h1 className="text-3xl font-semibold mb-3">{cleaner.fullName}</h1>
          <p className="text-xl capitalize">
            {cleaner.user.role.toLowerCase()}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-warning fill-current" />
            <span>
              {cleaner.stats.averageRating || "4.9"} (
              {cleaner.stats.totalBookings} Reviews)
            </span>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-700" />
            <span className="capitalize">{cleaner.experience} Experience</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-700" />
            <span>
              {cleaner.serviceAreas.map((i) => i.name).join(", ") || "N/A"}
            </span>
          </div>

          {/* Join Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-700" />
            <span>
              Joined {format(cleaner.createdAt, "MMMM y") || "June 2025"}
            </span>
          </div>
        </div>

        <hr className="text-black/10" />

        {/* Languages */}
        <div className="mb-4">
          <h3 className="text-lg text-gray-800 mb-2">Languages</h3>
          <div className="flex gap-3">
            {cleaner.languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary-700/10 p-2 rounded-xl"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties */}
        {cleaner.specialties.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg  text-gray-800 mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-3">
              {cleaner.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-2 py-1 rounded-lg text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button size={"xs"} className="w-full">
            Book with {cleaner.fullName.split(" ")[0]}
          </Button>

          <Button
            size={"xs"}
            variant={"default-outline"}
            className="w-full flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Live chat support
          </Button>
        </div>
      </div>
    </div>
  );
}
