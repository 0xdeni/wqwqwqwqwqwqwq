import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { CryptoAsset, Currency } from '../types';

interface AssetRowProps {
  asset: CryptoAsset;
  onClick: () => void;
  currency?: Currency;
}

export const AssetRow: React.FC<AssetRowProps> = ({ asset, onClick, currency = 'USD' }) => {
  const chartData = asset.history.map((val, i) => ({ i, val }));
  const isPositive = asset.change >= 0;

  const isBRL = currency === 'BRL';
  const rate = isBRL ? 5.50 : 1;
  const symbol = isBRL ? 'R$' : '$';
  const value = (asset.valueUsd * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div 
      onClick={onClick}
      className="group flex items-center justify-between p-4 glass-panel rounded-[1.8rem] transition-all duration-300 cursor-pointer active:scale-[0.98] relative overflow-hidden hover:bg-white/5"
    >
      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-transparent via-indigo-500 to-transparent blur-sm"></div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center text-white font-bold text-sm shadow-inner ${asset.color} bg-opacity-90`}>
          {asset.symbol[0]}
        </div>
        <div>
          <h3 className="font-bold text-[16px] leading-tight mb-0.5">{asset.name}</h3>
          <span className="text-xs font-semibold opacity-50">{asset.symbol}</span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="w-20 h-10 opacity-50 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={isPositive ? '#10b981' : '#f43f5e'} 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-right relative z-10">
        <p className="font-bold text-[16px]">{symbol}{value}</p>
        <p className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isPositive ? '+' : ''}{asset.change}%
        </p>
      </div>
    </div>
  );
};