import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Fingerprint } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#111116] text-white p-6 pt-safe-top font-sans flex flex-col relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="mb-10 relative z-10 animate-fade-in">
        <button onClick={onBack} className="p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors inline-block mb-8 active:scale-95">
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-4xl font-bold mb-3 tracking-tight">Welcome Back! 👋</h1>
        <p className="text-gray-400 font-medium">Please sign in to your account</p>
      </header>

      <form onSubmit={handleLogin} className="flex-1 flex flex-col relative z-10 animate-slide-up stagger-1">
        <div className="space-y-5 mb-8">
            {/* Email Field */}
            <div className="glass-panel rounded-2xl p-1 focus-within:border-purple-500/50 transition-colors group">
                <div className="flex items-center px-4 py-3.5">
                    <div className="p-2 bg-white/5 rounded-lg mr-4 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-400 transition-colors">
                        <Mail size={20} className="text-gray-400 group-focus-within:text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent text-white font-semibold outline-none placeholder-gray-600"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>
            </div>

            {/* Password Field */}
            <div className="glass-panel rounded-2xl p-1 focus-within:border-purple-500/50 transition-colors group">
                <div className="flex items-center px-4 py-3.5">
                    <div className="p-2 bg-white/5 rounded-lg mr-4 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-400 transition-colors">
                        <Lock size={20} className="text-gray-400 group-focus-within:text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent text-white font-semibold outline-none placeholder-gray-600"
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white transition-colors">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="text-sm font-bold text-purple-400 hover:text-purple-300">
                    Forgot Password?
                </button>
            </div>
        </div>

        <button 
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-[1.2rem] shadow-lg shadow-indigo-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all mb-8"
        >
            Sign In
        </button>

        <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#111116] text-gray-500 font-medium">Or continue with</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button type="button" className="glass-panel py-3.5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="font-bold text-white">Google</span>
            </button>
            <button type="button" className="glass-panel py-3.5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="font-bold text-white">Apple</span>
            </button>
        </div>

        <div className="mt-auto pt-8 flex justify-center items-center gap-2 pb-safe-bottom">
            <button type="button" className="p-4 bg-white/5 rounded-full text-purple-400 border border-purple-500/20 hover:bg-purple-500/10 transition-colors hover:scale-110 active:scale-90">
                <Fingerprint size={32} strokeWidth={1.5} />
            </button>
        </div>
      </form>
    </div>
  );
};