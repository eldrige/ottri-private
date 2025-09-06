import "../globals.css";
import DashboardNavbar from "./_components/DashboardNavbar";
import SideNavBar from "./_components/SideNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" relative">
      <DashboardNavbar />
      <div className="flex px-4">
        <section className="hidden md:block flex-15/100 h-full">
          <SideNavBar />
        </section>
        <section className="flex-85/100 ">{children}</section>
      </div>
    </main>
  );
}
