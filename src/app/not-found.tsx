"use client";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ErrorPage() {
  const pathname = usePathname();
  const homeUrl = pathname.startsWith("/admin")
    ? "/admin"
    : pathname.startsWith("/dashboard")
      ? "/dashboard"
      : "/";
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="space-y-6 text-center max-w-md">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Page not found
        </h1>
        <p className="text-muted-foreground"></p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={homeUrl}>
            <Button
              variant="outline"
              className="gap-2 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              Return home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
