import React from 'react';
import { Wallet, BarChart2, Repeat, User, CreditCard } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  setTab: (tab: Tab) => void;
  isDark?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setTab }) => {
  const navItems = [
    { id: Tab.SWAP, icon: Repeat },
    { id: Tab.STATS, icon: BarChart2 },
    { id: Tab.WALLET, icon: Wallet, label: 'Wallet' },
    { id: Tab.CARD, icon: CreditCard },
    { id: Tab.PROFILE, icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe-bottom mb-4 pointer-events-none">
      <div className="flex items-center gap-1.5 p-1.5 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-auto backdrop-blur-xl bg-[#111116]/80 border border-white/10 ring-1 ring-white/5 mx-6 animate-slide-up">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          if (item.id === Tab.WALLET) {
             return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 rounded-[2rem] transition-all duration-500 group overflow-hidden
                    ${isActive 
                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className="relative z-10" />
                    {isActive && <span className="text-sm font-bold relative z-10">Wallet</span>}
                </button>
             )
          }

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`p-4 rounded-full transition-all duration-300 relative group
                ${isActive ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              {isActive && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};