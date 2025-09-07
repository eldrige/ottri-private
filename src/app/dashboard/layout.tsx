import "../globals.css";
import DashboardNavbar from "./_components/DashboardNavbar";
import SideNavBar from "./_components/SideNavBar";
import { getUserDetails, getUserProfile } from "./_utils/queries";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getUserProfile();
  const user = await getUserDetails(profile.id);
  return (
    <main className=" relative">
      <DashboardNavbar />
      <div className="flex px-4">
        <section className="hidden md:block flex-15/100 h-full">
          <SideNavBar user={user} />
        </section>
        <section className="flex-85/100 ">{children}</section>
      </div>
    </main>
  );
}
