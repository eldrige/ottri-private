import type { Metadata } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Ottri",
  description: "Ottri Cleaning Services"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${nunitoSans.variable} antialiased font-poppins`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
