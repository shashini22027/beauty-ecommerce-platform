import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { Star, ShieldCheck, Heart, ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-2">
        <span className="animate-spin h-6 w-6 border-2 border-rose-500 border-t-transparent rounded-full"></span>
        <span className="text-sm text-gray-500 font-medium">Loading details...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-2xl shadow-xs">
        <span className="text-3xl">⚠️</span>
        <h3 className="font-bold text-gray-800 text-lg mt-4">{error || 'Product Not Found'}</h3>
        <Link to="/products" className="inline-block mt-6 bg-rose-500 text-white font-semibold text-xs px-6 py-2.5 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-rose-500 font-semibold mb-8 group transition-colors">
          <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
          Back to Products
        </Link>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white/40 border border-white/50 backdrop-blur-md p-6 sm:p-10 rounded-3xl">
          
          {/* Left Column: Image */}
          <div className="aspect-square bg-rose-50/30 rounded-2xl overflow-hidden border border-rose-100/50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Details Info */}
          <div className="text-left space-y-6">
            
            {/* Brand and Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-50 px-3 py-1 rounded-md">
                  {product.brand}
                </span>
                <span className="text-xs font-semibold text-rose-400">{product.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-600">{product.rating}</span>
                <span className="text-gray-300 text-xs">|</span>
                <span className="text-xs text-gray-500">{product.numReviews} Reviews</span>
              </div>
            </div>

            <hr className="border-rose-100/50" />

            {/* Price & Description */}
            <div className="space-y-2">
              <span className="text-3xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">{product.description}</p>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${product.countInStock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className="text-xs font-semibold text-gray-600">
                {product.countInStock > 0 ? `In Stock (${product.countInStock} items remaining)` : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="space-y-4 pt-2">
                {/* Quantity Control */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-500">Quantity:</span>
                  <div className="flex items-center border border-rose-100 bg-white/80 rounded-lg p-1">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-1 hover:bg-rose-50 rounded-md text-gray-600 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                      className="p-1 hover:bg-rose-50 rounded-md text-gray-600 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-950 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-gray-200 duration-300"
                  >
                    <ShoppingBag size={16} />
                    Add to Shopping Bag
                  </button>
                </div>
              </div>
            )}

            <hr className="border-rose-100/50" />

            {/* Premium Guarantee */}
            <div className="flex items-center gap-2 bg-rose-50/50 border border-rose-100/50 p-4 rounded-xl">
              <ShieldCheck className="text-rose-500" size={20} />
              <div className="text-left text-xxs font-medium text-gray-600 leading-snug">
                <strong>AURA Freshness Seal:</strong> Formulated using raw botanical oils, paraben-free preservatives, and packed in sterile, recyclable jars to maximize skin-cell health.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
