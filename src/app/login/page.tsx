"use client";

import React, { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LockIcon, MailIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import Sparkles from "@/components/icons/Sparkles";
import Image from "next/image";

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
  const redirectPath = searchParams.get("from") || "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      // Redirect to the original page or admin dashboard
      router.push(redirectPath);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-2 justify-center items-center w-full h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 ">
        <Sparkles className=" mx-auto" />
        <div>
          <h1 className="text-3xl font-medium text-center">Welcome Back!</h1>
          <p className="mt-2 text-center text-secondary-800">
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                className="appearance-none block w-full py-2 border-b border-secondary-800 placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <MailIcon className="absolute right-0 top-3 h-4 w-4 text-secondary-800" />
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
                className="appearance-none block w-full py-2 border-b border-secondary-800 placeholder-secondary-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <LockIcon className="absolute right-0 top-3 h-4 w-4 text-secondary-800" />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function DesktopLeftSection() {
  return (
    <section className="hidden flex-3 md:flex relative flex-col justify-between items-center w-96 h-screen p-8">
      <div className="absolute top-0 left-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Login Image"
          className="hidden md:block h-screen w-96 object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <Image src={logo} alt="Ottri Logo" width={40} height={40} />
        <h3 className="text-white font-medium text-2xl">Ottri</h3>
      </div>
    </section>
  );
}
