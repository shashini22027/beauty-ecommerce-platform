import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Shopping Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Products State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch all products
  const fetchProducts = async (category = '', keyword = '') => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/products`;
      const params = [];
      if (category) params.push(`category=${category}`);
      if (keyword) params.push(`keyword=${keyword}`);
      if (params.length > 0) url += `?${params.join('&')}`;

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Auth: Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, { email, password });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Invalid email or password' };
    }
  };

  // Auth: Register
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/users`, { name, email, password });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  // Auth: Logout
  const logout = () => {
    setUser(null);
  };

  // Cart: Add to cart
  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.product === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item.product === product._id ? { ...item, qty: Math.min(item.qty + qty, product.countInStock) } : item
        );
      }
      return [
        ...prevCart,
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: qty,
          countInStock: product.countInStock,
        },
      ];
    });
  };

  // Cart: Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product !== productId));
  };

  // Cart: Update quantity
  const updateQty = (productId, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product === productId ? { ...item, qty: Math.max(1, Math.min(qty, item.countInStock)) } : item
      )
    );
  };

  // Cart: Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place Order
  const placeOrder = async (shippingAddress) => {
    if (!user) return { success: false, message: 'Please login to checkout' };

    const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 50 ? 0 : 10;
    const taxPrice = itemsPrice * 0.1; // 10% tax
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post(
        `${API_URL}/orders`,
        {
          orderItems: cart,
          shippingAddress,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        config
      );

      clearCart();
      return { success: true, orderId: res.data._id };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Order failed' };
    }
  };

  // Get My Orders
  const getMyOrders = async () => {
    if (!user) return [];
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`${API_URL}/orders/myorders`, config);
      return res.data;
    } catch (err) {
      console.error('Error fetching orders:', err);
      return [];
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        products,
        loading,
        error,
        fetchProducts,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        placeOrder,
        getMyOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
