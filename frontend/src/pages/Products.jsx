import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

const Products = () => {
  const { products, fetchProducts, loading } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || '';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  // Sync category state when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Fetch products when category or search changes
  useEffect(() => {
    fetchProducts(selectedCategory, search);
  }, [selectedCategory, search]);

  const categories = ['Skincare', 'Makeup', 'Haircare'];

  const handleCategoryClick = (category) => {
    const nextCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(nextCategory);
    if (nextCategory) {
      navigate(`/products?category=${nextCategory}`);
    } else {
      navigate('/products');
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50/10 via-white to-rose-50/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-10">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold">Discover our catalog</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Shop Aura Beauty</h1>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          
          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={handleClearFilters}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                !selectedCategory
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white/60 border-rose-100 hover:bg-rose-50 text-gray-700'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-500 border-rose-500 text-white shadow-xs'
                    : 'bg-white/60 border-rose-100 hover:bg-rose-50 text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/60 border border-rose-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-rose-300 focus:bg-white transition-all shadow-xs"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
          </div>

        </div>

        {/* Product Grid Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <RefreshCw className="animate-spin text-rose-500" size={32} />
            <span className="text-sm text-gray-500 font-medium">Finding products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white/40 border border-rose-100/50 rounded-2xl p-8 backdrop-blur-md max-w-md mx-auto">
            <span className="text-4xl">🛍️</span>
            <h3 className="font-bold text-gray-800 text-lg mt-4">No Products Found</h3>
            <p className="text-xs text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
            <button
              onClick={handleClearFilters}
              className="mt-6 bg-rose-500 text-white font-semibold text-xs px-6 py-2.5 rounded-full"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
