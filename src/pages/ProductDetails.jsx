import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Loader from '../components/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);

        // Fetch similar products based on category (using hashtags as category)
         const similarResponse = await fetch(`https://dummyjson.com/products/category/${data.category}`);
         if (similarResponse.ok) {
           const similarData = await similarResponse.json();
           setSimilarProducts(similarData.products.filter(p => p.id !== data.id).slice(0, 4));
         }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, parseInt(value) || 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} x ${product.title} to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.title} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const handleImageChange = (newImage) => {
    setProduct(prev => ({ ...prev, images: [newImage, ...prev.images.filter(img => img !== newImage)] }));
  };

  if (loading) {
    return (
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-600">Error: {error}</div>
          <Link to="/products" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Product not found</div>
          <Link to="/products" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/products" className="text-blue-500 hover:underline mb-6 inline-block">
          ← Back to Products
        </Link>

        <div className="bg-zinc-950 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-110"
              />
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
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
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-16 h-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-teal-200 transition-colors"
                    onClick={() => handleImageChange(image)}
                  />
                ))}
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-sm text-cyan-500 mb-2">Category: {product.category}</p>
              <p className="text-slate-300 text-sm mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-teal-200 mb-4">${product.price.toFixed(2)}</p> 
              <p className='text-lime-500'> {product.availabilityStatus || 'N/A'}</p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>Brand: {product.brand || 'N/A'}</li>
                  <li>Rating: <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}</span> {product.rating} / 5</li>
                  <li>Stock: {product.stock} available</li>
                  <li>Discount: <span className="text-orange-800 bg-stone-200 font-bold">{product.discountPercentage.toFixed(0)}% off</span></li>
                  {/* <li>SKU: {product.sku || 'N/A'}</li> */}
                  <li>Weight: {product.weight}g</li>
                  <li>Dimensions: {product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'N/A'}</li>
                  <li className='text-orange-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Return Policy: {product.returnPolicy || 'N/A'}
                  </li>
                   <li className='font-semibold text-emerald-400 bg-stone-800 p-2 rounded-lg'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-1">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                     </svg>
                      {product.warrantyInformation || 'N/A'}
                   </li>
                  {/* <li>Shipping: {product.shippingInformation || 'N/A'}</li> */}
                  
                  {/* <li>Minimum Order Quantity: {product.minimumOrderQuantity || 'N/A'}</li> */}
                  {/* {product.tags && product.tags.length > 0 && (
                    <li>Tags: {product.tags.join(', ')}</li>
                  )} */}
                </ul>
              </div>

              {/* Meta Information */}
              {/* {product.meta && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Meta Information:</h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>Created At: {new Date(product.meta.createdAt).toLocaleDateString()}</li>
                    <li>Updated At: {new Date(product.meta.updatedAt).toLocaleDateString()}</li>
                    <li>Barcode: {product.meta.barcode}</li>
                    <li>QR Code: <a href={product.meta.qrCode} target="_blank" rel="noopener noreferrer" className="text-teal-200 hover:underline">View QR Code</a></li>
                  </ul>
                </div>
              )} */}

              {/* Reviews Section */}
              {/* {product.reviews && product.reviews.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
                  <div className="space-y-3">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="bg-neutral-800 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{review.reviewerName}</span>
                          <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-1">{review.comment}</p>
                        <p className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              <div className="flex items-center justify-between mb-4">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-zinc-300 text-slate-900 py-3 px-4 rounded-md hover:bg-slate-50 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <div key={product.id} className="bg-neutral-950 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <Link to={`/products/${product.id}`} className="text-lg font-semibold hover:text-slate-600 transition-colors block mb-2 truncate">
                      {product.title}
                    </Link>
                    <p className="text-xl font-bold text-teal-200">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>
    </main>
  );
}
