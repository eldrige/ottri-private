import React from 'react';
import AboutSection1 from './_components/AboutSection1';
import AboutSection2 from './_components/AboutSection2';
import AboutSection3 from './_components/AboutSection3';
import AboutSection4 from './_components/AboutSection4';
import AboutSection5 from './_components/AboutSection5';
import AboutSection6 from './_components/AboutSection6';

export default function AboutPage() {
  return (
    <main className='overflow-hidden'>
      <div className="*:container *:mx-auto *:px-6 space-y-2.5 lg:space-y-0">
        <AboutSection1 />
        <AboutSection2 />
        <AboutSection3 />
        <AboutSection4 />
        <AboutSection5 />
        <AboutSection6 />
      </div>
    </main>
  );
}
