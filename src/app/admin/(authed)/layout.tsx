import React from "react";
import Header from "./_components/Header";
import "./adminStyles.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { getBookings } from "@/lib/api/bookings";
import { BookingsResponse, Cleaner, ServiceOption } from "../types";
import { axiosInstance } from "@/lib/axios";

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  const prefetcher = [
    queryClient.prefetchQuery({
      queryKey: ["bookings", ""],
      queryFn: () =>
        getBookings(new URLSearchParams()).then(
          (i) => i.data
        ) as Promise<BookingsResponse>
    }),
    queryClient.prefetchQuery({
      queryKey: ["cleaners"],
      queryFn: () =>
        axiosInstance.get(`cleaners?limit=50`).then((i) => i.data) as Promise<
          Cleaner[]
        >
    }),
    queryClient.prefetchQuery({
      queryKey: ["services"],
      queryFn: () =>
        axiosInstance.get(`services`).then((i) => i.data) as Promise<
          ServiceOption[]
        >
    })
  ];

  await Promise.all(prefetcher);

  return (
    <>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="lg:ml-63 lg:py-3 lg:pr-3 text-secondary-700">
          {children}
        </div>
      </HydrationBoundary>
    </>
  );
}
