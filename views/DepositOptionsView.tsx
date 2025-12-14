import React from 'react';
import { ArrowLeft, Landmark, Bitcoin } from 'lucide-react';

interface DepositOptionsViewProps {
  onBack: () => void;
  onSelectPix: () => void;
  onSelectCrypto: () => void;
}

export const DepositOptionsView: React.FC<DepositOptionsViewProps> = ({ onBack, onSelectPix, onSelectCrypto }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FB] safe-pb-nav pt-safe-top px-6 font-sans">
      <header className="flex items-center mb-8 py-6 animate-fade-in">
        <button onClick={onBack} className="w-10 h-10 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-black transition-all shadow-sm flex items-center justify-center mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
      </header>

      <div className="space-y-4 animate-slide-up">
        {/* PIX Option */}
        <button 
            onClick={onSelectPix}
            className="w-full bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg shadow-emerald-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all group flex items-center gap-6"
        >
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Landmark size={32} className="text-emerald-600" />
            </div>
            <div className="text-left flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Deposit BRL</h3>
                <p className="text-gray-500 text-sm font-medium">Instant transfer via PIX</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-50 group-hover:text-gray-900">
                <ArrowLeft size={20} className="rotate-180" />
            </div>
        </button>

        {/* Crypto Option */}
        <button 
            onClick={onSelectCrypto}
            className="w-full bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg shadow-indigo-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all group flex items-center gap-6 stagger-1"
        >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <Bitcoin size={32} className="text-indigo-600" />
            </div>
            <div className="text-left flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Deposit Crypto</h3>
                <p className="text-gray-500 text-sm font-medium">BTC, ETH, SOL and more</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-50 group-hover:text-gray-900">
                <ArrowLeft size={20} className="rotate-180" />
            </div>
        </button>
      </div>
      
      <div className="mt-12 text-center animate-fade-in stagger-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Secure & Instant Processing</p>
      </div>
    </div>
  );
};