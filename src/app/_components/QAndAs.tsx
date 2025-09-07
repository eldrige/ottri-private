"use client";
import React, { useState } from "react";
import QAndA from "@/components/QAndA";

export default function QAndAs() {
  const [shown, setShown] = useState<number>();

  return (
    <div className="mt-8 lg:mt-16 space-y-4">
      <QAndA
        show={shown === 0}
        onClick={() => setShown(shown === 0 ? undefined : 0)}
        question="How far in advance should I book?"
        answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
      />
      <QAndA
        show={shown === 1}
        onClick={() => setShown(shown === 1 ? undefined : 1)}
        question="What if I need to reschedule?"
        answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
      />
      <QAndA
        show={shown === 2}
        onClick={() => setShown(shown === 2 ? undefined : 2)}
        question="Do I need to be home during cleaning?"
        answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
      />
      <QAndA
        show={shown === 3}
        onClick={() => setShown(shown === 3 ? undefined : 3)}
        question="How far in advance should I book?"
        answer="We offer same-day booking when available, but we recommend booking 24-48 hours in advance for the best time slot selection."
      />
    </div>
  );
}
