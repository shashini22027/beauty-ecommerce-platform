import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);

  return (
    <div className="group bg-white/40 border border-white/50 rounded-2xl p-4 backdrop-blur-md shadow-xs hover:shadow-lg hover:shadow-rose-100/50 hover:bg-white/70 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full">
      {/* Product Image Wrapper */}
      <Link to={`/products/${product._id}`} className="relative block overflow-hidden rounded-xl bg-rose-50/30 aspect-square mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.countInStock === 0 && (
          <span className="absolute top-2 right-2 bg-gray-900/80 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-xs">
            Out of Stock
          </span>
        )}
        <span className="absolute top-2 left-2 bg-rose-100/80 text-rose-600 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-xs">
          {product.category}
        </span>
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xxs uppercase tracking-wider text-rose-500 font-semibold">{product.brand}</span>
            <span className="text-gray-300 text-xxs">&bull;</span>
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star size={10} className="fill-amber-500" />
              <span className="text-[10px] font-bold text-gray-600">{product.rating}</span>
            </div>
          </div>
          <Link to={`/products/${product._id}`} className="block">
            <h3 className="font-semibold text-gray-800 text-sm hover:text-rose-500 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.countInStock === 0}
            className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
              product.countInStock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-100 hover:border-transparent transform active:scale-95'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
