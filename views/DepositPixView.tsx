import React, { useState } from 'react';
import { ArrowLeft, Copy, QrCode, CheckCircle, Share2 } from 'lucide-react';

interface DepositPixViewProps {
  onBack: () => void;
}

export const DepositPixView: React.FC<DepositPixViewProps> = ({ onBack }) => {
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'input' | 'qr'>('input');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!amount) return;
    setStep('qr');
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
     <div className="min-h-screen bg-[#F8F9FB] safe-pb-nav pt-safe-top px-6 font-sans">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 py-6 animate-fade-in">
           <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-600 hover:text-black transition-all flex items-center justify-center">
             <ArrowLeft size={20} />
           </button>
           <h1 className="text-lg font-bold text-gray-900">Deposit Pix</h1>
           <div className="w-10"></div> 
        </header>

        {step === 'input' ? (
           <div className="flex flex-col h-[calc(100vh-200px)] animate-slide-up">
              <div className="flex-1 flex flex-col items-center justify-center">
                 <label className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-6 bg-gray-100 px-3 py-1 rounded-full">Enter Amount</label>
                 
                 <div className="relative flex items-center justify-center mb-8">
                    <span className={`text-5xl font-bold transition-colors ${amount ? 'text-gray-900' : 'text-gray-300'}`}>R$</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0,00"
                      className="w-auto min-w-[120px] max-w-[300px] text-7xl font-bold text-gray-900 bg-transparent border-none outline-none text-center placeholder-gray-200 ml-2"
                      autoFocus
                    />
                 </div>
                 
                 <div className="flex gap-3 stagger-1">
                    {[50, 100, 200].map(val => (
                        <button 
                            key={val}
                            onClick={() => setAmount(val.toString())}
                            className="px-6 py-2.5 bg-white rounded-full text-sm font-bold text-gray-600 border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-sm"
                        >
                            + R${val}
                        </button>
                    ))}
                 </div>
              </div>
              
              <div className="glass-panel-light p-5 rounded-3xl shadow-sm mb-6 flex gap-4 items-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm border border-emerald-100">
                     <QrCode size={24} />
                  </div>
                  <div>
                     <h3 className="text-sm font-bold text-gray-900 mb-0.5">Instant Deposit</h3>
                     <p className="text-xs text-gray-500 font-medium">Pay with Pix and receive funds instantly.</p>
                  </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!amount}
                className={`w-full py-4 rounded-[1.2rem] font-bold text-lg text-white shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                    amount ? 'bg-black hover:bg-gray-900 shadow-gray-400/30' : 'bg-gray-300 cursor-not-allowed shadow-none'
                }`}
              >
                 Generate Code
              </button>
           </div>
        ) : (
           <div className="flex flex-col items-center animate-slide-up">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 mb-8 w-full flex flex-col items-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                  
                  <div className="mb-8 text-center mt-4">
                     <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Total Amount</p>
                     <p className="text-4xl font-bold text-gray-900 tracking-tight">R$ {parseFloat(amount).toFixed(2)}</p>
                  </div>
                  
                  {/* Mock QR Code */}
                  <div className="w-64 h-64 bg-white rounded-[2rem] mb-8 flex items-center justify-center relative shadow-inner p-4 border border-gray-100">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540${amount.replace('.','')}5802BR5913Otsem Pay Inc6008Brasilia62070503***63041D3D`} alt="PIX QR" className="w-full h-full object-contain mix-blend-multiply opacity-90" />
                         
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white p-2.5 rounded-xl shadow-xl border border-gray-100">
                                <div className="w-8 h-8 bg-[#32BCAD] rounded-lg flex items-center justify-center text-white font-bold text-[10px]">PIX</div>
                            </div>
                         </div>
                  </div>

                  <div className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-200 mb-2 group cursor-pointer hover:border-gray-300 transition-colors" onClick={handleCopy}>
                      <div className="truncate text-xs text-gray-500 font-mono flex-1 mr-4">
                         00020126580014BR.GOV.BCB.PIX0136...
                      </div>
                      <button className={`font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-white shadow-sm border border-gray-200 text-gray-700'}`}>
                         {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                         {copied ? 'Copied' : 'Copy'}
                      </button>
                  </div>
              </div>

              <div className="w-full space-y-3 stagger-1">
                <button className="w-full py-4 bg-emerald-500 text-white font-bold rounded-[1.2rem] hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 active:scale-95">
                    <Share2 size={20} />
                    Share Code
                </button>
                
                <button onClick={() => setStep('input')} className="w-full py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    Cancel Transaction
                </button>
              </div>
           </div>
        )}
     </div>
  );
};