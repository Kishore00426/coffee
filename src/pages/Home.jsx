import Carousel from "../components/Carousel";
import rawCoffee from "../assets/packet1.jpg";
import filterCoffee from "../assets/packet2.jpg";
import instantCoffee from "../assets/packet3.jpg";

export default function Home() {
  const coffeeTypes = [
    {
      title: "Raw Coffee",
      description: "Premium raw coffee beans sourced directly from the finest plantations. Perfect for grinding and brewing your own fresh coffee.",
      image: rawCoffee,
    },
    {
      title: "Filter Coffee",
      description: "Traditional filter coffee made with carefully selected beans. Rich flavor and aroma that brings back nostalgic memories.",
      image: filterCoffee,
    },
    {
      title: "Instant Coffee",
      description: "Convenient instant coffee packets for those busy mornings. Quick to prepare yet maintains great taste and quality.",
      image: instantCoffee,
    },
  ];

  return (
    <main className="flex-grow p-6 text-center">
      <h2 className="text-3xl font-semibold mt-10">Welcome to Products House</h2>
      <p className="mt-4 text-gray-600">Freshly brewed happiness in every product!</p>
      <p>Get your favorite products delivered to your doorsteps.</p>

      <div className="mt-10">
        <Carousel />
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-8">Our Careful Selections are here</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coffeeTypes.map((coffee, index) => (
            <div key={index} className="bg-zinc-900 text-slate-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={coffee.image}
                alt={coffee.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{coffee.title}</h4>
                <p className="text-zinc-500">{coffee.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <button className="mx-6 bg-zinc-900 text-white py-2 px-4 rounded-md hover:bg-brown-700 transition-colors duration-200">
        <a href="/products" className="text-white no-underline">Show More products</a>
      </button>
    </main>
  );
}
