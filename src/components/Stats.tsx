import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Info, ChevronLeft, ChevronRight, Activity, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { modelUsageData, dailyCostData, logs } from '../constants';
import { cn } from '../lib/utils';

import { useLanguage } from '../contexts/LanguageContext';

export const Stats = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="px-4 py-4 space-y-4 max-w-4xl mx-auto pb-24"
    >
      <div className="glass-card rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <input 
            type="text" 
            placeholder={t('stats.searchPlaceholder') as string}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 outline-none text-sm transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="w-full md:w-auto px-6 py-2 bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-2 active:opacity-80 transition-all text-sm">
          {t('stats.filter')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Model Usage Pie */}
        <div className="md:col-span-5 glass-card rounded-xl p-4 flex flex-col h-[350px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">{t('stats.modelUsage')}</h2>
            <Info className="w-4 h-4 text-outline" />
          </div>
          <div className="flex-grow flex items-center justify-center relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{t('stats.total')}</span>
              <span className="font-display text-2xl font-bold">1.2M</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelUsageData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {modelUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {modelUsageData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Cost Bar */}
        <div className="md:col-span-7 glass-card rounded-xl p-4 flex flex-col h-[350px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">{t('stats.dailyCost')}</h2>
            <select className="bg-surface-container-low border-none text-[10px] font-bold rounded-lg py-1 px-2 focus:ring-0">
              <option>{t('stats.last7Days')}</option>
              <option>{t('stats.last30Days')}</option>
            </select>
          </div>
          <div className="flex-grow py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyCostData}>
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]} 
                  fill="#d97706"
                >
                  {dailyCostData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.day === 'THU' ? '#ea580c' : '#d97706'} />
                  ))}
                </Bar>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700 }} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 border-t border-outline-variant/30 pt-4 flex justify-around">
            <div className="text-center">
              <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider">{t('stats.totalSpend')}</p>
              <p className="font-display text-lg font-bold text-primary">$428.12</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-wider">{t('stats.avgCost')}</p>
              <p className="font-display text-lg font-bold text-secondary">$0.0034</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">{t('stats.rawLogs')}</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">{t('stats.liveFeed')}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{t('stats.date')}</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{t('stats.model')}</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">{t('stats.cost')}</th>
                <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">{t('stats.colClass')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container/30 transition-colors cursor-pointer group" onClick={() => navigate(`/stats/detail/${log.id}`)}>
                  <td className="px-4 py-4 font-mono text-[10px] text-outline">{log.timestamp}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                       <span className="text-xs font-bold text-on-surface">{log.model}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-xs font-black text-on-surface font-mono">$0.00{Math.floor(Math.random() * 9)}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase",
                      log.status === '200' ? "bg-tertiary/10 text-tertiary" : "bg-error-container text-on-error-container"
                    )}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">{t('stats.showingLogs', { count: '50', total: '12,402' })}</span>
          <div className="flex gap-2">
            <button className="p-1 rounded bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container shadow-sm active:scale-95 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container shadow-sm active:scale-95 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
