import CalendarIcon from "@/components/icons/CalendarIcon";
import CardIcon from "@/components/icons/CardIcon";
import CheckCircleBroken from "@/components/icons/CheckCircleBroken";
import ClockIcon from "@/components/icons/ClockIcon";
import { FileIcon } from "@/components/icons/FileIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { axios } from "@/lib/axios";
import { BookingType } from "@/lib/types";
import { format } from "date-fns";
import { DownloadIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { orderId = "" } = await searchParams;

  const response = await axios.get(
    // `http://172.22.11.156:3000/api/v1/bookings/${orderId.split("-")[1]}`
    `bookings/${orderId.split("-")[1]}`
  );

  const bookingData = response.data as BookingType;
  console.log(bookingData);

  const formattedDate = format(bookingData.timeSlot.date, "PP");

  const formattedFrom = format(
    new Date().setHours(bookingData.timeSlot.startTime, 0, 0, 0),
    "hh:mmaa"
  );
  const formattedTo = format(
    new Date().setHours(bookingData.timeSlot.endTime, 0, 0, 0),
    "hh:mmaa"
  );

  const startIso = new Date(bookingData.timeSlot.date);
  startIso.setUTCHours(bookingData.timeSlot.startTime);
  const urlStartIso = startIso.toISOString().replace(/[^a-z0-9]/gi, "");
  const endIso = new Date(bookingData.timeSlot.date);
  endIso.setUTCHours(bookingData.timeSlot.endTime);
  const urlEndIso = endIso.toISOString().replace(/[^a-z0-9]/gi, "");

  return (
    <main className="text-secondary-700">
      <div className="bg-secondary-700 text-white flex flex-col items-center py-16 space-y-4">
        <div className="p-4 bg-success rounded-full">
          <CheckCircleBroken className="size-8" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-heading-2.5">Booking Confirmed!</h1>
          <p className="text-subtitle tracking-wide text-surface-100">
            Your cleaning service has been successfully scheduled
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-subtitle text-surface-100">Booking ID: </p>
          <p className="bg-primary-700 rounded-lg py-2 px-6">#{orderId}</p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-8">
            {/* Col 1 */}
            <div className="p-8 space-y-8 shadow-custom-light rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-heading-5">Service Details</h4>
                <Badge variant="success-outline" size="sm">
                  Confirmed
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex gap-4">
                  <CalendarIcon className="text-primary-700 size-6" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium">Date & Time</p>
                    <p className="text-caption text-surface-500">
                      {formattedDate}
                    </p>
                    <p className="text-caption text-surface-500">
                      {formattedFrom} - {formattedTo}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ClockIcon className="text-primary-700 size-6" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium">Duration</p>
                    <p className="text-caption text-surface-500">
                      {bookingData.timeSlot.endTime -
                        bookingData.timeSlot.startTime}{" "}
                      hours
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <LocationIcon className="text-primary-700 size-6" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium">Address</p>
                    {/* <p className='text-caption text-surface-500'>123 Main Street, Anytown,</p> */}
                    <p className="text-caption text-surface-500">
                      {bookingData.address}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileIcon className="text-primary-700 size-6" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium">Service</p>
                    <p className="text-caption text-surface-500 capitalize">
                      {bookingData.serviceType.service.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8 shadow-custom-light rounded-lg">
              <div className="flex justify-between items-center gap-2">
                <h4 className="text-heading-5">Email Confirmation</h4>
                <Badge variant="success" size="sm">
                  Sent
                </Badge>
              </div>
              <div className="flex gap-4 items-center">
                <CalendarIcon className="text-primary-700 size-6" />
                <p className="text-caption text-surface-500">
                  A confirmation email with all details has been sent to your
                  email address.
                </p>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button className="flex gap-3 justify-center" size={"xs"}>
                  <FileIcon className="size-6" />
                  Preview Email
                </Button>
                <Button
                  className="flex gap-3 justify-center"
                  size={"xs"}
                  variant={"default-outline"}
                >
                  <DownloadIcon className="size-6" />
                  Download PDF
                </Button>
              </div>
            </div>
            <div className="mx-6 sm:mx-0 p-4 space-y-3 bg-surface-50 rounded-lg text-surface-500 text-xs">
              <p>
                <span className="font-bold">Estimated Arrival: </span>
                {(bookingData.timeSlot.startTime - 1) % 12 || 12}:30{" "}
                {bookingData.timeSlot.startTime - 1 < 12 ? "AM" : "PM"} -{" "}
                {(bookingData.timeSlot.startTime - 1) % 12 || 12}:50{" "}
                {bookingData.timeSlot.startTime - 1 < 12 ? "AM" : "PM"}
              </p>
              <p>Your cleaner will contact you 30 minutes before arrival.</p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Col 2 */}
            <div className="p-8 space-y-8 shadow-custom-light rounded-lg">
              <h4 className="text-heading-5">Payment Summary</h4>

              <ul className="text-caption flex flex-col gap-4">
                <li className="flex justify-between gap-2">
                  <span>Service: </span>
                  <span>${bookingData.servicesPrice}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Add-Ons: </span>
                  <span>${bookingData.addOnsPrice}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Tip: </span>
                  <span>${bookingData.tip}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Tax: </span>
                  <span>${bookingData.tax}</span>
                </li>
              </ul>
              <hr className="text-surface-500/10" />
              <div>
                <div className="flex justify-between gap-2 text-caption font-medium">
                  <span>Total: </span>
                  <span className="text-primary-700">
                    $
                    {bookingData.servicesPrice +
                      bookingData.addOnsPrice +
                      bookingData.tip +
                      bookingData.tax}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 justify-center items-center text-success bg-success-background py-2 rounded-lg">
                <CardIcon className="size-5" />
                <span>Payment Processed</span>
              </div>
            </div>
            <div className="p-8 space-y-14 shadow-custom-light rounded-lg">
              <h4 className="text-heading-5">Quick Action</h4>
              <div className="flex flex-col gap-6">
                <Link href="/booking/new" className="w-full">
                  <Button
                    className="flex gap-3 items-center justify-center w-full"
                    size={"xs"}
                    variant={"secondary"}
                  >
                    <PlusIcon className="size-6" />
                    Book Another Cleaning
                  </Button>
                </Link>
                <a
                  className="w-full"
                  target="_blank"
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ottri ${bookingData.serviceType.service.name} ${bookingData.serviceType.name}&dates=${urlStartIso}/${urlEndIso}&details=${"description"}&location=${bookingData.address}`}
                >
                  <Button
                    className="flex gap-3 items-center justify-center w-full"
                    size={"xs"}
                    variant={"default-outline"}
                  >
                    <CalendarIcon className="size-6" />
                    Add to calendar
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-8 pb-26 space-y-14 hidden sm:block">
        <h3 className="text-heading-5">What&apos;s Next?</h3>
        <ul className="space-y-6">
          <li className="flex gap-4">
            <span className="text-lg font-nunito-sans font-bold text-white flex justify-center items-center h-8 aspect-square rounded-full bg-primary-700">
              1
            </span>
            <div className="space-y-2">
              <p className="text-heading-5">Prepare your home</p>
              <p className="text-surface-500">
                Clear surfaces and secure valuables
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-lg font-nunito-sans font-bold text-white flex justify-center items-center h-8 aspect-square rounded-full bg-primary-700">
              2
            </span>
            <div className="space-y-2">
              <p className="text-heading-5">Receive Reminder</p>
              <p className="text-surface-500">
                We&apos;ll remind you 24 hours before
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-lg font-nunito-sans font-bold text-white flex justify-center items-center h-8 aspect-square rounded-full bg-primary-700">
              3
            </span>
            <div className="space-y-2">
              <p className="text-heading-5">Enjoy Clean Home</p>
              <p className="text-surface-500">
                Relax while we handle the cleaning
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="container mx-auto py-16 space-y-6 hidden sm:block">
        <div className="flex gap-6 justify-center">
          <Button size={"xs"} variant={"default-outline"}>
            Back To Home
          </Button>
          <Button size={"xs"} variant={"secondary"}>
            Explore Services
          </Button>
        </div>
        <p className="text-subtitle text-surface-500 text-center">
          Questions? Contact our support team at
          <span className="text-primary-700"> (555) 123-4567 </span>
          or
          <span className="text-primary-700"> support@ottri.com</span>
        </p>
      </div>
    </main>
  );
}
