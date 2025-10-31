import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create order object
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cartItems,
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: total,
        shippingInfo: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        paymentMethod: paymentMethod
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      toast.success('Order placed successfully! Thank you for your purchase.');
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Checkout</h2>
          <p className="text-gray-600">Your cart is empty. Add some items before checkout.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 bg-slate-600 text-white py-2 px-6 rounded-md hover:bg-slate-700 transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-zinc-900 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-amber-800">Quantity: {item.quantity}</p>
                    <p className="text-sm text-stone-400">${item.price.toFixed(2)} each</p>
                  </div>
                  <p className="font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-green-600">Free shipping on orders over $50!</p>
              )}
              <div className="border-t border-gray-600 pt-2 mt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-zinc-900 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Shipping & Payment Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="border-t border-gray-700 pt-4 mt-6">
                <h4 className="text-lg font-semibold mb-4">Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => handlePaymentMethodChange('card')}
                      className="mr-3"
                    />
                    <span className="flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                      </svg>
                      Credit/Debit Card
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handlePaymentMethodChange('paypal')}
                      className="mr-3"
                    />
                    <span className="flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd"/>
                      </svg>
                      PayPal
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Information */}
              {paymentMethod === 'card' && (
                <div className="border-t border-gray-700 pt-4 mt-6">
                  <h4 className="text-lg font-semibold mb-4">Card Information</h4>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="border-t border-gray-700 pt-4 mt-6">
                  <h4 className="text-lg font-semibold mb-4">PayPal Information</h4>
                  <div>
                    <label htmlFor="paypalEmail" className="block text-sm font-medium mb-2">PayPal Email</label>
                    <input
                      type="email"
                      id="paypalEmail"
                      name="paypalEmail"
                      value={formData.paypalEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your-email@example.com"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-200 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
