import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
  const { user, register } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
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
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="mt-1.5 text-xs text-gray-500">Sign up to get access to custom beauty recommendations and orders.</p>
        </div>

        {/* Error notice */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-semibold p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block pl-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-rose-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-hidden focus:border-rose-300 transition-all"
              />
              <User size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
            </div>
          </div>

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

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 block pl-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>

        </form>

        {/* Redirect toggle */}
        <p className="text-center text-xs text-gray-500 pt-2">
          Already have an account?{' '}
          <Link
            to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
            className="text-rose-500 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
