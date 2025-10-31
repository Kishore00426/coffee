import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load user details from localStorage
    const storedDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    setUserDetails(prev => ({ ...prev, ...storedDetails }));

    // Load orders
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reload from localStorage to revert changes
    const storedDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    setUserDetails(prev => ({ ...prev, ...storedDetails }));
    setIsEditing(false);
  };

  return (
    <main className="flex-grow p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">My Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Details */}
          <div className="bg-zinc-900 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                    value={userDetails.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={userDetails.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order History */}
          <div className="bg-zinc-900 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="border border-gray-700 rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-green-600 font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
                {orders.length > 5 && (
                  <p className="text-center text-gray-400 text-sm">
                    And {orders.length - 5} more order{orders.length - 5 !== 1 ? 's' : ''}...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
