import React, { useState } from 'react';
import { User, Mail, Lock, Camera, LogOut, Check, Globe, Moon, Sun, DollarSign, Edit2 } from 'lucide-react';
import { AppSettings } from '../types';

interface ProfileViewProps {
    onNotifications?: () => void;
    settings: AppSettings;
    onUpdateSettings: (settings: AppSettings) => void;
    t: any;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNotifications, settings, onUpdateSettings, t }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    password: 'password123'
  });
  const [editData, setEditData] = useState(userData);

  const startEditing = () => { setIsEditing(true); setEditData(userData); };
  const saveChanges = () => { setUserData(editData); setIsEditing(false); };
  const cancelChanges = () => { setIsEditing(false); setEditData(userData); };

  const toggleTheme = () => {
      onUpdateSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const toggleCurrency = () => {
      onUpdateSettings({ ...settings, currency: settings.currency === 'USD' ? 'BRL' : 'USD' });
  };

  const toggleLanguage = () => {
      onUpdateSettings({ ...settings, language: settings.language === 'en' ? 'pt' : 'en' });
  };

  return (
    <div className="min-h-screen safe-pb-nav pt-safe-top px-6 font-sans">
      <header className="flex justify-between items-center py-6 mb-4 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">{t.profile}</h1>
        {isEditing ? (
           <div className="flex gap-3">
             <button onClick={cancelChanges} className="px-4 py-2 font-semibold opacity-60 hover:opacity-100 transition-colors text-sm">{t.cancel}</button>
             <button onClick={saveChanges} className="bg-white text-black px-5 py-2 rounded-xl text-sm font-semibold shadow-lg hover:bg-gray-200 transition-all flex items-center gap-1 active:scale-95">
                <Check size={14} />
                {t.save}
             </button>
           </div>
        ) : (
           <button onClick={startEditing} className="w-10 h-10 glass-panel rounded-xl hover:bg-white/10 transition-all flex items-center justify-center">
             <Edit2 size={18} />
           </button>
        )}
      </header>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8 animate-scale-in">
        <div className="relative group cursor-pointer">
          <div className="w-32 h-32 rounded-full p-1 glass-panel">
             <img 
                src="https://picsum.photos/200/200" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
             />
          </div>
          <div className="absolute bottom-1 right-1 p-3 bg-white text-black rounded-full shadow-lg border-4 border-black/50 hover:scale-110 transition-transform">
            <Camera size={16} />
          </div>
        </div>
        {!isEditing && (
            <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">{userData.username}</h3>
                <p className="opacity-50 text-sm font-medium">@{userData.username.toLowerCase().replace(/\s/g, '')}</p>
            </div>
        )}
      </div>

      <div className="space-y-3 animate-slide-up stagger-1 pb-10">
        
        {/* Settings Toggles Group */}
        <div className="glass-panel p-4 rounded-3xl space-y-4 mb-4 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 px-2">{t.preferences}</h3>
            
            <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={toggleTheme}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                        {settings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <span className="font-bold text-sm">{t.darkMode}</span>
                </div>
                <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${settings.theme === 'dark' ? 'bg-purple-600' : 'bg-gray-400'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={toggleCurrency}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <DollarSign size={20} />
                    </div>
                    <span className="font-bold text-sm">{t.currency}</span>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold border border-white/5">
                    {settings.currency}
                </div>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={toggleLanguage}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Globe size={20} />
                    </div>
                    <span className="font-bold text-sm">{t.language}</span>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold border border-white/5 uppercase">
                    {settings.language}
                </div>
            </div>
        </div>

        {/* User Info Group */}
        <div className="glass-panel p-4 rounded-3xl space-y-2 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 px-2 mb-2">{t.account}</h3>
            {['Full Name', 'Email', 'Password'].map((label, i) => {
                const icon = [User, Mail, Lock][i];
                const val = [userData.username, userData.email, '••••••••'][i];
                return (
                    <div key={label} className="flex items-center p-2">
                         <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-3`}>
                             {React.createElement(icon, { size: 18, className: "opacity-70" })}
                         </div>
                         <div className="flex-1">
                             <div className="text-[10px] font-bold uppercase opacity-50">{label}</div>
                             <div className="font-bold text-sm">{val}</div>
                         </div>
                    </div>
                );
            })}
        </div>

        <button className="w-full py-4 mt-6 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-500/10 rounded-2xl transition-colors text-sm">
           <LogOut size={18} />
           {t.logout}
        </button>

      </div>
    </div>
  );
};