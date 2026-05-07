import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, CreditCard, Layers, Terminal, RefreshCcw, AlertTriangle, ChevronRight, Zap, Search } from 'lucide-react';
import { activities, usageChartData } from '../constants';
import { cn } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="px-4 py-4 space-y-4 max-w-5xl mx-auto"
  >
    {children}
  </motion.div>
);

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState<'live' | '24h'>('live');

  return (
    <PageWrapper>
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder={t('home.search') as string}
          className="w-full bg-white border border-outline-variant rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="text-tertiary font-bold text-[10px] flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">{t('home.todayTokens')}</p>
          <p className="font-display text-2xl font-bold text-primary">842.1k</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <CreditCard className="w-5 h-5 text-secondary" />
            <span className="text-on-surface-variant font-bold text-[10px]">USD</span>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">{t('home.estCost')}</p>
          <p className="font-display text-2xl font-bold text-primary">$124.50</p>
        </div>

        <div className="glass-card rounded-xl p-4 col-span-2 md:col-span-1">
          <div className="flex justify-between items-start mb-2">
            <Layers className="w-5 h-5 text-secondary" />
            <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center border-2 border-white text-[10px] font-bold text-white">
              4
            </div>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">{t('home.activeModels')}</p>
          <p className="font-display text-2xl font-bold text-primary">12</p>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-display text-lg font-bold">{t('home.realtimeUsage')}</h2>
            <p className="text-xs text-on-surface-variant">{t('home.tokenConsumption')}</p>
          </div>
          <div className="flex gap-2 p-1 bg-surface-container rounded-lg">
            <button 
              onClick={() => setTimeframe('live')}
              className={`px-3 py-1 rounded-md text-[10px] font-bold shadow-sm ${timeframe === 'live' ? 'bg-white text-primary' : 'text-on-surface-variant hover:bg-white/50'}`}
            >
              {t('home.live')}
            </button>
            <button 
              onClick={() => setTimeframe('24h')}
              className={`px-3 py-1 rounded-md text-[10px] font-bold shadow-sm ${timeframe === '24h' ? 'bg-white text-primary' : 'text-on-surface-variant hover:bg-white/50'}`}
            >
              {t('home.24h')}
            </button>
          </div>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#d97706" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-2 px-1 text-[9px] text-on-surface-variant font-bold uppercase">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>{t('home.now')}</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{t('home.recentActivity')}</h3>
        </div>
        <div className="divide-y divide-outline-variant/30">
          {activities.map((activity) => (
            <Link key={activity.id} to={`/log-detail/${activity.id}`} className="px-4 py-3 flex items-center justify-between hover:bg-surface-container/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  activity.type === 'request' ? "bg-primary-container/10 text-primary" :
                  activity.type === 'route' ? "bg-tertiary-container/10 text-tertiary" :
                  "bg-error-container/10 text-error"
                )}>
                  {activity.type === 'request' ? <Terminal className="w-5 h-5" /> :
                   activity.type === 'route' ? <RefreshCcw className="w-5 h-5" /> :
                   <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold">{activity.title}</p>
                  <p className="text-xs text-on-surface-variant">{activity.description}</p>
                </div>
              </div>
              <p className="text-[10px] font-mono text-on-surface-variant">{activity.time}</p>
            </Link>
          ))}
        </div>
        <div className="p-3 text-center border-t border-outline-variant/30">
          <button 
            onClick={() => navigate('/stats')}
            className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
          >
            {t('home.viewAll')}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};
