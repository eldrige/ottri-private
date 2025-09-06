import { Loader2 } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin text-black h-6 w-6" />
    </div>
  );
}
