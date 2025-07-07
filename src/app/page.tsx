import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import LandingSection4 from "./_components/LandingSection4";

export default function Home() {
  return (
    <div className="font-poppins h-[150vh]">
      <form className="max-w-2xl mx-auto mt-10 placeholder:text-surface-500">
        <Input label="Input Field" placeholder="Enter your text...." />
        <Textarea label="Text area" placeholder="Enter your message...." />
      </form>
      <LandingSection4 />
    </div>
  );
}
