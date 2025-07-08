import { ArrowRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import figure1 from "@/assets/landing-section3-figure1.jpg";
import figure2 from "@/assets/landing-section3-figure2.jpg";
import figure3 from "@/assets/landing-section3-figure3.jpg";
import RewardStars from '@/components/icons/RewardStars';
import { cn } from '@/lib/utils';
import ClockIcon from '@/components/icons/ClockIcon';
import ReloadIcon from '@/components/icons/ReloadIcon';
import { Badge } from '@/components/ui/Badge';
import BoxIcon from '@/components/icons/BoxIcon';

export default function LandingSection3() {
  return (
    <section className='py-24 space-y-8'>
      <div className='text-center flex flex-col items-center gap-4'>
        <h2 className='text-heading-2'>Some Janitorial Services</h2>
        <p className='text-subtitle text-surface-500 max-w-[832px]'>From one-time deep cleans to regular maintenance, we have the right solution for every home and budget.</p>
        <Link className='text-primary-500 ml-auto flex' href="/services">
          View more <ArrowRight />
        </Link>
      </div>
      <div className='grid grid-cols-3 gap-x-8'>
        <ServiceCard
          coverSrc={figure1}
          Icon={RewardStars}
          title='Commercial Cleaning'
          subtitle='Tailored cleaning solutions for businesses of all sizes.'
          services={[
            "Office Cleaning",
            "Club House and Halls",
            "Eateries and Kitchens",
            ...(Array.from({ length: 9 }, () => ""))
          ]}
          priceFrom={89}
          duration='3-5'
        />
        <ServiceCard
          mostPopular
          coverSrc={figure2}
          Icon={ReloadIcon}
          title='Residential Cleaning'
          subtitle='Making homes sparkle and shine with our top-tier services.'
          services={[
            "Move in / Move outs",
            "Spring cleaning",
            "Junk Removal",
            ...(Array.from({ length: 10 }, () => ""))
          ]}
          priceFrom={89}
          duration='3-5'
        />
        <ServiceCard
          coverSrc={figure3}
          Icon={BoxIcon}
          title='Post Construction Cleaning'
          subtitle='We excel in post-construction cleaning to make your space ready for use.'
          services={[
            "All rooms included",
            "Inside appliances",
            "Detailed cleaning",
            ...(Array.from({ length: 4 }, () => ""))
          ]}
          priceFrom={89}
          duration='3-5'
        />
      </div>
      <div className='max-w-5xl mx-auto text-subtitle bg-surface-50 py-4 px-4 text-center'>
        <p className='text-surface-500 tracking-wide'>Not sure which service you need? Our cleaning experts are here to help you choose the perfect option for your home.</p>
        <Link className='text-primary-700 font-font-medium flex gap-4 justify-center mt-4' href="#">
          Get personal recommendations
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string,
  subtitle: string,
  services: string[],
  priceFrom: number,
  duration: string,
  coverSrc: StaticImageData,
  mostPopular?: boolean,
  Icon: ({ className }: { className?: string | undefined; }) => React.JSX.Element;
};

function ServiceCard({ coverSrc, Icon, mostPopular, title, subtitle, services, priceFrom, duration }: ServiceCardProps) {
  return (
    <div className={cn('relative rounded-lg border-2 border-black/10 space-y-4', mostPopular && "border-primary-700")}>
      {mostPopular &&
        <div className='absolute top-0 left-4 -translate-y-1/2'>
          <Badge size="sm">Most popular</Badge>
        </div>
      }
      <Image className='rounded-t-lg aspect-[2/1] w-full object-cover' src={coverSrc} alt={`${title}'s cover`} />
      <div className='space-y-4 px-6'>
        <div className={cn('w-10 aspect-square rounded-lg flex items-center justify-center', mostPopular ? "text-white bg-primary-700" : 'text-primary-700 bg-surface-500/5')}>
          <Icon />
        </div>
        <h4 className='text-heading-4 text-secondary-700'>{title}</h4>
        <p className='text-base text-surface-700'>{subtitle}</p>
        <ul className='text-surface-700 marker:text-primary-700 space-y-4'>
          {services.slice(0, 3).map(service => (
            <li className='flex items-center' key={service}>
              <span className='block w-2 h-2 rounded-full bg-primary-700 mr-2' />
              {service}
            </li>
          ))}
          <span className='text-primary-700'>+{services.slice(3).length} more features</span>
        </ul>

        <hr className='text-black/10' />

        <div className='flex items-center pb-10.5'>
          <div className='space-y-4'>
            <h5 className='text-heading-5 text-secondary-700'>
              <span className='text-primary-700'>$</span> From ${priceFrom}
            </h5>
            <p className='text-surface-500 flex items-center gap-3'>
              <ClockIcon />
              {duration} Hours
            </p>
          </div>
          <ArrowRight className='text-primary-700 ml-auto' />
        </div>
      </div>
    </div>
  );
}