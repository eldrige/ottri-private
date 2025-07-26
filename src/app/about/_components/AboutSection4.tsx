
export default function AboutSection4() {
  return (
    <section className="py-16 min-w-full bg-secondary-700 text-white text-center">
      <div className="container mx-auto">

        <h2 className="text-heading-3 lg:text-heading-2">Ottri By The Numbers</h2>
        <p className="lg:text-subtitle tracking-wider text-surface-100 mt-2">Our growth reflects the trust our community places in us</p>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 justify-between gap-y-10 gap-x-8 lg:gap-x-2">
          {[
            { title: "10,000+", subtitle: "Happy Customers" },
            { title: "50,000+", subtitle: "Cleaning complete" },
            { title: "98%", subtitle: "Customer Satisfaction" },
            { title: "150+", subtitle: "Professional Cleaners" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <h2 className="text-primary-700 text-heading-3 lg:text-heading-2">{item.title}</h2>
              <span className="text-caption lg:text-subtitle">{item.subtitle}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
