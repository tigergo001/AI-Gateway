import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gauge, RotateCcw, Shuffle, Workflow, HelpCircle, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const StrategyConfig = () => {
  const { t } = useLanguage();
  const [strategy, setStrategy] = useState<'latency' | 'cost'>('latency');
  const [fallbackModel, setFallbackModel] = useState('GPT-4o Mini');
  const [streamSupport, setStreamSupport] = useState(false);
  const [backoff, setBackoff] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 space-y-4 max-w-4xl mx-auto pb-24"
    >
      <header className="glass-card rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary">{t('strategy.autoRouting')}</h2>
          <p className="text-xs text-on-surface-variant font-medium mt-1">{t('strategy.desc')}</p>
        </div>
        <div className="inline-flex bg-surface-container p-1 rounded-xl">
          <button 
             onClick={() => setStrategy('latency')}
             className={`px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${strategy === 'latency' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            {t('strategy.latencyFirst')}
          </button>
          <button 
             onClick={() => setStrategy('cost')}
             className={`px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${strategy === 'cost' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            {t('strategy.costFirst')}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Window & Thresholds */}
        <section className="md:col-span-8 bg-white border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold">{t('strategy.slidingWindow')}</h3>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">{t('strategy.windowSize')}</label>
                  <span className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-lg text-[10px] font-black font-mono">{t('strategy.requests', { val: '50' })}</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-surface-container rounded-full appearance-none accent-primary cursor-pointer" defaultValue={50} />
                <p className="text-[10px] text-on-surface-variant italic opacity-60">{t('strategy.windowDesc')}</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">{t('strategy.ttpThreshold')}</label>
                  <span className="bg-error-container/20 text-error px-3 py-1 rounded-lg text-[10px] font-black font-mono uppercase">{t('strategy.msVal', { val: '2000' })}</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-surface-container rounded-full appearance-none accent-error cursor-pointer" defaultValue={40} />
                <p className="text-[10px] text-on-surface-variant italic opacity-60">{t('strategy.ttpDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Retry & Support */}
        <section className="md:col-span-4 bg-white border border-outline-variant rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
               <RotateCcw className="w-5 h-5" />
             </div>
             <h3 className="font-display text-lg font-bold">{t('strategy.retryMechanism')}</h3>
          </div>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/20 shadow-inner">
              <label className="block text-[8px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2">{t('strategy.maxRetries')}</label>
              <select className="w-full bg-transparent border-none p-0 font-bold text-primary text-sm focus:ring-0">
                <option>{t('strategy.retriesRec')}</option>
                <option>{t('strategy.retriesFast')}</option>
                <option>{t('strategy.retriesHigh')}</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-xs font-bold text-on-surface uppercase">{t('strategy.expBackoff')}</span>
              <div 
                 onClick={() => setBackoff(!backoff)}
                 className={cn("w-10 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors", backoff ? "bg-secondary" : "bg-surface-container-highest")}
              >
                 <div className={cn("w-4 h-4 bg-white rounded-full transition-all", backoff ? "ml-auto" : "ml-0")} />
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-t border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant opacity-60 uppercase">{t('strategy.streamSupport')}</span>
              <div 
                 onClick={() => setStreamSupport(!streamSupport)}
                 className={cn("w-10 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors", streamSupport ? "bg-secondary" : "bg-surface-container-highest")}
              >
                <div className={cn("w-4 h-4 bg-white rounded-full transition-all", streamSupport ? "ml-auto" : "ml-0")} />
              </div>
            </div>
          </div>
        </section>

        {/* Fallback */}
        <section className="md:col-span-12 glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shuffle className="w-5 h-5 text-secondary" />
              <h3 className="font-display text-lg font-bold">{t('strategy.fallbackMod')}</h3>
            </div>
            <span className="text-[9px] font-black bg-white px-3 py-1 rounded-full border border-outline-variant shadow-sm uppercase tracking-widest text-on-surface-variant">{t('strategy.activeLbl')} {fallbackModel}</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'GPT-4o Mini', lat: '800ms', cost: '$0.15/1M' },
              { name: 'Claude 3 Haiku', lat: '400ms', cost: '$0.25/1M' },
              { name: 'Gemini 1.5 Flash', lat: '1200ms', cost: '$0.10/1M' }
            ].map((m) => (
              <div 
                key={m.name} 
                onClick={() => setFallbackModel(m.name)}
                className={cn(
                  "p-5 rounded-2xl border-2 transition-all cursor-pointer relative group",
                  m.name === fallbackModel ? "border-primary bg-primary/5 shadow-md" : "border-outline-variant hover:border-secondary"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm tracking-tight">{m.name}</h4>
                  {m.name === fallbackModel && <CheckCircle2 className="w-5 h-5 text-primary fill-primary/10" />}
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="text-[8px] font-black uppercase tracking-widest bg-white border border-outline-variant/50 px-2 py-0.5 rounded shadow-sm">{t('strategy.lat')} {m.lat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logic Explanation */}
        <section className="md:col-span-12 bg-primary-container text-on-primary-container rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-black/10" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <Workflow className="w-6 h-6 text-on-primary-container" />
              <h3 className="font-display text-xl font-bold uppercase tracking-widest">{t('strategy.executionLogic')}</h3>
            </div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-6">
                {[
                  { tag: 'IF', text: t('strategy.logicIf') },
                  { tag: 'THEN', text: t('strategy.logicThen', { model: fallbackModel }) },
                  { tag: 'RECOVER', text: t('strategy.logicRecover') }
                ].map((item) => (
                  <div key={item.tag} className="flex gap-6 items-start">
                    <div className="bg-black/10 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest shadow-inner w-20 text-center">{item.tag}</div>
                    <p className="text-sm font-medium leading-relaxed opacity-90">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/3 bg-black/80 text-white rounded-2xl p-6 font-mono text-[10px] leading-relaxed shadow-lg">
                 <pre className="whitespace-pre-wrap selection:bg-white/20">
                   {JSON.stringify({
                     strategy: `${strategy}_first`,
                     trigger: { metric: "p95", window: "50r", threshold: 2000 },
                     fallback: fallbackModel.toLowerCase().replace(/ /g, '-'),
                     auto_heal: true
                   }, null, 2)}
                 </pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky footer for config page */}
      <footer className="fixed bottom-16 left-0 right-0 p-4 flex justify-end gap-3 pointer-events-none">
        <div className="pointer-events-auto flex gap-3 translate-y-12 mb-4">
           <button 
             onClick={() => window.confirm(t('strategy.resetConfirm') as string) && alert(t('strategy.resetAlert') as string)}
             className="px-8 py-3 rounded-full bg-white border border-outline shadow-xl text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:bg-surface-container transition-all active:scale-95"
           >
             {t('strategy.reset')}
           </button>
           <button 
             onClick={() => alert(t('strategy.saveAlert') as string)}
             className="px-10 py-3 rounded-full bg-primary text-white shadow-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-95"
           >
             {t('strategy.save')}
           </button>
        </div>
      </footer>
    </motion.div>
  );
};

const Speedometer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Schema = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.001 0 0120.488 9z" />
  </svg>
);

const AltRoute = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
