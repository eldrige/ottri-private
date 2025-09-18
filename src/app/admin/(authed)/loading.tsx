import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="animate-spin size-6" />
    </div>
  );
}
