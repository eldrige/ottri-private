import React from "react";
import QAndAs from "./QAndAs";

export default function LandingSection9() {
  return (
    <section className="py-8 lg:py-24">
      <h2 className="text-heading-3 lg:text-heading-2 lg:text-center">
        Common Questions
      </h2>
      <p className="lg:text-subtitle text-surface-500 lg:text-center tracking-wide mt-4">
        Quick answers to help you get started
      </p>
      <QAndAs />
    </section>
  );
}
