import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Loader from '../components/Loader';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

     fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name':
            return a.title.localeCompare(b.title);
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, products]);

  // const handleQuantityChange = (id, value) => {
  //   setQuantities(prev => ({
  //     ...prev,
  //     [id]: Math.max(1, parseInt(value) || 1)
  //   }));
  // }; additional feature for product quantity

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    toast.success(`Added ${quantity} x ${product.title} to cart!`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.title} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
  };

  if (loading) {
    return (
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Products</h2>
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Products</h2>
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Products</h2>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-inherit p-6 rounded-lg">
          <div className="flex flex-col xl:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-slate-200  border-2 border-gray-600 rounded-md text-slate-950 placeholder-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              {/* <label htmlFor="category" className="text-sm font-medium text-gray-300">Category:</label> */}
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-slate-50"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-300">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-slate-50"
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory || sortBy) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-contain transition-transform duration-300 hover:scale-110"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-2 left-2 bg-red-800 text-white px-2 py-1 rounded-md text-sm font-bold">
                  {product.discountPercentage.toFixed(0)}% off
                </div>
              )}
              <button
                onClick={() => handleWishlistToggle(product)}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <div className="p-6">
                <Link to={`/products/${product.id}`} className="text-xl font-semibold hover:text-slate-600 transition-colors block mb-2 truncate">
                  {product.title}
                </Link>
                <p className="text-sm text-cyan-500 mb-2">Category: {product.category}</p>
                <p className="text-slate-300 text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="text-yellow-400 text-sm mb-2"> 
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                  {Math.floor(product.rating)} / 5
                </p>
                <p className="text-2xl font-bold text-teal-200 mb-4">${product.price.toFixed(2)}</p>
                {/* <div className="flex items-center justify-between mb-4">
                  <label htmlFor={`quantity-${product.id}`} className="text-sm font-medium">Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${product.id}`}
                    min="1"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                  />
                </div> */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-zinc-300 text-slate-900 py-2 px-4 rounded-md hover:bg-slate-50 focus:outline-none  transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
