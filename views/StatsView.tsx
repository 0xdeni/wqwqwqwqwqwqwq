import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { CryptoAsset, TimeFrame, Currency } from '../types';

interface StatsViewProps {
  asset: CryptoAsset;
  onBack: () => void;
  t: any;
  currency: Currency;
}

export const StatsView: React.FC<StatsViewProps> = ({ asset, onBack, t, currency }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.H24);
  const isBRL = currency === 'BRL';
  const rate = isBRL ? 5.50 : 1;
  const symbol = isBRL ? 'R$' : '$';
  const currentValue = asset.valueUsd * rate;

  const detailedData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    val: currentValue * (1 + (Math.random() * 0.1 - 0.05)),
  }));

  return (
    <div className="min-h-screen safe-pb-nav font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 px-6 pt-safe-top">
        {/* Glass Header */}
        <header className="flex justify-between items-center py-6 mb-4 animate-fade-in">
          <button onClick={onBack} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center animate-slide-up">
            <span className="font-bold text-lg">{asset.name}</span>
            <span className="text-xs opacity-60 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{asset.symbol}</span>
          </div>
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
            <Settings size={20} />
          </button>
        </header>

        {/* Price Hero */}
        <div className="flex flex-col items-center mb-10 animate-slide-up stagger-1">
          <h1 className="text-5xl font-bold mb-2 tracking-tight">{symbol}{currentValue.toLocaleString('en-US', {maximumFractionDigits: 2})}</h1>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${asset.change >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
            {asset.change >= 0 ? '↑' : '↓'} {Math.abs(asset.change)}%
          </span>
        </div>

        {/* Timeframe Selector - Glass Pill */}
        <div className="flex justify-between bg-white/5 p-1.5 rounded-2xl mb-10 border border-white/5 backdrop-blur-md animate-slide-up stagger-2">
          {Object.values(TimeFrame).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                timeFrame === tf ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="h-64 w-full mb-8 relative animate-scale-in stagger-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={detailedData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Line 
                type="natural" 
                dataKey="val" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1500}
              />
              <Tooltip 
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#a78bfa', fontWeight: 'bold' }}
                formatter={(val: number) => [`${symbol}${val.toFixed(2)}`, '']}
                labelStyle={{ display: 'none' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 animate-slide-up stagger-4">
          <button className="flex-1 bg-[var(--text)] text-[var(--background)] font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
            {t.buy} {asset.symbol}
          </button>
          <button className="flex-1 glass-panel font-bold py-4 rounded-2xl hover:bg-white/10 active:scale-95 transition-all">
            {t.sell}
          </button>
        </div>

        {/* Market Stats Glass Card */}
        <div className="glass-panel rounded-3xl p-6 animate-slide-up stagger-4 mb-20 border border-white/5">
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
              {t.stats}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="opacity-50 text-sm">{t.marketCap}</span>
              <span className="font-bold font-mono">$231,233,492</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="opacity-50 text-sm">{t.circSupply}</span>
              <span className="font-bold font-mono">114,211 {asset.symbol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-50 text-sm">{t.volume}</span>
              <span className="font-bold font-mono">$842.2M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};