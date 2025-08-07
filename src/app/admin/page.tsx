import CalendarIcon from '@/components/icons/CalendarIcon';
import CheckBrokenIcon from '@/components/icons/CheckBrokenIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import DollarIcon2 from '@/components/icons/DollarIcon2';
import LineGraphIncreaseIcon from '@/components/icons/LineGraphIncreaseIcon';
import { Users } from 'lucide-react';
import React from 'react';

export default function AdminDashboardPage() {
  const statsBoxes = [
    {
      title: "Today's Booking",
      value: "0",
      icon: <CalendarIcon className='size-6' />,
      statusText: "0 Complete",
      statusIcon: <LineGraphIncreaseIcon className='size-3.5' />,
      statusColor: "text-success"
    },
    {
      title: "Available Cleaners",
      value: "2",
      icon: <Users className='size-6' />,
      statusText: "of 4 Total",
      statusColor: "text-secondary-700/70",
      noStatusIcon: true
    },
    {
      title: "Today's Revenue",
      value: "$0.00",
      icon: <DollarIcon2 className='size-6' />,
      statusText: "+15% vs yesterday",
      statusIcon: <LineGraphIncreaseIcon className='size-3.5' />,
      statusColor: "text-success"
    },
    {
      title: "Completion Rate",
      value: "0%",
      icon: <LineGraphIncreaseIcon className='size-6' />,
      statusText: "On track",
      statusIcon: <CheckBrokenIcon className='size-3.5' />,
      statusColor: "text-success"
    }
  ];

  return (
    <main className='w-full h-full py-4 px-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-heading-4'>Overview</h3>
        <p className='text-secondary-700/70'>Welcome back Admin</p>
      </div>

      <hr className="my-4 text-black/10" />

      <div className='flex gap-4'>
        {statsBoxes.map((box, index) => (
          <div key={index} className='p-6 flex-1 border border-black/10 rounded-lg shadow-custom-light'>
            <div className='flex justify-between items-center text-sm'>
              <span>{box.title}</span>
              {box.icon}
            </div>
            <p className='mt-4 text-subtitle font-medium'>{box.value}</p>
            <div className='mt-2 text-sm'>
              <p className={`${box.statusColor} text-sm flex items-center gap-2`}>
                {!box.noStatusIcon && box.statusIcon}
                <span>{box.statusText}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 flex *:flex-1 gap-4'>
        <div className='border border-black/10 p-6 rounded-lg'>
          <h4 className='flex items-center gap-2 text-subtitle font-medium'>
            <ClockIcon className='size-6' />
            Today&apos;s Schedule (3)
          </h4>

          <div className='mt-6'>
            <div className='border border-black/10 rounded-lg py-2 px-4 space-y-1'>
              <p>
                <span className='font-medium'>Jenny murphy</span>
                <span className='text-sm py-1 px-4 ml-3 rounded-lg bg-info/20 text-info-text'>In Progress</span>
              </p>
              <p className='text-xs text-secondary-700/70'>
                Deep cleaning
                <span className='h-2 w-2 bg-surface-300 inline-block rounded-full mx-2' />
                9:00 AM - 11:00 AM
              </p>
              <p className='text-xs text-secondary-700/70'>Cleaner: Maria Garcia</p>
            </div>
          </div>
        </div>
        <div className='border border-black/10 p-6 rounded-lg'>
          <h4 className='flex items-center gap-2 text-subtitle font-medium'>
            <ClockIcon className='size-6' />

          </h4>
        </div>
      </div>
      <div className="flex-1 h-screen mt-20"></div>
    </main>
  );
}
