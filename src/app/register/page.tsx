"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
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
import AddressInput, {
  AddressDetails
} from "../(landings)/booking/new/_components/AddressInput";
import axios, { AxiosError } from "axios";

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

interface FormData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  zipCode: string;
  city: string;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") || "/dashboard";

  const addressValue = watch("address");

  const handleAddress = (address: string | null, result?: AddressDetails) => {
    setValue("address", address || "");
    if (result) {
      setValue("city", result?.city || "");
      setValue("state", result?.state || "");
      setValue("country", result?.country || "");
      setValue("zipCode", result?.postcode || "");
    }
  };

  const onSubmit = async (data: FormData) => {
    setError("");

    try {
      await axios.post("/api/user/register", data);
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err.response?.data.message
          : "An error occurred during signup"
      );
    }
  };

  return (
    <section className="flex flex-1 justify-center relative z-10 items-center w-full min-h-screen py-8">
      <div className="absolute md:hidden -z-10 w-full h-full top-0 left-0">
        <div className="bg-black/80 absolute w-full h-full" />
        <Image
          alt="Signup Image"
          src={Hero}
          className="h-full w-full object-cover"
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

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <div className="mt-1 relative">
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <UserIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="mt-1 relative">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <MailIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mt-1 relative">
              <input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <LockIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <div className="mt-1 relative">
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone number is required"
                })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <PhoneIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <div className="mt-1 relative">
              <input
                type="hidden"
                {...register("address", {
                  required: "Valid address is required"
                })}
              />
              <AddressInput
                placeholder="Street Address"
                required
                value={addressValue || ""}
                onChange={handleAddress}
                className="appearance-none block w-full py-2 px-0 pr-5 border-0 rounded-none border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                error={errors.address?.message}
              />
              <MapPinIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                id="city"
                type="text"
                placeholder="City"
                {...register("city", { required: "City is required" })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                id="state"
                type="text"
                placeholder="State"
                {...register("state", { required: "State is required" })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* Country and Zip Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                id="country"
                type="text"
                placeholder="Country"
                {...register("country", { required: "Country is required" })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                id="zipCode"
                type="text"
                placeholder="Zip Code"
                {...register("zipCode", { required: "Zip code is required" })}
                className="appearance-none block w-full py-2 pr-5 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-[16px] text-[#FFFFFF] flex justify-center py-2 px-4"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
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
    <section className="hidden flex-1 md:flex relative flex-col h-screen p-8">
      <LogoComponent />

      {/* Main background with rounded corners */}
      <div className="absolute -z-10 top-0 left-0">
        <div className="bg-black/70 rounded-r-4xl absolute w-full h-full" />
        <Image
          alt="Signup Image"
          src={Hero}
          className="hidden rounded-r-4xl md:block h-svh w-full object-cover"
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
      <Image src={logo} alt="Ottri Logo" className="h-12 max-w-fit" />
    </div>
  );
}
