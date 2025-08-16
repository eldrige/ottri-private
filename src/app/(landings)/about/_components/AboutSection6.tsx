import { Button } from "@/components/ui/Button";

export default function AboutSection6() {
  return (
    <section className="min-w-full my-8 lg:my-24 bg-primary-700 text-white">
      <div className="container mx-auto py-16">
        <h2 className="text-heading-3 lg:text-heading-2.5 text-center">
          Ready To Experience The Ottri Difference?
        </h2>
        <p className="mt-2 text-subtitle text-center tracking-wider text-surface-100">
          Join thousands of satisfied customers who trust Ottri for their home
          cleaning needs.
        </p>

        <div className="mt-4 flex justify-center gap-4 flex-wrap *:w-full *:sm:w-auto">
          <Button variant="secondary" size="xs">
            Book your first cleaning
          </Button>
          <Button variant="ghost" size="xs">
            Explore our services
          </Button>
        </div>
      </div>
    </section>
  );
}
