"use client";
import ErrorComponent from "@/app/_components/ErrorComponent";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return <ErrorComponent error={error} reset={reset} />;
}
