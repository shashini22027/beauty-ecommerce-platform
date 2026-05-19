import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const { user, login } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-b from-rose-50/10 via-white py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-md w-full space-y-8 bg-white/40 border border-white/50 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xs">
        
        {/* Title */}
        <div className="text-center">
          <span className="text-2xl font-bold tracking-widest text-gray-900">AURA</span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-1.5 text-xs text-gray-500">Sign in to manage your bag, checkout, and view orders.</p>
        </div>

        {/* Error notice */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-semibold p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block pl-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-rose-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block pl-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-rose-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-950 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200 duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>

        </form>

        {/* Redirect toggle */}
        <p className="text-center text-xs text-gray-500 pt-2">
          New to Aura?{' '}
          <Link
            to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
            className="text-rose-500 font-bold hover:underline"
          >
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
