export default function About() {
  return (
    <main className="flex-grow p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mt-10 text-center">About Coffee House</h2>
      <div className="mt-8 space-y-6 ">
        <p className="text-slate-300">
          Welcome to Coffee House, where every cup tells a story. Founded with a passion for exceptional coffee,
          we source the finest beans from around the world to bring you an unparalleled coffee experience.
        </p>
        <p className="text-slate-300">
          Our mission is to create moments of joy through perfectly brewed coffee. Whether you're starting your day
          with a robust espresso or winding down with a smooth latte, we ensure every sip is memorable.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Our Story</h3>
            <p className="text-neutral-400">
              What started as a small family-owned café has grown into a beloved community gathering place.
              We pride ourselves on quality, sustainability, and creating connections through coffee.
            </p>
          </div>
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Our Values</h3>
            <p className="text-neutral-400">
              Quality ingredients, ethical sourcing, and exceptional service are at the heart of everything we do.
              We're committed to sustainability and supporting local communities.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
