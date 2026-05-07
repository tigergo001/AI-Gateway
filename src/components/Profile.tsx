import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Key, Copy, Building2, Gauge, ShieldCheck, ChevronRight, LogOut, Bell, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useToast } from '../contexts/ToastContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logout } = useAuth();
  const { notifications } = useNotifications();
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState(true);
  const [emails, setEmails] = useState(false);
  const [activeView, setActiveView] = useState<'main' | 'limits' | 'security' | 'edit_info' | 'notifications'>('main');
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@enterprise-ai.io',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256'
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText('sk-gateway-v1-xxxxxxxxxxxx');
    showToast(t('profile.copyAlert') as string, 'success');
  };

  if (activeView === 'edit_info') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-4 py-4 space-y-6 max-w-md mx-auto pb-24"
      >
        <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" />
          {t('common.back')}
        </button>
        <header>
          <h2 className="font-display text-2xl font-bold">Edit Profile</h2>
          <p className="text-sm text-on-surface-variant mt-1">Update your personal information.</p>
        </header>

        <section className="bg-white border border-outline-variant rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-primary/10 overflow-hidden">
                <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                <span className="text-[10px] font-black uppercase">Change</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Full Name</label>
            <input 
              type="text" 
              value={userInfo.name} 
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none font-bold" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Email Address</label>
            <input 
              type="email" 
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none font-bold" 
            />
          </div>
          <button 
            onClick={() => {
              showToast(t('profile.updateSuccess') as string, 'success');
              setActiveView('main');
            }}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            {t('common.save')}
          </button>
        </section>
      </motion.div>
    );
  }

  if (activeView === 'notifications') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-4 py-4 space-y-6 max-w-md mx-auto pb-24"
      >
        <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" />
          {t('common.back')}
        </button>
        <header>
          <h2 className="font-display text-2xl font-bold">Notifications</h2>
          <p className="text-sm text-on-surface-variant mt-1">Stay updated with system events.</p>
        </header>

        <section className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={cn(
              "p-4 rounded-2xl border transition-all",
              n.unread ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-white border-outline-variant/30 opacity-70"
            )}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm tracking-tight">{n.title}</span>
                <span className="text-[9px] font-bold text-outline-variant uppercase">{n.time}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </section>
      </motion.div>
    );
  }

  if (activeView === 'limits') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-4 py-4 space-y-6 max-w-md mx-auto pb-24"
      >
        <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" />
          {t('common.back')}
        </button>
        <header>
          <h2 className="font-display text-2xl font-bold">{t('profile.usageLimitsTitle')}</h2>
          <p className="text-sm text-on-surface-variant mt-1">{t('profile.usageDesc')}</p>
        </header>

        <section className="bg-white border border-outline-variant rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">{t('profile.dailyQuota')}</label>
            <input type="number" defaultValue="500000" className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">{t('profile.monthlyBudget')}</label>
            <input type="number" defaultValue="1000" className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">{t('profile.alertThreshold')}</label>
            <div className="flex items-center gap-4">
              <input type="range" className="flex-1 accent-primary" />
              <span className="font-bold text-sm">80%</span>
            </div>
          </div>
          <button 
            onClick={() => {
              showToast(t('profile.updateSuccess') as string, 'success');
              setActiveView('main');
            }}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            {t('common.save')}
          </button>
        </section>
      </motion.div>
    );
  }

  if (activeView === 'security') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-4 py-4 space-y-6 max-w-md mx-auto pb-24"
      >
        <button onClick={() => setActiveView('main')} className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" />
          {t('common.back')}
        </button>
        <header>
          <h2 className="font-display text-2xl font-bold">{t('profile.securityTitle')}</h2>
          <p className="text-sm text-on-surface-variant mt-1">{t('profile.securityDesc')}</p>
        </header>

        <section className="bg-white border border-outline-variant rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">{t('profile.currentPwd')}</label>
            <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">{t('profile.newPwd')}</label>
            <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">{t('profile.confirmPwd')}</label>
            <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none" />
          </div>
          <button 
            onClick={() => {
              showToast(t('profile.updateSuccess') as string, 'success');
              setActiveView('main');
            }}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            {t('profile.changePwd')}
          </button>
        </section>

        <div className="bg-surface-container rounded-2xl p-4 flex items-center justify-between border border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">{t('profile.twoFactor')}</span>
          </div>
          <div className="w-10 h-5 bg-surface-container-highest rounded-full relative p-0.5 pointer-events-none opacity-50">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="px-4 py-4 space-y-4 max-w-md mx-auto pb-24 font-sans"
    >
      {/* Profile Card */}
      <section className="bg-white rounded-2xl p-4 border border-outline-variant shadow-sm flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setActiveView('edit_info')}
            className="p-2 bg-surface-container rounded-full hover:scale-105 transition-all text-on-surface-variant"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-primary-container object-cover bg-surface-container overflow-hidden">
            <img 
              src={userInfo.avatar} 
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white">
            <BadgeCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-on-surface">{userInfo.name}</h2>
          <p className="text-sm text-on-surface-variant font-medium">{userInfo.email}</p>
          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-secondary text-[8px] font-black tracking-widest uppercase">
            {t('profile.premiumPlan')}
          </div>
        </div>
      </section>

      {/* API Key Card */}
      <section className="bg-surface-container-high rounded-2xl p-4 border border-outline-variant shadow-sm border-l-4 border-l-primary">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{t('profile.apiManagement')}</h4>
            <p className="text-[11px] text-on-surface-variant leading-tight">{t('profile.apiKeyDesc')}</p>
          </div>
          <Key className="w-5 h-5 text-primary opacity-20" />
        </div>
        <div className="bg-white/50 border border-outline-variant/30 rounded-xl p-3 flex items-center justify-between mt-3 backdrop-blur-sm">
          <code className="text-xs font-mono font-bold tracking-wider">sk-••••••••••••</code>
          <button 
            onClick={handleCopyKey}
            className="flex items-center gap-1.5 bg-white text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all shadow-sm border border-outline-variant/30"
          >
            <Copy className="w-3.5 h-3.5" />
            {t('profile.copyBtn')}
          </button>
        </div>
      </section>

      {/* Settings Menu */}
      <section className="space-y-2">
        <h4 className="text-[10px] font-bold text-on-surface-variant px-1 uppercase tracking-widest">{t('nav.settings')}</h4>
        <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden divide-y divide-outline-variant/20">
          {[
            { icon: Building2, label: t('profile.workspace'), onClick: () => navigate('/workspace') },
            { icon: Gauge, label: t('profile.usageLimits'), onClick: () => setActiveView('limits') },
            { icon: ShieldCheck, label: t('profile.accountSecurity'), onClick: () => setActiveView('security') },
          ].map((item) => (
            <button key={item.label} onClick={item.onClick} className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors active:opacity-80">
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
          if (window.confirm(t('profile.logoutConfirm') as string)) {
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
