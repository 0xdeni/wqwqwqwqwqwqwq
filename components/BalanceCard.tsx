import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Currency } from '../types';

interface BalanceCardProps {
  currency?: Currency;
  t?: any;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ currency = 'USD', t }) => {
  const isBRL = currency === 'BRL';
  const exchangeRate = 5.50;
  
  // Mock base values in USD
  const baseBalanceUSD = 746.95;
  const baseChangeUSD = 242.54;

  // Calculate Primary Display
  const primaryRate = isBRL ? exchangeRate : 1;
  const primarySymbol = isBRL ? 'R$' : '$';
  const primaryBalance = (baseBalanceUSD * primaryRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const [main, decimal] = primaryBalance.split('.');
  
  // Calculate Secondary Display
  const secondaryRate = isBRL ? 1 : exchangeRate;
  const secondarySymbol = isBRL ? '$' : 'R$';
  const secondaryBalance = (baseBalanceUSD * secondaryRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const changeValue = (baseChangeUSD * primaryRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="relative w-full p-8 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 transform transition-all hover:scale-[1.01] duration-500 group cursor-default isolate animate-scale-in border border-white/5 bg-[#0F0F13]">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0">
         <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A23] via-[#0F0F13] to-[#050505]"></div>
         <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px] animate-pulse"></div>
         <div className="absolute bottom-[-30%] left-[-20%] w-[250px] h-[250px] bg-purple-600/15 rounded-full blur-[60px]"></div>
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-2">
        <span className="text-gray-400 text-[11px] font-bold tracking-[0.25em] mb-4 uppercase opacity-80">{t?.totalBalance || 'Total Balance'}</span>
        
        <div className="flex flex-col items-center mb-6">
            <div className="flex items-baseline drop-shadow-2xl">
                <span className="text-3xl font-bold text-gray-500 mr-2 self-start mt-2">{primarySymbol}</span>
                <span className="text-6xl font-extrabold tracking-tighter text-white">{main}</span>
                <span className="text-3xl font-bold text-gray-500 ml-1 self-start mt-2">.{decimal}</span>
            </div>
            {/* Secondary Balance Display */}
            <div className="mt-1 px-3 py-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                 <span className="text-sm font-semibold text-gray-400">≈ {secondarySymbol} {secondaryBalance}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer group-hover:border-white/20 shadow-lg">
          <div className="bg-emerald-500/20 rounded-full p-1">
            <ArrowUpRight size={12} className="text-emerald-400" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-emerald-400 tracking-wide">+{primarySymbol}{changeValue}</span>
          <span className="text-xs font-semibold text-gray-500 ml-1">{t?.today || 'Today'}</span>
        </div>
      </div>
    </div>
  );
};