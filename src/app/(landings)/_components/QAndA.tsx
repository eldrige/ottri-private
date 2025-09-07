"use client";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export default function QAndA({
  question,
  answer,
  show,
  onClick
}: {
  question: string;
  answer: string;
  show?: boolean;
  onClick?: () => void;
}) {
  // const [show, setShow] = useState(false);
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className={cn(
        "flex justify-between items-start p-3 rounded-lg max-w-3xl mx-auto border transition duration-200 border-surface-500/10",
        !show ? "bg-white text-secondary-700" : "bg-secondary-700 text-white"
      )}
    >
      <div className="">
        <p className="font-medium">{question}</p>
        <div
          className={cn(
            "overflow-hidden transition-[max-height] duration-200",
            show ? "max-h-[500px]" : "max-h-0"
          )}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <p className={"pt-4 max-w-xl text-caption tracking-wider"}>
              {answer}
            </p>
          </div>
        </div>
      </div>
      <div className={show ? "text-white" : "text-surface-500"}>
        {show ? <Minus size={24} /> : <Plus size={24} />}
      </div>
    </div>
  );
}
