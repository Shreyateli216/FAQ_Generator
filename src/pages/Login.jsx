import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#A855F7]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#00F0FF]/20">
              <Sparkles className="w-5 h-5 text-[#0F1117]" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#A855F7] bg-clip-text text-transparent">
              FAQGenie
            </span>
          </div>
          <p className="text-white/40 text-sm">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1A1B23]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

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
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
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
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#0F1117] font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0F1117]/30 border-t-[#0F1117] rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/40">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00F0FF] hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-4 p-3 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/10">
            <p className="text-[10px] text-[#00F0FF]/60 uppercase tracking-wider font-semibold mb-1">Demo Account</p>
            <p className="text-xs text-white/50">
              Email: <span className="text-white/70 font-mono">demo@faqgenie.com</span><br />
              Pass: <span className="text-white/70 font-mono">demo123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
