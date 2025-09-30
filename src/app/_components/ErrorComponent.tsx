"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorPageProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    // Log the error to an error reporting service
    if (isDevelopment) console.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="space-y-6 text-center max-w-md">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          We apologize for the inconvenience. The page you were trying to access
          encountered an unexpected error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={"/"}>
            <Button
              variant="outline"
              className="gap-2 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              Return home
            </Button>
          </Link>
          <Button onClick={reset}>Try again</Button>
        </div>

        {isDevelopment && (
          <div className="mt-8">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  Hide error details <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show error details <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>

            {showDetails && (
              <div className="mt-4 p-4 bg-muted rounded-md text-left overflow-auto max-h-64">
                <p className="font-medium mb-2">Error message:</p>
                <p className="text-sm font-mono mb-4">{error.message}</p>

                {error.digest && (
                  <>
                    <p className="font-medium mb-2">Error digest:</p>
                    <p className="text-sm font-mono mb-4">{error.digest}</p>
                  </>
                )}

                <p className="font-medium mb-2">Stack trace:</p>
                <pre className="text-xs font-mono whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
