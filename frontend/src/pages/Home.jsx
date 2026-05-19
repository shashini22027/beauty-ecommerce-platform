import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react';

const Home = () => {
  const { products, fetchProducts, loading } = useContext(AppContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-linear-to-tr from-rose-50/20 via-white to-purple-50/20">
      
      {/* Dynamic Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100/50 text-rose-500 tracking-wider uppercase animate-pulse">
                <Sparkles size={12} />
                Introducing Botanical Radiance
              </span>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Reveal Your Skin's{' '}
                <span className="bg-linear-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Natural Aura
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Luxurious, clean, and 100% organic cosmetics formulations designed to nourish, protect, and amplify your natural glow. Cruelty-free and dermatologist tested.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/products"
                  className="bg-gray-950 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-gray-300 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                >
                  Shop the Collection
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?category=Skincare"
                  className="bg-white/60 hover:bg-white/90 border border-rose-200/50 text-gray-800 font-semibold text-sm px-8 py-3.5 rounded-xl backdrop-blur-md transition-all text-center"
                >
                  Discover Skincare
                </Link>
              </div>
            </div>

            {/* Hero Image Component */}
            <div className="relative">
              {/* Backglow element */}
              <div className="absolute inset-0 bg-linear-to-tr from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 transform scale-90 -z-10 animate-pulse"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 max-w-md mx-auto transform hover:rotate-1 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800"
                  alt="Aura Beauty Cosmetics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="py-12 bg-white/40 border-y border-rose-100/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-3xl p-3 bg-rose-50 rounded-full text-rose-500">🌿</span>
              <h3 className="font-semibold text-gray-800 text-base">Purely Botanical</h3>
              <p className="text-xs text-gray-500 max-w-xs">Organically sourced extracts, paraben-free formulations.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-3xl p-3 bg-rose-50 rounded-full text-rose-500">🐰</span>
              <h3 className="font-semibold text-gray-800 text-base">Cruelty-Free</h3>
              <p className="text-xs text-gray-500 max-w-xs">Certified cruelty-free, never tested on animals.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-3xl p-3 bg-rose-50 rounded-full text-rose-500">✨</span>
              <h3 className="font-semibold text-gray-800 text-base">Dermatologist Tested</h3>
              <p className="text-xs text-gray-500 max-w-xs">Clinically certified to protect and preserve all skin types.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="text-left">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-bold">Curated for you</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Featured Best Sellers</h2>
          </div>
          <Link
            to="/products"
            className="mt-4 sm:mt-0 text-rose-600 hover:text-rose-500 font-semibold text-sm flex items-center gap-1 group"
          >
            Explore all products
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <span className="animate-spin h-8 w-8 border-4 border-rose-500 border-t-transparent rounded-full"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Philosophy Banner */}
      <section className="py-24 bg-linear-to-r from-rose-100 to-pink-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Clean Beauty Promise</h2>
          <p className="text-gray-600 leading-relaxed">
            At AURA, we believe in honest cosmetics. We reject artificial synthetics, phthalates, and harsh sulfates. Every item we bottle contains pure skincare goodness designed to work in synergy with your body.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 font-bold bg-white px-4 py-2 rounded-full shadow-xs">
            <ShieldCheck size={14} />
            Dermatologically Approved & Cruelty-Free
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
