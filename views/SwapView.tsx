import React, { useState } from 'react';
import { ArrowDown, Settings, Info, ChevronDown } from 'lucide-react';
import { CryptoAsset } from '../types';

interface SwapViewProps {
  assets: CryptoAsset[];
  t: any;
}

export const SwapView: React.FC<SwapViewProps> = ({ assets, t }) => {
  const [fromAmount, setFromAmount] = useState<string>('');
  const [isSwapping, setIsSwapping] = useState(false);
  
  const fromAsset = assets.find(a => a.symbol === 'ETH') || assets[0];
  const toAsset = assets.find(a => a.symbol === 'BTC') || assets[1];

  const exchangeRate = 0.054;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * exchangeRate).toFixed(6) : '';

  return (
    <div className="min-h-screen safe-pb-nav pt-safe-top px-6 font-sans">
      <header className="flex justify-between items-center py-6 mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">{t.swap}</h1>
        <button className="w-10 h-10 glass-panel rounded-xl hover:bg-white/10 transition-all flex items-center justify-center">
          <Settings size={20} />
        </button>
      </header>

      <div className="glass-panel p-2 mb-4 rounded-[2.5rem] relative animate-slide-up border border-white/10">
        
        {/* FROM Section */}
        <div className="p-6 pb-2">
            <div className="flex justify-between mb-4">
                <span className="text-xs font-bold opacity-50 uppercase tracking-wider">{t.payWith}</span>
                <span className="text-xs font-bold opacity-50">{t.balance}: {fromAsset.balance} {fromAsset.symbol}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="number" 
                    placeholder="0" 
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-2/3 text-4xl font-bold bg-transparent outline-none placeholder-gray-500 text-[var(--text)]"
                />
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-2xl transition-colors border border-white/5">
                    <div className={`w-6 h-6 rounded-full ${fromAsset.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                        {fromAsset.symbol[0]}
                    </div>
                    <span className="font-bold">{fromAsset.symbol}</span>
                    <ChevronDown size={16} className="opacity-50" />
                </button>
            </div>
            <p className="text-sm opacity-40 font-medium">$ {fromAmount ? (parseFloat(fromAmount) * fromAsset.valueUsd).toFixed(2) : '0.00'}</p>
        </div>

        {/* Swap Divider */}
        <div className="relative h-2 my-2">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <button 
                    onClick={() => setIsSwapping(!isSwapping)}
                    className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-indigo-500 shadow-lg hover:scale-110 active:rotate-180 transition-all duration-300 border border-white/10 bg-[var(--surface)]"
                >
                    <ArrowDown size={24} strokeWidth={2.5} />
                </button>
            </div>
            <div className="absolute inset-x-6 top-0 border-b border-white/10 border-dashed"></div>
        </div>

        {/* TO Section */}
        <div className="p-6 pt-2 bg-white/5 rounded-b-[2.3rem]">
            <div className="flex justify-between mb-4 pt-4">
                <span className="text-xs font-bold opacity-50 uppercase tracking-wider">{t.receive}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="0" 
                    value={toAmount}
                    readOnly
                    className="w-2/3 text-4xl font-bold bg-transparent outline-none placeholder-gray-500 text-[var(--text)]"
                />
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-2xl transition-colors border border-white/5 shadow-sm">
                    <div className={`w-6 h-6 rounded-full ${toAsset.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                        {toAsset.symbol[0]}
                    </div>
                    <span className="font-bold">{toAsset.symbol}</span>
                    <ChevronDown size={16} className="opacity-50" />
                </button>
            </div>
            <p className="text-sm opacity-40 font-medium">
               {toAmount ? t.bestOffer : t.enterAmount}
            </p>
        </div>
      </div>

      {/* Details Card */}
      <div className="glass-panel p-5 rounded-3xl space-y-3 mb-8 animate-slide-up stagger-1 border border-white/5">
         <div className="flex justify-between items-center text-sm">
            <span className="opacity-50 font-medium flex items-center gap-1">
                {t.rate} <Info size={14} />
            </span>
            <span className="font-bold">1 {fromAsset.symbol} = {exchangeRate} {toAsset.symbol}</span>
         </div>
         <div className="flex justify-between items-center text-sm">
            <span className="opacity-50 font-medium">{t.networkFee}</span>
            <span className="font-bold">$2.45</span>
         </div>
         <div className="flex justify-between items-center text-sm">
            <span className="opacity-50 font-medium">{t.slippage}</span>
            <span className="font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">0.5%</span>
         </div>
      </div>

      <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all animate-slide-up stagger-2">
        {t.previewSwap}
      </button>

    </div>
  );
};