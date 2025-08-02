import "../globals.css";
import SideNavBar from "./_components/SideNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex px-4 h-screen">
      <section className="hidden lg:block flex-15/100 h-full">
        <SideNavBar />
      </section>
      <section className="flex-85/100 ">{children}</section>
    </main>
  );
}
