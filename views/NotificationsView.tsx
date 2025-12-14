import React from 'react';
import { ArrowLeft, Bell, TrendingUp, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface NotificationsViewProps {
  onBack: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onBack }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Deposit Received',
      message: 'You received 0.045 BTC from external wallet.',
      time: '2 mins ago',
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      id: 2,
      type: 'trend',
      title: 'Price Alert',
      message: 'Bitcoin is up 5.2% in the last hour! 🚀',
      time: '1 hour ago',
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'security',
      title: 'New Device Detected',
      message: 'Login from iPhone 14 Pro in San Francisco, CA.',
      time: '3 hours ago',
      icon: ShieldAlert,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
        id: 4,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance tonight at 02:00 UTC.',
        time: '1 day ago',
        icon: Bell,
        color: 'text-purple-500',
        bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] safe-pb-nav pt-safe-top px-6 font-sans">
      <header className="flex justify-between items-center py-6 mb-6 animate-fade-in">
        <button onClick={onBack} className="w-10 h-10 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-black transition-all shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        <button className="text-xs font-bold text-purple-600 hover:text-purple-800">
            Mark all read
        </button>
      </header>

      <div className="space-y-4 animate-slide-up stagger-1">
        {notifications.map((notif, index) => {
            const Icon = notif.icon;
            return (
                <div 
                    key={notif.id}
                    className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className={`w-12 h-12 rounded-2xl ${notif.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={24} className={notif.color} />
                    </div>
                    <div className="flex-1 py-0.5">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900 text-sm">{notif.title}</h3>
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            {notif.message}
                        </p>
                    </div>
                </div>
            )
        })}
        
        <div className="text-center pt-8 pb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No more notifications</p>
        </div>
      </div>
    </div>
  );
};