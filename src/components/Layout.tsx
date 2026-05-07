import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, Bell, Home, Puzzle, GitBranch, BarChart3, User, Search, ChevronLeft, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../contexts/NotificationContext';

export const TopBar = () => {
  const location = useLocation();
  const isDetail = location.pathname.includes('/detail');
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="bg-surface/70 backdrop-blur-xl border-b border-outline-variant shadow-sm sticky top-0 z-50 flex justify-between items-center h-16 px-4 w-full">
      <div className="flex items-center gap-2">
        {isDetail ? (
           <button onClick={() => window.history.back()} className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors text-primary font-bold">
             <ChevronLeft className="w-6 h-6" />
           </button>
        ) : (
          <LayoutGrid className="w-6 h-6 text-primary" />
        )}
        <h1 className="font-display text-xl font-bold text-primary">
          {isDetail ? (location.pathname.includes('model') ? t('layout.modelDetails') : t('layout.logDetails')) : t('layout.gateway')}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant">
          <button 
            onClick={() => setLanguage('en')}
            className={cn("px-3 py-1 rounded-full text-[10px] font-bold transition-all", language === 'en' ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high")}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('zh')}
            className={cn("px-3 py-1 rounded-full text-[10px] font-bold transition-all", language === 'zh' ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high")}
          >
            中文
          </button>
        </div>
        {!isDetail && (
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors relative"
            >
              <Bell className="w-5 h-5 text-on-surface-variant" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-white text-[8px] font-black flex items-center justify-center rounded-full border border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-outline-variant overflow-hidden z-50 p-2"
                  >
                    <div className="px-4 py-3 border-b border-outline-variant/30 flex justify-between items-center">
                      <span className="font-bold text-sm tracking-tight">Notifications</span>
                      <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-surface-container rounded-full">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto py-2 space-y-1">
                      {notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markAsRead(n.id);
                            // Optionally navigate
                          }}
                          className={cn(
                            "px-4 py-3 hover:bg-surface-container transition-colors cursor-pointer rounded-2xl mx-1",
                            n.unread ? "bg-primary/5" : "bg-transparent opacity-60"
                          )}
                        >
                          <div className="flex justify-between items-start mb-0.5">
                            <span className={cn("text-xs font-bold", n.unread ? "text-on-surface" : "text-on-surface-variant")}>{n.title}</span>
                            <span className="text-[8px] font-black text-outline uppercase">{n.time}</span>
                          </div>
                          <p className="text-[10px] text-on-surface-variant leading-relaxed line-clamp-2">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
        <NavLink to="/profile" className={({isActive}) => cn("w-8 h-8 rounded-full border-2 border-primary/20 overflow-hidden transition-all bg-surface-container", isActive ? "ring-2 ring-primary ring-offset-2" : "")}>
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256" alt="Profile" className="w-full h-full object-cover" />
        </NavLink>
      </div>
    </header>
  );
};

export const BottomNav = () => {
  const { t } = useLanguage();
  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/models', icon: Puzzle, label: t('nav.models') },
    { to: '/routes', icon: GitBranch, label: t('nav.routes') },
    { to: '/stats', icon: BarChart3, label: t('nav.stats') },
    { to: '/profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface/80 backdrop-blur-2xl border-t border-outline-variant/30 shadow-lg flex justify-around items-center h-16 px-2 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center transition-all duration-200",
              isActive ? "text-secondary scale-105 font-bold" : "text-on-surface-variant opacity-70 hover:text-primary"
            )
          }
        >
          <item.icon className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label as string}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-grow pb-20">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
};
