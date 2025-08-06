"use client";
import React, { useState } from "react";
import Image from "next/image";
import userImage from "@/assets/user-profile-figure.png";
import { MailIcon, Phone } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProfileSection2() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col gap-16">
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
            <p>123-Main st, Apt 4B, New York, NY 1001</p>
          </div>
        </div>
      </div>
      <PersonalInfoForm />
    </section>
  );
}

type User = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  yearJoined: number;
};

function PersonalInfoForm() {
  const [formData, setFormData] = useState<User>({
    fullName: "Jenny Murphy",
    email: "jennymurphy@gmail.com",
    phone: "(555) 123-4567",
    address: "123-Main st, Apt 4B, New York, NY 1001",
    yearJoined: 2023,
  });

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col justify-between gap-8">
      <div>
        <h1 className="font-medium text-2xl text-secondary-700">
          Personal Information
        </h1>
        <p className="text-surface-500 text-body">
          update your personal details
        </p>
      </div>
      <form
        action=""
        className="flex *:flex *:flex-col *:gap-2 text-secondary-700 flex-col gap-3"
      >
        <label>
          Fullname
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleOnchange}
          />
        </label>
        <label>
          Email
          <Input
            name="email"
            value={formData.email}
            onChange={handleOnchange}
          />
        </label>
        <label>
          Phone
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleOnchange}
          />
        </label>
        <label>
          Address
          <Input
            name="address"
            value={formData.address}
            onChange={handleOnchange}
          />
        </label>
        <Button
          type="submit"
          size={"xs"}
          className="hover:border-secondary-700 my-3 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
