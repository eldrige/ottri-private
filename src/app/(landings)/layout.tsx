import Navbar from "./_components/Navbar";
import Footer from "@/app/(landings)/_components/Footer";
import CookiesBanner from "./_components/CookiesBanner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { getServices } from "./services/_utils/queries";

export default async function LandingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: () => getServices()
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Navbar />
      {children}
      <footer className="bg-secondary-700">
        <Footer />
      </footer>
      <CookiesBanner />
    </HydrationBoundary>
  );
}
