import { Loader2 } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader2 className="animate-spin size-10" />
    </div>
  );
}
