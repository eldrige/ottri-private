import React from "react";
import QAndA from "@/app/(landings)/_components/QAndA";

export default function CommonQuestionsSection() {
  return (
    <section className="py-8 lg:py-24">
      <h2 className="text-heading-3 lg:text-heading-2 lg:text-center">
        Common Questions
      </h2>
      <p className="lg:text-subtitle text-surface-500 lg:text-center tracking-wide mt-4">
        Quick answers to help you get started
      </p>
      <div className="mt-8 lg:mt-16 space-y-4">
        <QAndA
          question="How far in advance should I book?"
          answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
        />
        <QAndA
          question="What if I need to reschedule?"
          answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
        />
        <QAndA
          question="Do I need to be home during cleaning?"
          answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
        />
        <QAndA
          question="How far in advance should I book?"
          answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
        />
      </div>
    </section>
  );
}
