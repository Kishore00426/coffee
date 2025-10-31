export default function Contact() {
  return (
    <main className="flex-grow p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mt-10 text-center">Contact Us</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-gray-500">123 Coffee Street, Brew City, BC 12345</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="text-gray-500">(555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="text-gray-500">hello@coffeehouse.com</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400">Message</label>
              <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-brown-500 text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
