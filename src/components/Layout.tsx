import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, Bell, Home, Puzzle, GitBranch, BarChart3, User, Search, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const TopBar = () => {
  const location = useLocation();
  const isDetail = location.pathname.includes('/detail');
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-surface/70 backdrop-blur-xl border-b border-outline-variant shadow-sm sticky top-0 z-50 flex justify-between items-center h-16 px-4 w-full">
      <div className="flex items-center gap-2">
        {isDetail ? (
           <button onClick={() => window.history.back()} className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors">
             <ChevronLeft className="w-6 h-6 text-on-surface-variant" />
           </button>
        ) : (
          <LayoutGrid className="w-6 h-6 text-primary" />
        )}
        <h1 className="font-display text-xl font-bold text-primary">
          {isDetail ? (location.pathname.includes('model') ? 'Model Details' : 'Log Details') : 'AI Gateway'}
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
          <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
            <Bell className="w-5 h-5 text-on-surface-variant" />
          </button>
        )}
        <NavLink to="/workspace" className={({isActive}) => cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors", isActive ? "bg-primary text-white" : "bg-secondary-container text-on-secondary-container")}>
          JS
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
