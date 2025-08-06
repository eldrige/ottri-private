import React from "react";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { MailIcon, Phone } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";

export default function ProfileSection2() {
  return (
    <section className="flex gap-5 *:flex-1/2">
      <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col justify-between gap-16">
        <div className="w-full items-center flex flex-col">
          <Image
            className="rounded-full size-25"
            src={userImage}
            alt={"user profile"}
          />
          <div className="flex items-center flex-col">
            <h1 className="font-medium text-2xl text-secondary-700">
              Jenny Murphy
            </h1>
            <p className="text-surface-500 text-body text-xs">
              Joined since 2023
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-surface-500 *:items-center *:flex *:gap-2 flex-col">
          <div>
            <MailIcon />
            <p>jennymurphy@gmail.com</p>
          </div>
          <div>
            <Phone />
            <p>(555) 123-4567</p>
          </div>
          <div>
            <LocationIcon />
            <p>(555) 123-4567</p>
          </div>
        </div>
      </div>
      <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col justify-between gap-8"></div>
    </section>
  );
}
