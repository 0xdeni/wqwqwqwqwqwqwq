import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

interface WelcomeScreenProps {
  onSignup: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSignup, onLogin }) => {
  return (
    <div className="min-h-screen bg-[#111116] text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }}></div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8 z-10 pt-safe-top pb-safe-bottom">
        <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-8 animate-scale-in">
            <Zap className="text-yellow-400 fill-yellow-400/20" size={32} strokeWidth={2} />
        </div>

        <h1 className="text-6xl font-extrabold leading-[1.05] mb-6 tracking-tight animate-slide-up stagger-1">
          Control your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
            Digital Assets
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xs animate-slide-up stagger-2">
          Manage your crypto portfolio with AI-powered insights and banking-grade security.
        </p>

        <div className="flex gap-6 mb-12 animate-slide-up stagger-3">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-xl border border-green-500/20">
                    <ShieldCheck size={20} className="text-green-500" />
                </div>
                <span className="text-sm font-semibold text-gray-300">Secure</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Globe size={20} className="text-blue-500" />
                </div>
                <span className="text-sm font-semibold text-gray-300">Global</span>
            </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto animate-slide-up stagger-4">
            <button 
                onClick={onSignup}
                className="w-full bg-white text-black font-bold text-lg py-4 rounded-[1.2rem] mb-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
                Get Started
                <ArrowRight size={20} />
            </button>
            
            <button 
                onClick={onLogin}
                className="w-full glass-panel text-white font-bold text-lg py-4 rounded-[1.2rem] hover:bg-white/10 active:scale-[0.98] transition-all"
            >
                I have an account
            </button>
        </div>
      </div>
    </div>
  );
};