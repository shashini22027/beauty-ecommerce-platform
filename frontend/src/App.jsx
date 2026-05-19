import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-linear-to-tr from-rose-50/20 via-white to-purple-50/20 flex flex-col justify-between font-sans antialiased selection:bg-rose-200">
          
          {/* Main Navigation */}
          <Navbar />

          {/* Router Route Pages */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
