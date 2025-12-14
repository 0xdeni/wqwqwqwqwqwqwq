import React from 'react';
import { Settings, SlidersHorizontal, Send, RefreshCw, ArrowDownCircle, Bell, Link, ChevronDown, User } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';
import { AssetRow } from '../components/AssetRow';
import { CryptoAsset, Currency } from '../types';

interface WalletViewProps {
  assets: CryptoAsset[];
  onAssetClick: (asset: CryptoAsset) => void;
  onDeposit: () => void;
  onSend: () => void;
  onNotifications: () => void;
  currency: Currency;
  t: any;
}

export const WalletView: React.FC<WalletViewProps> = ({ assets, onAssetClick, onDeposit, onSend, onNotifications, currency, t }) => {
  return (
    <div className="min-h-screen safe-pb-nav font-sans">
        {/* Subtle Ambient Background Glows */}
        <div className="fixed top-0 left-0 w-full h-[600px] overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

      <div className="relative z-10 px-6 pt-safe-top">
        {/* Improved Premium Header */}
        <header className="flex justify-between items-center py-6 mb-2 animate-fade-in">
          <div className="flex items-center gap-3 glass-panel p-2 pr-5 rounded-full cursor-pointer hover:bg-white/10 transition-colors group">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center relative z-10 overflow-hidden">
                     <User size={20} className="text-gray-400" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t.welcome}</span>
                <span className="text-sm font-bold leading-none">Jenny Wilson</span>
            </div>
            <ChevronDown size={14} className="opacity-40" />
          </div>
          
          <div className="flex gap-3">
             <button 
                onClick={onNotifications}
                className="w-12 h-12 glass-panel rounded-full flex items-center justify-center hover:bg-white/10 relative group transition-all duration-300"
             >
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></span>
             </button>
          </div>
        </header>

        <div className="mb-8">
            <BalanceCard currency={currency} t={t} />
        </div>

        {/* Premium Glass Action Buttons */}
        <div className="flex justify-between gap-4 mb-10 animate-slide-up stagger-1 px-1">
            <ActionButton 
                icon={ArrowDownCircle} 
                label={t.deposit} 
                onClick={onDeposit} 
                iconClass="text-emerald-400"
                bgClass="bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30"
                delay="0ms" 
            />
            <ActionButton 
                icon={Send} 
                label={t.send} 
                onClick={onSend} 
                iconClass="text-indigo-400"
                bgClass="bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                delay="100ms" 
            />
            <ActionButton 
                icon={RefreshCw} 
                label={t.swap} 
                onClick={() => {}} 
                iconClass="text-violet-400"
                bgClass="bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/30"
                delay="200ms" 
            />
            <ActionButton 
                icon={Link} 
                label={t.connect} 
                onClick={() => alert("Wallet Connect Initiated")} 
                iconClass="text-sky-400"
                bgClass="bg-sky-500/10 border-sky-500/20 hover:bg-sky-500/20 hover:border-sky-500/30"
                delay="300ms" 
            />
        </div>

        {/* Assets Section */}
        <div className="flex justify-between items-end mb-5 animate-slide-up stagger-2">
          <h2 className="text-xl font-bold tracking-tight">{t.assets}</h2>
          <button className="px-3 py-1.5 glass-panel rounded-lg flex items-center gap-2 text-xs font-bold hover:bg-white/10 transition-colors">
            <span>Sort by</span>
            <SlidersHorizontal size={14} />
          </button>
        </div>

        <div className="space-y-3 pb-4 animate-slide-up stagger-3">
          {assets.map((asset) => (
            <AssetRow 
              key={asset.id} 
              asset={asset} 
              onClick={() => onAssetClick(asset)} 
              currency={currency}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, onClick, iconClass, bgClass, delay }: any) => (
    <button 
        onClick={onClick}
        className="flex-1 flex flex-col items-center gap-3 group cursor-pointer active:scale-95 transition-all duration-300"
        style={{ animationDelay: delay }}
    >
        <div className={`w-[4rem] h-[4rem] rounded-[1.4rem] flex items-center justify-center backdrop-blur-md border shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${bgClass} ${iconClass}`}>
            <Icon size={24} strokeWidth={2} />
        </div>
        <span className="text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">{label}</span>
    </button>
);