import React from 'react'
import AboutSection1 from './_components/AboutSection1';
import AboutSection2 from './_components/AboutSection2';

export default function AboutPage() {
  return (
    <main>
          <div className="container mx-auto px-6">
            <AboutSection1 />
            <AboutSection2 />
          </div>
        </main>
  )
}
