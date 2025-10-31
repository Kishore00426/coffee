import { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  return (
    <main className="flex-grow p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="bg-zinc-950 rounded-lg shadow-md p-6">
            <p className="text-gray-200 text-center">You have no orders yet.</p>
            <p className="text-gray-500 text-center mt-2">Start shopping to see your order history here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-zinc-950 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold text-lg">${order.total.toFixed(2)}</p>
                    <p className="text-gray-400 text-sm">{order.paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mb-4">
                  <h4 className="font-semibold mb-2">Items Ordered:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Address:</h4>
                      <p className="text-gray-300">{order.shippingInfo.name}</p>
                      <p className="text-gray-300">{order.shippingInfo.address}</p>
                      <p className="text-gray-300">{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
                      <p className="text-gray-300">{order.shippingInfo.email}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Order Summary:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-gray-600 pt-1">
                          <span>Total:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
