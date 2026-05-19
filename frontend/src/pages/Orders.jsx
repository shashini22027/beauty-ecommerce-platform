import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Package, RefreshCw, Calendar, ClipboardCheck } from 'lucide-react';

const Orders = () => {
  const { user, getMyOrders } = useContext(AppContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/orders');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-2">
        <span className="animate-spin h-6 w-6 border-2 border-rose-500 border-t-transparent rounded-full"></span>
        <span className="text-sm text-gray-500 font-medium">Fetching orders...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white py-12 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex items-center gap-3 mb-10 border-b border-rose-100/50 pb-4">
          <Package className="text-rose-500" size={26} />
          <h1 className="text-3xl font-bold text-gray-900">Your Order History</h1>
        </div>

        {/* List of Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white/40 border border-rose-100/50 rounded-2xl p-8 backdrop-blur-md max-w-md mx-auto">
            <span className="text-4xl">📦</span>
            <h3 className="font-bold text-gray-800 text-lg mt-4">No Orders Found</h3>
            <p className="text-xs text-gray-500 mt-2">You haven't placed any cosmetics orders yet.</p>
            <Link to="/products" className="inline-block mt-6 bg-rose-500 text-white font-semibold text-xs px-6 py-2.5 rounded-full">
              Explore Our Formulas
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/45 border border-white/60 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-xs"
              >
                
                {/* Header Information (ID, Date, Total) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100/50 pb-4">
                  <div className="space-y-1">
                    <span className="text-xxs uppercase tracking-widest text-gray-400 font-bold block">Order Number</span>
                    <span className="text-xs font-mono font-bold text-gray-700 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-sm">
                      {order._id}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Calendar size={14} className="text-rose-400" />
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-gray-900 font-bold">
                      Total: ${order.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Body: Items Mini Previews & Statuses */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Items list */}
                  <div className="md:col-span-2 space-y-3 max-h-36 overflow-y-auto pr-2">
                    {order.orderItems.map((item) => (
                      <div key={item.product} className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-rose-50/20 rounded-lg overflow-hidden border border-rose-100/50 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
                          <span className="text-xxs text-gray-400 font-medium">Qty: {item.qty} &bull; ${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end items-start md:items-end">
                    
                    {/* Delivery Status */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xxs font-semibold text-gray-500">Delivery Status:</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        order.isDelivered
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {order.isDelivered ? 'Shipped' : 'Pending Processing'}
                      </span>
                    </div>

                    {/* Payment Status */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xxs font-semibold text-gray-500">Payment Status:</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        order.isPaid
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {order.isPaid ? 'Paid' : 'Pay On Delivery'}
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
