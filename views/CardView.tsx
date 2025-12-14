import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Lock, Settings, History, Plus } from 'lucide-react';

export const CardView: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  // The specific image provided by user
  const CARD_SKIN_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7C5S9v6Q2.png";

  return (
    <div className="min-h-screen safe-pb-nav font-sans px-6 pt-safe-top overflow-hidden relative">
       {/* Background */}
       <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="mb-8 mt-6 relative z-10 animate-fade-in flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Cards</h1>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
            <Plus size={20} />
        </button>
      </header>

      {/* Virtual Card Container */}
      <div className="relative w-full aspect-[1.586] rounded-[2rem] mb-10 shadow-2xl animate-slide-up group perspective-1000">
         <div className="relative w-full h-full rounded-[2rem] overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02] shadow-2xl ring-1 ring-white/10">
            
             {/* Card Skin Image */}
             <img 
                src={CARD_SKIN_URL} 
                alt="Card Skin" 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isFrozen ? 'grayscale brightness-75' : ''}`}
             />
             
             {/* Frozen Overlay */}
             {isFrozen && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20">
                     <div className="bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-2">
                         <Lock size={16} className="text-white" />
                         <span className="text-xs font-bold text-white uppercase tracking-wider">Card Frozen</span>
                     </div>
                 </div>
             )}

             {/* Dynamic Content Overlay - Positioned to look realistic on the card */}
             <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                 {/* Top Row - Intentionally empty to let card design shine, or move logo here if needed */}
                 <div className="flex justify-end">
                     {/* Visa Logo is likely on the image, if not we can add one: */}
                     {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-6 opacity-80 mix-blend-screen" /> */}
                 </div>

                 {/* Bottom Row - Dynamic Data */}
                 <div className="mt-auto">
                     {/* Card Number */}
                     <div className="flex items-center gap-4 mb-6">
                         <div className="font-mono text-xl tracking-[0.15em] text-white/90 drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                             {showDetails ? '4823 1234 5678 9012' : '•••• •••• •••• 9012'}
                         </div>
                         <button 
                            onClick={() => setShowDetails(!showDetails)} 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white/80 transition-colors"
                         >
                             {showDetails ? <EyeOff size={14} /> : <Eye size={14} />}
                         </button>
                     </div>

                     {/* Name and Date */}
                     <div className="flex justify-between items-end">
                         <div>
                             <div className="text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1 drop-shadow-sm">Card Holder</div>
                             <div className="font-bold tracking-wider text-white drop-shadow-md text-sm">JENNY WILSON</div>
                         </div>
                         <div className="text-right">
                             <div className="text-[8px] font-bold uppercase tracking-widest text-white/60 mb-1 drop-shadow-sm">Expires</div>
                             <div className="font-bold tracking-wider text-white drop-shadow-md text-sm">12/28</div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between gap-4 mb-10 animate-slide-up stagger-1">
          <ControlButton 
            icon={Lock} 
            label={isFrozen ? "Unfreeze" : "Freeze"} 
            active={isFrozen} 
            onClick={() => setIsFrozen(!isFrozen)} 
          />
          <ControlButton icon={Settings} label="Settings" onClick={() => {}} />
          <ControlButton icon={History} label="History" onClick={() => {}} />
          <ControlButton icon={Copy} label="Copy No." onClick={() => {}} />
      </div>

      {/* Recent Transactions */}
      <div className="animate-slide-up stagger-2">
          <h2 className="text-lg font-bold mb-4 px-1">Recent Activity</h2>
          <div className="space-y-3">
              <TransactionItem name="Netflix Subscription" date="Today, 10:00 AM" amount="-$15.99" icon="N" color="bg-red-600" />
              <TransactionItem name="Spotify Premium" date="Yesterday, 4:30 PM" amount="-$9.99" icon="S" color="bg-green-500" />
              <TransactionItem name="Apple Store" date="Jun 24, 2023" amount="-$1,099.00" icon="A" color="bg-white text-black" />
          </div>
      </div>
    </div>
  );
};

const ControlButton = ({ icon: Icon, label, active, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`flex-1 flex flex-col items-center gap-2 group`}
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-white text-black shadow-lg' : 'glass-panel text-white group-hover:bg-white/10'}`}>
            <Icon size={24} />
        </div>
        <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">{label}</span>
    </button>
);

const TransactionItem = ({ name, date, amount, icon, color }: any) => (
    <div className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${color}`}>
                {icon}
            </div>
            <div>
                <div className="font-bold text-sm">{name}</div>
                <div className="text-xs opacity-50">{date}</div>
            </div>
        </div>
        <div className="font-bold">{amount}</div>
    </div>
);