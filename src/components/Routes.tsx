import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Settings2, Zap, DollarSign, Database, GripVertical, CheckCircle2, RotateCcw } from 'lucide-react';
import { strategies } from '../constants';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const Routes = () => {
  const [routeMode, setRouteMode] = useState<'manual' | 'auto'>('manual');
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-4 py-4 space-y-6 max-w-3xl mx-auto pb-24"
    >
      <div className="mt-4">
        <h2 className="font-display text-2xl font-bold mb-2">{t('routes.title')}</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {t('routes.desc')}
        </p>
      </div>

      {/* Routing Mode */}
      <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">{t('routes.mode')}</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">{t('routes.modeDesc')}</p>
          </div>
          <div className="flex p-1 bg-surface-container rounded-lg border border-outline-variant">
            <button 
              onClick={() => setRouteMode('manual')}
              className={`px-4 py-1.5 rounded-md text-[10px] font-bold shadow-sm ${routeMode === 'manual' ? 'bg-white text-primary' : 'text-on-surface-variant hover:bg-white/50'}`}
            >
              {t('routes.manualBtn')}
            </button>
            <button 
              onClick={() => setRouteMode('auto')}
              className={`px-4 py-1.5 rounded-md text-[10px] font-bold shadow-sm ${routeMode === 'auto' ? 'bg-white text-primary' : 'text-on-surface-variant hover:bg-white/50'}`}
            >
              {t('routes.autoBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* Manual Configuration */}
      {routeMode === 'manual' && (
      <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Settings2 className="w-5 h-5" />
          <h3 className="text-sm font-bold">{t('routes.manual')}</h3>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{t('routes.primaryModel')}</label>
          <div className="relative group">
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium">
              <option>GPT-4o (OpenAI)</option>
              <option>Claude 3.5 Sonnet (Anthropic)</option>
              <option>Gemini 1.5 Pro (Google)</option>
              <option>Llama 3 70B (Groq)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] font-mono text-on-surface-variant/70 italic">
            {t('routes.manualDesc')}
          </p>
        </div>
      </div>
      )}

      {/* Auto-Routing Strategies */}
      {routeMode === 'auto' && (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{t('routes.auto')}</h3>
          <span className="text-[10px] font-mono font-bold text-secondary">3 Strategies Active</span>
        </div>
        <div className="space-y-3">
          {strategies.map((strategy) => (
            <Link to="/strategy-config" key={strategy.id} className="block">
              <div className={cn(
                "flex items-center gap-4 bg-white border border-outline-variant rounded-xl p-4 shadow-sm hover:border-secondary transition-colors group",
                !strategy.active && "opacity-60"
              )}>
                <div className="cursor-grab text-outline">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold">{strategy.name}</span>
                    {strategy.optimized && (
                      <span className="bg-secondary-container/20 text-secondary text-[8px] px-2 py-0.5 rounded-full font-black uppercase">Optimized</span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant group-hover:bg-secondary group-hover:text-white transition-colors">
                  {strategy.icon === 'Zap' && <Zap className="w-5 h-5" />}
                  {strategy.icon === 'DollarSign' && <DollarSign className="w-5 h-5" />}
                  {strategy.icon === 'Database' && <Database className="w-5 h-5" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      )}

      {/* Actions */}
      <div className="pt-6 space-y-3">
        <button 
          onClick={() => alert('Route settings saved successfully!')}
          className="w-full bg-primary text-on-primary font-bold text-sm py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {t('common.save')} Route Changes
          <CheckCircle2 className="w-5 h-5" />
        </button>
        <button 
          onClick={() => {
            if(window.confirm('Reset all routing combinations to default settings?')) {
              alert('Settings reset.');
            }
          }}
          className="w-full bg-transparent border border-outline text-on-surface-variant font-bold text-[10px] py-3 rounded-xl hover:bg-surface-container transition-colors uppercase tracking-widest"
        >
          {t('routes.reset')}
        </button>
      </div>
    </motion.div>
  );
};

// Internal components for this file
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
