"use client";

import React, { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  LockIcon,
  MailIcon,
  StarIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon
} from "lucide-react";
import logo from "@/assets/logo.png";
import Hero from "@/assets/hero-login.jpg";
import Reviewer from "@/assets/reviewer.png";
import Sparkles from "@/components/icons/Sparkles";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            Loading...
          </div>
        }
      >
        <DesktopLeftSection />
        <SignupForm />
      </Suspense>
    </div>
  );
}

function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    zipCode: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") || "/dashboard";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Signup failed");
      }

      // Redirect to login or dashboard
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-2 justify-center relative z-10 items-center w-full min-h-screen py-8">
      <div className="absolute md:hidden -z-10 w-full h-full top-0 left-0">
        <div className="bg-black/80 absolute w-full h-full" />
        <Image
          alt="Signup Image"
          src={Hero}
          className="rounded-r-4xl h-screen w-full object-cover"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full max-w-md p-6 space-y-6">
        <Sparkles className="hidden md:block mx-auto" />
        <div className="md:hidden flex items-center justify-center w-full">
          <LogoComponent />
        </div>
        <div>
          <h1 className="text-3xl text-white md:text-secondary-900 font-medium text-center">
            Create Account!
          </h1>
          <p className="mt-2 text-center text-white/80 md:text-secondary-800">
            Please fill in the information below to create your account and get
            started.
          </p>
        </div>

        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <div className="mt-1 relative">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                placeholder="Full Name"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <UserIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                placeholder="Email"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <MailIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <LockIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <div className="mt-1 relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                placeholder="Phone Number"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <PhoneIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="mt-1 relative">
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                placeholder="Street Address"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <MapPinIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                placeholder="City"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                id="state"
                name="state"
                type="text"
                required
                value={formData.state}
                placeholder="State"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Country and Zip Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                id="country"
                name="country"
                type="text"
                required
                value={formData.country}
                placeholder="Country"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                required
                value={formData.zipCode}
                placeholder="Zip Code"
                onChange={handleInputChange}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-[16px] text-[#FFFFFF] flex justify-center py-2 px-4"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-white/80 md:text-secondary-800 text-sm">
            Already have an account?{" "}
            <Link
              href={`/login${redirectPath ? `?from=${redirectPath}` : ""}`}
              className="text-primary-700 hover:text-primary-800 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function DesktopLeftSection() {
  return (
    <section className="hidden flex-3 md:flex relative flex-col h-screen p-8">
      <LogoComponent />

      {/* Main background with rounded corners */}
      <div className="absolute -z-10 top-0 left-0">
        <div className="bg-black/70 rounded-r-4xl absolute w-full h-full" />
        <Image
          alt="Signup Image"
          src={Hero}
          className="hidden rounded-r-4xl md:block h-screen w-full object-cover"
          width={1000}
          height={1000}
        />
      </div>

      {/* White triangle overlay to create diagonal cut effect */}
      <div
        className="absolute top-0 -right-1 w-0 h-0 z-10"
        style={{
          borderLeft: "130px solid transparent",
          borderBottom: "100vh solid white"
        }}
      />

      <div className="absolute w-[45%] bottom-20 left-10 bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-white gap-4 flex">
        <div className="size-14">
          <Image
            className="rounded-full object-cover"
            alt="Reviewer Image"
            src={Reviewer}
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-fit flex flex-col">
          <div className="w-fit flex">
            {[0, 0, 0, 0, 0].map((_, i) => (
              <StarIcon
                key={i}
                className="h-5 w-5 fill-[#FBC503] text-[#FBC503]"
              />
            ))}
          </div>
          <div className="">
            <p>{'"Amazing service! My house has never been cleaner."'}</p>
            <p className="text-sm w-fit">- Sarah M.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoComponent() {
  return (
    <div className="flex gap-2.5 items-center">
      <Image src={logo} alt="Ottri Logo" width={40} height={40} />
      <h3 className="text-white font-medium text-2xl">Ottri</h3>
    </div>
  );
}
