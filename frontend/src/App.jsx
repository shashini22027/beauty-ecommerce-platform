import { useState } from 'react';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-tr from-pink-50 via-purple-50 to-rose-100 flex flex-col justify-between font-sans antialiased selection:bg-rose-200">
      
      {/* Premium Header/Navbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-rose-100/50 backdrop-blur-md bg-white/30 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-wider bg-linear-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            AURA
          </span>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-bold">Beauty</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-rose-500 transition-colors">Shop</a>
          <a href="#" className="hover:text-rose-500 transition-colors">New Arrivals</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Best Sellers</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Our Story</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">
            Login
          </button>
          <button className="bg-linear-to-r from-rose-500 to-rose-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 transition-all duration-300 transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </header>

      {/* Stunning Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto py-16">
        <span className="text-xs uppercase tracking-widest text-rose-500 bg-rose-100/60 px-4 py-1.5 rounded-full font-semibold mb-6 animate-pulse">
          Welcome to the Future of Beauty
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
          Elevate Your Natural Glow With{' '}
          <span className="bg-linear-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Aura Cosmetics
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Discover a curated collection of luxurious, clean, and cruelty-free cosmetics designed to celebrate your unique skin. Formulated by experts, inspired by nature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <button className="bg-gray-900 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-300 duration-300 transform hover:-translate-y-0.5">
            Explore Collection
          </button>
          <button className="bg-white/60 hover:bg-white/80 border border-rose-200/60 backdrop-blur-md text-gray-800 font-medium px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5">
            Learn Our Formula
          </button>
        </div>

        {/* Feature Highlights with subtle animations */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-20 w-full">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/40 border border-white/40 backdrop-blur-xs">
            <span className="text-2xl mb-2">🌿</span>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">100% Organic</h3>
            <p className="text-xs text-gray-500 mt-1">Pure botanical ingredients</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/40 border border-white/40 backdrop-blur-xs">
            <span className="text-2xl mb-2">🐰</span>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Cruelty-Free</h3>
            <p className="text-xs text-gray-500 mt-1">Never tested on animals</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/40 border border-white/40 backdrop-blur-xs col-span-2 md:col-span-1">
            <span className="text-2xl mb-2">✨</span>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Dermatologist Tested</h3>
            <p className="text-xs text-gray-500 mt-1">Safe for all skin types</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-rose-100/50 text-center text-xs text-gray-500 backdrop-blur-md bg-white/20">
        <p>&copy; {new Date().getFullYear()} Aura Beauty. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
