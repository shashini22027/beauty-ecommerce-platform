import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-rose-100/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-widest text-white">AURA</span>
              <span className="text-xs uppercase tracking-widest text-rose-400 font-bold bg-rose-950/50 px-2 py-0.5 rounded-sm">
                Beauty
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              We design and formulate clean, dermatologist-tested, and organic cosmetics products. Elevating your natural beauty with clean, natural glowing elements.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Shop Collections</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products" className="hover:text-rose-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Skincare" className="hover:text-rose-400 transition-colors">Skincare Serum</Link></li>
              <li><Link to="/products?category=Makeup" className="hover:text-rose-400 transition-colors">Mineral Makeup</Link></li>
              <li><Link to="/products?category=Haircare" className="hover:text-rose-400 transition-colors">Botanical Haircare</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Stay Connected</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-rose-400" />
                <span>support@aurabeauty.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-rose-400" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-rose-400" />
                <span>123 Glow Ave, Beauty Hills, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Aura Beauty, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Formulated with <Heart size={12} className="text-rose-500 fill-rose-500" /> for your skin health.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
