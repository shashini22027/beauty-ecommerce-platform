import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CreditCard, MapPin, ShieldCheck, ShoppingBag, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { user, cart, placeOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calculate pricing breakdown
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 50 ? 0 : 10;
  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else if (cart.length === 0 && !success) {
      navigate('/cart');
    }
  }, [user, cart, navigate, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!address || !city || !postalCode || !country) {
      setError('Please fill in all shipping fields');
      return;
    }

    setLoading(true);
    const result = await placeOrder({ address, city, postalCode, country });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setOrderId(result.orderId);
    } else {
      setError(result.message);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/40 border border-rose-100/50 rounded-3xl p-8 sm:p-12 backdrop-blur-md max-w-md shadow-xs space-y-6">
          <CheckCircle2 className="text-emerald-500 mx-auto" size={56} />
          <h2 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
            Thank you for shopping with AURA. Your order is being processed and will be shipped shortly.
          </p>
          <div className="bg-rose-50/80 border border-rose-100 p-3.5 rounded-xl text-xxs font-mono text-gray-600">
            Order Reference: {orderId}
          </div>
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-gray-950 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200 duration-300"
          >
            View Order History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white py-12 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Checkout Details</h1>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Shipping Form Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-semibold p-3.5 rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white/40 border border-white/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl space-y-5">
              
              <div className="flex items-center gap-2 border-b border-rose-100/50 pb-3 mb-2">
                <MapPin className="text-rose-500" size={18} />
                <h3 className="font-bold text-gray-900 text-base">Shipping Address</h3>
              </div>

              {/* Street Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 block pl-1">Street Address</label>
                <input
                  type="text"
                  placeholder="123 Glow Lane, Apt 4B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
                />
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 block pl-1">City</label>
                  <input
                    type="text"
                    placeholder="Los Angeles"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 block pl-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="90001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 block pl-1">Country</label>
                <input
                  type="text"
                  placeholder="United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
                />
              </div>

              {/* Payment Details */}
              <div className="flex items-center gap-2 border-b border-rose-100/50 pb-3 pt-6 mb-2">
                <CreditCard className="text-rose-500" size={18} />
                <h3 className="font-bold text-gray-900 text-base">Payment Method</h3>
              </div>

              <div className="border border-rose-200 bg-rose-50/20 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💳</span>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">Secure Payment On Checkout</h5>
                    <p className="text-[10px] text-gray-500 mt-0.5">Demo direct checkout enabled</p>
                  </div>
                </div>
                <span className="text-xxs font-bold uppercase tracking-widest text-rose-500 bg-rose-100 px-2.5 py-1 rounded-md">
                  Active
                </span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-gray-950 text-white font-semibold text-sm px-6 py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200 duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Place Secure Order
                  </>
                )}
              </button>

            </form>

          </div>

          {/* Checkout Bag Breakdown Column */}
          <div className="bg-white/40 border border-white/50 backdrop-blur-md p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-gray-900 text-lg border-b border-rose-100/50 pb-4 flex items-center gap-2">
              <ShoppingBag size={18} />
              Review Items
            </h3>

            {/* List Mini Previews */}
            <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product} className="flex justify-between items-center gap-4 text-xs font-medium text-gray-700">
                  <span className="truncate max-w-[150px]">{item.name}</span>
                  <span>Qty: {item.qty} &bull; ${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="border-rose-100/50" />

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <hr className="border-rose-100/50 my-1" />
              <div className="flex justify-between text-gray-950 font-bold text-base">
                <span>Total Amount</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
