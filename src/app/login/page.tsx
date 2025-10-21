"use client";

import React, { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LockIcon, MailIcon, StarIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import Hero from "@/assets/hero-login.jpg";
import Reviewer from "@/assets/reviewer.png";
import Sparkles from "@/components/icons/Sparkles";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { UserData } from "@/lib/types";

export default function Login() {
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
        <LoginForm />
      </Suspense>
    </div>
  );
}
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const userRedirectPath = searchParams.get("from")?.includes("dashboard")
    ? searchParams.get("from") || ""
    : "/dashboard";
  const adminRedirectPath = searchParams.get("from")?.includes("admin")
    ? searchParams.get("from") || ""
    : "/admin";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data: UserData = response.data;

      // Redirect to the original page or admin dashboard
      if (data.role === "USER") {
        router.push(userRedirectPath);
      } else {
        router.push(adminRedirectPath);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-1 justify-center relative z-10 items-center w-full h-screen">
      <div className="absolute md:hidden -z-10 w-full h-full top-0 left-0">
        <div className="bg-black/80 absolute w-full h-full" />
        <Image
          alt="Login Image"
          src={Hero}
          className="h-full w-full object-cover"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full max-w-md p-6 space-y-8 ">
        <Sparkles className="hidden md:block mx-auto" />
        <div className="md:hidden flex items-center justify-center w-full">
          <LogoComponent />
        </div>
        <div>
          <h1 className="text-3xl text-white md:text-secondary-900 font-medium text-center">
            Welcome Back!
          </h1>
          <p className="mt-2 text-center text-white/80 md:text-secondary-800">
            Please input your email and password in the field provided below to
            continue with your account.
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <MailIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          <div>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full py-2 border-b md:text-secondary-700 text-white border-white/80 placeholder-white/80 md:border-secondary-800 md:placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <LockIcon className="absolute right-0 top-3 h-4 w-4 text-white/80 md:text-secondary-800" />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-[16px] text-[#FFFFFF] flex justify-center py-2 px-4"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-white/80 md:text-secondary-800 text-sm">
            {"Don't have an account yet? "}
            <Link
              href={`/register${userRedirectPath ? `?from=${userRedirectPath}` : ""}`}
              className="text-primary-700 hover:text-primary-800 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function DesktopLeftSection() {
  return (
    <section className="hidden flex-1 md:flex relative flex-col h-svh p-8">
      <LogoComponent />

      {/* Main background with rounded corners */}
      <div className="absolute -z-10 top-0 left-0">
        <div className="bg-black/70 rounded-r-4xl absolute w-full h-full" />
        <Image
          alt="Login Image"
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
            className=" rounded-full  object-cover"
            alt="Reviewer Image"
            src={Reviewer}
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-fit flex flex-col ">
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
