import React from "react";

export default function ServicesSection3() {
  const popularServices: PopularServiceCardProps[] = [
    {
      title: "Inside Oven",
      price: 25,
      subtitle: "Deep clean and degrease oven interior",
    },
    {
      title: "Inside Refrigerator",
      price: 25,
      subtitle: "Thorough fridge cleaning and sanitizing",
    },
    {
      title: "Basement Cleaning",
      price: 25,
      subtitle: "Complete basement cleaning and organization",
    },
    {
      title: "Window Cleaning",
      price: 25,
      subtitle: "Interior windows and tracks",
    },
    {
      title: "Garage Cleaning",
      price: 20,
      subtitle: "Sweep, organize, and clean garage space",
    },
    {
      title: "Laundry Service",
      price: 35,
      subtitle: "Wash, dry, and fold one load",
    },
    {
      title: "Closet Organization",
      price: 15,
      subtitle: "Organize and arrange closet contents",
    },
    {
      title: "Plant Care",
      price: 10,
      subtitle: "Water and care for houseplants",
    },
  ];
  return (
    <section className="py-24 pb-36 gap-16 flex flex-col">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Popular Add-On Services
        </h2>
        <p className="text-subtitle text-surface-500 text-base max-w-6xl mx-auto">
          Enhance any cleaning service with these optional extras
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularServices.map((popularService, _index) => (
          <PopularServiceCard
            key={_index}
            title={popularService.title}
            price={popularService.price}
            subtitle={popularService.subtitle}
          />
        ))}
      </div>
    </section>
  );
}
type PopularServiceCardProps = {
  title: string;
  price: number;
  subtitle: string;
};
function PopularServiceCard({
  title,
  price,
  subtitle,
}: PopularServiceCardProps) {
  return (
    <div className="border border-black/10 text-center rounded-lg flex flex-col justify-between p-4 items-center gap-8">
      <p className="text-surface-500 text-base">{title}</p>
      <span className="text-primary-700 text-2xl font-medium">+${price}</span>
      <p className="text-surface-500 text-base">{subtitle}</p>
    </div>
  );
}
