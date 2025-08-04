import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "@/app/(landings)/_components/Footer";
import CookiesBanner from "./_components/CookiesBanner";


export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}

      <footer className="bg-secondary-700">
        <Footer />
      </footer>
      <CookiesBanner />
    </>
  );
}
