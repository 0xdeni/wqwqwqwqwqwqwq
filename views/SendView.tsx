import React, { useState } from 'react';
import { ArrowLeft, ScanLine, User, ArrowRight, Check } from 'lucide-react';
import { CryptoAsset } from '../types';

interface SendViewProps {
  assets: CryptoAsset[];
  onBack: () => void;
}

export const SendView: React.FC<SendViewProps> = ({ assets, onBack }) => {
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>(assets[0]); // Default to first asset
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');

  const handleSend = () => {
    setStep('confirm');
    setTimeout(() => setStep('success'), 2000);
  };

  if (step === 'success') {
      return (
        <div className="min-h-screen bg-[#F8F9FB] pt-safe-top px-6 flex flex-col items-center justify-center font-sans text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200 animate-scale-in">
                <Check size={40} className="text-white" strokeWidth={4} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-slide-up">Transaction Sent!</h2>
            <p className="text-gray-500 mb-8 animate-slide-up stagger-1">
                You successfully sent <span className="font-bold text-gray-900">{amount} {selectedAsset.symbol}</span>
            </p>
            <button 
                onClick={onBack}
                className="w-full max-w-xs py-4 bg-gray-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform animate-slide-up stagger-2"
            >
                Back to Wallet
            </button>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] safe-pb-nav pt-safe-top px-6 font-sans">
      <header className="flex justify-between items-center py-6 mb-4 animate-fade-in">
        <button onClick={onBack} className="w-10 h-10 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-black transition-all shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Send Crypto</h1>
        <div className="w-10"></div>
      </header>

      <div className="animate-slide-up">
        {/* Asset Selector */}
        <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block px-1">Select Asset</label>
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

        {/* Amount Input */}
        <div className="flex flex-col items-center justify-center mb-8 relative z-10">
             <div className="relative flex items-center justify-center mb-2">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full text-6xl font-bold text-gray-900 bg-transparent border-none outline-none text-center placeholder-gray-200"
                  autoFocus
                />
             </div>
             <p className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                ≈ ${amount ? (parseFloat(amount) * selectedAsset.valueUsd).toFixed(2) : '0.00'} USD
             </p>
             <p className="text-xs text-gray-400 mt-2">Available: {selectedAsset.balance} {selectedAsset.symbol}</p>
        </div>

        {/* Address Input */}
        <div className="glass-panel-light p-1 rounded-2xl shadow-sm mb-8 transition-shadow focus-within:ring-2 focus-within:ring-purple-100 bg-white">
           <div className="flex items-center px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 mr-3">
                  <User size={20} />
              </div>
              <div className="flex-1">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Recipient Address</label>
                 <input 
                     type="text" 
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder={`Enter ${selectedAsset.name} Address`}
                     className="w-full font-bold text-gray-900 bg-transparent outline-none text-sm placeholder-gray-300"
                 />
              </div>
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <ScanLine size={20} />
              </button>
           </div>
        </div>

        <button 
            onClick={handleSend}
            disabled={!amount || !address || step === 'confirm'}
            className={`w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 ${
                (!amount || !address) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.98]'
            }`}
        >
            {step === 'confirm' ? 'Sending...' : 'Send Now'}
            {step !== 'confirm' && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
};