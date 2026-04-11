import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#A855F7]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00F0FF] flex items-center justify-center shadow-lg shadow-[#A855F7]/20">
              <Sparkles className="w-5 h-5 text-[#0F1117]" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#A855F7] to-[#00F0FF] bg-clip-text text-transparent">
              FAQGenie
            </span>
          </div>
          <p className="text-white/40 text-sm">Create your account to get started</p>
        </div>

        {/* Register Card */}
        <div className="bg-[#1A1B23]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-[#0F1117] font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.2)] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0F1117]/30 border-t-[#0F1117] rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="text-[#A855F7] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
