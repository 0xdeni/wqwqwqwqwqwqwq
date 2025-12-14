import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface SignupScreenProps {
  onBack: () => void;
  onSignup: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ onBack, onSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="min-h-screen bg-[#111116] text-white p-6 pt-safe-top font-sans flex flex-col relative overflow-hidden">
       {/* Background Blob */}
       <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="mb-10 relative z-10 animate-fade-in">
        <button onClick={onBack} className="p-3 glass-panel rounded-xl hover:bg-white/10 transition-colors inline-block mb-8 active:scale-95">
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-4xl font-bold mb-3 tracking-tight">Create Account 🚀</h1>
        <p className="text-gray-400 font-medium">Join the future of finance today.</p>
      </header>

      <form onSubmit={handleSignup} className="flex-1 flex flex-col relative z-10 animate-slide-up stagger-1">
        <div className="space-y-4 mb-8">
            {/* Name Field */}
            <div className="glass-panel rounded-2xl p-1 focus-within:border-purple-500/50 transition-colors group">
                <div className="flex items-center px-4 py-3.5">
                    <div className="p-2 bg-white/5 rounded-lg mr-4 group-focus-within:bg-purple-500/20 group-focus-within:text-purple-400 transition-colors">
                        <User size={20} className="text-gray-400 group-focus-within:text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Full Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent text-white font-semibold outline-none placeholder-gray-600"
                            placeholder="John Doe"
                        />
                    </div>
                </div>
            </div>

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
                            placeholder="Create a strong password"
                        />
                    </div>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white transition-colors">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-3 mt-2 px-2">
                <div className="mt-0.5 text-purple-500">
                    <CheckCircle size={16} />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    By signing up, you agree to the <span className="text-white font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-white font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
            </div>
        </div>

        <button 
            type="submit"
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-[1.2rem] shadow-lg hover:bg-gray-100 active:scale-[0.98] transition-all"
        >
            Create Account
        </button>

        <div className="mt-8 text-center pb-safe-bottom">
            <p className="text-gray-400 text-sm font-medium">
                Already have an account?{' '}
                <button type="button" onClick={onBack} className="text-purple-400 font-bold hover:text-purple-300 transition-colors ml-1">
                    Sign In
                </button>
            </p>
        </div>
      </form>
    </div>
  );
};