import React, { useEffect, useState } from 'react';
import { Wallet, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const timer = setTimeout(() => {
      setOpacity(0);
      // Unmount after transition
      setTimeout(onFinish, 500); 
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
        className="fixed inset-0 z-50 bg-[#111116] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out"
        style={{ opacity }}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-500/20">
            <Wallet size={48} className="text-white" strokeWidth={1.5} />
            <div className="absolute top-0 right-0 p-2">
                <Sparkles size={20} className="text-purple-200 animate-spin-slow" />
            </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Otsem<span className="text-purple-500">Pay</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Future of Payments</p>
      </div>

      <div className="absolute bottom-10">
        <div className="flex gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};