import React from 'react';
import { motion } from 'motion/react';
import { Bot, KeyRound, Server, PlayCircle, AlertTriangle, Settings, ChevronRight, Gauge } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const ModelDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="px-4 py-4 space-y-6 max-w-2xl mx-auto pb-24"
    >
      {/* Header Card */}
      <section className="bg-white border border-outline-variant rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center ring-4 ring-primary-container/5">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">GPT-4 Turbo</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => alert('Changes saved successfully!')} 
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-primary-container active:scale-95 transition-all"
        >
          {t('common.save')}
        </button>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* API Config */}
        <section className="bg-white border border-outline-variant rounded-2xl p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Interface Config</h3>
            <Settings className="w-3.5 h-3.5 text-outline" />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-on-surface-variant uppercase">API Key (SK-...)</label>
              <div className="bg-surface-container flex items-center gap-3 px-3 py-2.5 rounded-xl border border-outline-variant/20 shadow-inner">
                <KeyRound className="w-4 h-4 text-outline" />
                <input type="password" value="sk-proj-xxxxxxxx" readOnly className="bg-transparent border-none text-xs w-full focus:ring-0 font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-on-surface-variant uppercase">Base URL</label>
              <div className="bg-surface-container flex items-center gap-3 px-3 py-2.5 rounded-xl border border-outline-variant/20 shadow-inner">
                <Server className="w-4 h-4 text-outline" />
                <input type="text" value="https://api.openai.com/v1" className="bg-transparent border-none text-xs w-full focus:ring-0 font-mono" />
              </div>
            </div>
          </div>
        </section>

        {/* Usage Limits */}
        <section className="bg-white border border-outline-variant rounded-2xl p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Usage Limits</h3>
            <Gauge className="w-3.5 h-3.5 text-outline" />
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-bold text-on-surface-variant uppercase">Max Concurrency</label>
                <span className="text-xs font-black text-secondary">50</span>
              </div>
              <input type="range" min="1" max="100" defaultValue="50" className="w-full h-1.5 bg-surface-container rounded-full appearance-none accent-secondary cursor-pointer" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-on-surface-variant uppercase">Monthly Cap (USD)</label>
              <div className="bg-surface-container flex items-center gap-3 px-3 py-2 rounded-xl border border-outline-variant/20 shadow-inner">
                <span className="text-outline font-bold text-xs">$</span>
                <input type="number" defaultValue="200" className="bg-transparent border-none text-xs w-full focus:ring-0 font-bold" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Test Section */}
      <section className="bg-white border border-outline-variant rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">{t('modelDetail.startTest') || 'Connection Test'}</h3>
          <button 
            onClick={() => alert('Starting test ping...')}
            className="flex items-center gap-2 px-4 py-1.5 border border-secondary text-secondary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-secondary/5 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            {t('modelDetail.startTest')}
          </button>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 shadow-2xl overflow-hidden relative group">
          <div className="flex justify-between items-center mb-4 text-white/40">
             <span className="text-[8px] font-black uppercase tracking-[0.2em] font-mono">Response JSON</span>
             <span className="text-[8px] font-black uppercase tracking-[0.2em] font-mono text-tertiary-container">Latency: 124ms</span>
          </div>
          <pre className="text-[10px] text-primary-container font-mono leading-relaxed overflow-x-auto selection:bg-white/20">
            {JSON.stringify({
              status: "success",
              model: "gpt-4-0125-preview",
              usage: { prompt_tokens: 12, total_tokens: 20 }
            }, null, 2)}
          </pre>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* Danger Zone */}
      <section className="pt-4 space-y-3">
        <h3 className="text-[10px] font-black text-error uppercase tracking-[0.2em] px-1">{t('modelDetail.dangerZone')}</h3>
        <div className="bg-error/5 border border-error/10 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-error">{t('modelDetail.delete')}</h4>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1 leading-relaxed">
              {t('modelDetail.deleteDesc')}
            </p>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to permanently delete this model?')) {
                alert('Model deleted.');
              }
            }}
            className="bg-error text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-error/90 active:scale-95 transition-all"
          >
            {t('modelDetail.delete')}
          </button>
        </div>
      </section>
    </motion.div>
  );
};
