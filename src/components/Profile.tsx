import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Key, Copy, Building2, Gauge, ShieldCheck, ChevronRight, LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logout } = useAuth();
  const [alerts, setAlerts] = useState(true);
  const [emails, setEmails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="px-4 py-4 space-y-4 max-w-md mx-auto pb-24 font-sans"
    >
      {/* Profile Card */}
      <section className="bg-white rounded-2xl p-4 border border-outline-variant shadow-sm flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-primary-container object-cover bg-surface-container overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256" 
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-tertiary-container text-white p-1 rounded-full border-2 border-white">
            <BadgeCheck className="w-4 h-4 fill-white text-tertiary-container" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-on-surface">Alex Chen</h2>
          <p className="text-sm text-on-surface-variant font-medium">alex.chen@enterprise-ai.io</p>
          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-secondary text-[8px] font-black tracking-widest uppercase">
            Premium Plan
          </div>
        </div>
      </section>

      {/* API Key Card */}
      <section className="bg-primary text-on-primary rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary-container rounded-full opacity-30 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5" />
            <h3 className="font-display text-lg font-bold">{t('profile.apiManagement')}</h3>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/20 flex items-center justify-between backdrop-blur-sm">
            <code className="font-mono text-xs tracking-widest opacity-90">••••••••••••••••4f2a</code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText("sk-proj-xxxxxxxx4f2a");
                alert('API Key copied to clipboard!');
              }}
              className="flex items-center gap-1.5 bg-white text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all"
            >
              <ContentCopy className="w-3.5 h-3.5" />
              Copy
            </button>
          </div>
          <p className="mt-4 text-[9px] opacity-70 italic leading-relaxed">
            {t('profile.apiKeyDesc')}
          </p>
        </div>
      </section>

      {/* Settings Menu */}
      <section className="space-y-2">
        <h4 className="text-[10px] font-bold text-on-surface-variant px-1 uppercase tracking-widest">{t('nav.settings')}</h4>
        <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden divide-y divide-outline-variant/20">
          {[
            { icon: Building2, label: t('profile.workspace'), path: '/workspace' },
            { icon: Gauge, label: t('profile.usageLimits'), path: '/profile' },
            { icon: ShieldCheck, label: t('profile.accountSecurity'), path: '/profile' },
          ].map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)} className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors active:opacity-80">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-on-surface-variant" />
            </button>
          ))}
        </div>
      </section>

      {/* Toggles */}
      <section className="bg-white border border-outline-variant rounded-2xl p-4 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">{t('profile.sysAlerts')}</p>
            <p className="text-[10px] text-on-surface-variant italic">{t('profile.sysAlertsDesc')}</p>
          </div>
          <div 
            onClick={() => setAlerts(!alerts)}
            className={cn("w-10 h-5 rounded-full relative p-0.5 cursor-pointer flex items-center transition-colors", alerts ? "bg-secondary" : "bg-surface-container-highest")}
          >
            <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-all", alerts ? "ml-auto" : "ml-0")} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">{t('profile.emailSum')}</p>
            <p className="text-[10px] text-on-surface-variant italic">{t('profile.emailSumDesc')}</p>
          </div>
          <div 
            onClick={() => setEmails(!emails)}
            className={cn("w-10 h-5 rounded-full relative p-0.5 cursor-pointer flex items-center transition-colors", emails ? "bg-secondary" : "bg-surface-container-highest")}
          >
            <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-all", emails ? "ml-auto" : "ml-0")} />
          </div>
        </div>
      </section>

      {/* Logout */}
      <button 
        onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/login');
          }
        }}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-error/5 text-error font-display font-bold hover:bg-error/10 active:scale-[0.98] transition-all border border-error/10"
      >
        <LogOut className="w-5 h-5" />
        {t('profile.logout')}
      </button>

      <p className="text-center text-[10px] font-bold text-on-surface-variant/40 pt-4 uppercase tracking-widest">
        AI Gateway v2.4.0-stable
      </p>
    </motion.div>
  );
};

const ContentCopy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
  </svg>
);
