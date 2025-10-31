export default function Orders() {
  return (
    <main className="flex-grow p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Your Orders</h2>
        <div className="bg-zinc-950 rounded-lg shadow-md p-6">
          <p className="text-gray-200 text-center">You have no orders yet.</p>
          <p className="text-gray-500 text-center mt-2">Start shopping to see your order history here.</p>
        </div>
      </div>
    </main>
  );
}
