import React, { useState } from 'react';
import { ArrowLeft, Copy, CheckCircle, Share2, Info } from 'lucide-react';
import { CryptoAsset } from '../types';

interface DepositCryptoViewProps {
  assets: CryptoAsset[];
  onBack: () => void;
}

export const DepositCryptoView: React.FC<DepositCryptoViewProps> = ({ assets, onBack }) => {
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>(assets[0]);
  const [copied, setCopied] = useState(false);

  // Mock address generation based on asset
  const getAddress = (symbol: string) => {
    if (symbol === 'BTC') return 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    if (symbol === 'ETH') return '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    return `0x${Math.random().toString(16).slice(2)}...`;
  };

  const address = getAddress(selectedAsset.symbol);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] safe-pb-nav pt-safe-top px-6 font-sans">
      <header className="flex items-center mb-6 py-6 animate-fade-in">
        <button onClick={onBack} className="w-10 h-10 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-black transition-all shadow-sm flex items-center justify-center mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Deposit {selectedAsset.symbol}</h1>
      </header>

      {/* Asset Selector */}
      <div className="mb-8 animate-slide-up">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block px-1">Select Network</label>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {assets.map(asset => (
                <button 
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all ${
                        selectedAsset.id === asset.id 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'
                    }`}
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${asset.color} text-white`}>
                        {asset.symbol[0]}
                    </div>
                    <span className="font-bold text-sm">{asset.symbol}</span>
                </button>
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center animate-slide-up stagger-1">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 mb-8 w-full flex flex-col items-center relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-2 ${selectedAsset.color}`}></div>
              
              {/* QR Code Placeholder */}
              <div className="w-64 h-64 bg-white rounded-[2rem] mb-8 flex items-center justify-center relative shadow-inner p-4 border border-gray-100 mt-6">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${address}`} alt="Address QR" className="w-full h-full object-contain mix-blend-multiply opacity-90" />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white p-2 rounded-lg shadow-xl border border-gray-100">
                            <div className={`w-8 h-8 ${selectedAsset.color} rounded-md flex items-center justify-center text-white font-bold text-[10px]`}>
                                {selectedAsset.symbol[0]}
                            </div>
                        </div>
                     </div>
              </div>

              <div className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-200 mb-2 group cursor-pointer hover:border-gray-300 transition-colors" onClick={handleCopy}>
                  <div className="truncate text-xs text-gray-500 font-mono flex-1 mr-4">
                     {address}
                  </div>
                  <button className={`font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-white shadow-sm border border-gray-200 text-gray-700'}`}>
                     {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                     {copied ? 'Copied' : 'Copy'}
                  </button>
              </div>
          </div>

          <div className="w-full space-y-3">
            <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-[1.2rem] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95">
                <Share2 size={20} />
                Share Address
            </button>
            
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-blue-700">
                <Info size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-xs font-medium leading-relaxed">
                    Send only <span className="font-bold">{selectedAsset.name} ({selectedAsset.symbol})</span> to this address. Sending any other coins may result in permanent loss.
                </p>
            </div>
          </div>
       </div>
    </div>
  );
};