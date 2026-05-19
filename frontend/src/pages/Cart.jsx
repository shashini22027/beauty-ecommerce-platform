import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useContext(AppContext);
  const navigate = useNavigate();

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 50 || itemsPrice === 0 ? 0 : 10;
  const taxPrice = itemsPrice * 0.1; // 10% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/40 border border-rose-100/50 rounded-3xl p-8 sm:p-12 backdrop-blur-md max-w-md shadow-xs">
          <span className="text-5xl">🛍️</span>
          <h2 className="text-2xl font-bold text-gray-900 mt-6">Your Bag is Empty</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Looks like you haven't added any Aura cosmetics yet. Explore our curated collections to find your perfect formulas.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 bg-gray-950 text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-md hover:bg-gray-800 transition-all"
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white py-12 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Your Shopping Bag</h1>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Cart Items List Column */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/40 border border-white/50 backdrop-blur-md rounded-2xl gap-4"
              >
                {/* Product Detail Thumbnail */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-rose-50/30 rounded-xl overflow-hidden border border-rose-100/50 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                    <span className="text-xs text-rose-500 font-bold mt-0.5 block">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Controls and Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-transparent pt-3 sm:pt-0">
                  {/* Quantity Control */}
                  <div className="flex items-center border border-rose-100 bg-white/80 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQty(item.product, item.qty - 1)}
                      className="p-1 hover:bg-rose-50 rounded-md text-gray-600 transition-all"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-gray-800">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.product, item.qty + 1)}
                      className="p-1 hover:bg-rose-50 rounded-md text-gray-600 transition-all"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Total Price for this item */}
                  <span className="text-sm font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</span>

                  {/* Trash Icon */}
                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            ))}

            {/* Back shopping */}
            <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-500 font-bold pt-2">
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Pricing Order Summary Column */}
          <div className="bg-white/40 border border-white/50 backdrop-blur-md p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-gray-900 text-lg border-b border-rose-100/50 pb-4">Order Summary</h3>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (10%)</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <hr className="border-rose-100/50 my-1" />
              <div className="flex justify-between text-gray-950 font-bold text-base">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping note */}
            {itemsPrice < 50 && (
              <div className="text-xxs text-rose-500 bg-rose-50 border border-rose-100 p-3 rounded-lg text-center font-medium">
                Add <strong>${(50 - itemsPrice).toFixed(2)}</strong> more to unlock <strong>FREE SHIPPING!</strong>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gray-950 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200 duration-300 flex items-center justify-center gap-2 group"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
