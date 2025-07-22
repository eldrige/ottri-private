import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { Shield } from "lucide-react";

const VALUES = [{
  icon: <Shield className="text-primary-700" size={32} />,
  title: "Trust & Reliability",
  description: "Every cleaner is background-checked, insured, and trained to our exacting standards."
}, {
  icon: <HeartIcon className="text-primary-700 size-8" />,
  title: "Care for Your Home",
  description: "We treat your home with the same respect and attention we'd give our own"
}, {
  icon: <span className="*:size-8"><BroomSparkleIcon /></span>,
  title: "Excellence in Service",
  description: "We're not satisfied until your home sparkles and exceeds your expectations."
}, {
  icon: <UsersIcon className="text-primary-700 size-8" />,
  title: "Community First",
  description: "Supporting local families with flexible employment and fair wages."
}];

export default function AboutSection3() {
  return (
    <section className="py-8 space-y-4 text-center lg:py-24">
      <h2 className="text-heading-2.5">Our Values</h2>
      <p className="max-w-4xl mx-auto space-y-8 tracking-wider text-surface-500 text-subtitle">These core principles guide everything we do, from hiring and training to customer service and community engagement.</p>

      <div className="grid lg:grid-cols-4 gap-4 mt-8">
        {VALUES.map((value, index) => (
          <div key={index} className="flex flex-col items-center py-8">
            <div className="p-2">
              {value.icon}
            </div>
            <h4 className="mt-4 text-heading-4 text-secondary-700">{value.title}</h4>
            <p className="mt-2 text-surface-500 tracking-wide">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
