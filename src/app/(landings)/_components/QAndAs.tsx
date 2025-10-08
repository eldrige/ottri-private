"use client";
import React, { useState } from "react";
import QAndA from "./QAndA";

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
        answer="You can reschedule your appointment up to 24 hours before your scheduled service with no fee. Changes made with less than 24 hours notice may incur a rescheduling fee. Simply log into your account or contact our customer service team to make changes."
      />
      <QAndA
        show={shown === 2}
        onClick={() => setShown(shown === 2 ? undefined : 2)}
        question="Do I need to be home during cleaning?"
        answer="No, you don't need to be home during the cleaning service. Many of our customers provide access instructions or use a key lockbox. However, if you prefer to be present, that's perfectly fine too. Just let us know your preference when booking."
      />
      <QAndA
        show={shown === 3}
        onClick={() => setShown(shown === 3 ? undefined : 3)}
        question="What cleaning supplies do you bring?"
        answer="Our professional cleaners bring all necessary cleaning supplies and equipment, including eco-friendly cleaning products, vacuums, mops, and microfiber cloths. If you have specific products you'd prefer we use in your home, just let us know ahead of time."
      />
    </div>
  );
}
