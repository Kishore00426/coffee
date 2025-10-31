import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value);
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <main className="flex-grow p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="bg-zinc-950 rounded-lg shadow-md p-6 md:p-8 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <p className="text-gray-500 mt-2">Add some delicious coffee to get started!</p>
            <a
              href="/products"
              className="inline-block mt-4 bg-brown-600 text-white py-2 px-6 rounded-md hover:bg-brown-700 transition-colors duration-200"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-zinc-900 rounded-lg shadow-md p-4 md:p-6">
                <div className="flex flex-col space-y-4">
                  {/* Product Image and Info Row */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold truncate">{item.title}</h3>
                      <p className="text-cyan-500 text-sm">{item.category}</p>
                      <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 md:line-clamp-none">{item.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl md:text-2xl font-bold text-green-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity and Remove Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label htmlFor={`quantity-${item.id}`} className="mr-2 text-sm font-medium">Qty:</label>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center text-sm"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-800 hover:text-red-600 text-sm font-medium bg-slate-200 p-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Total and Checkout */}
            <div className="bg-zinc-900 rounded-lg shadow-md p-4 md:p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-slate-50 text-slate-900 py-3 px-6 md:px-8 rounded-md hover:bg-brown-700 transition-colors duration-200 text-base md:text-lg font-semibold w-full"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
