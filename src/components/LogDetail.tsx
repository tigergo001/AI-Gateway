import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Receipt, Share2, Download, Terminal, RefreshCcw, CircleCheck, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const LogDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [openBlocks, setOpenBlocks] = useState({ request: true, response: true });

  const copyId = () => {
    navigator.clipboard.writeText(id || 'req_8k2n9m1p5z7x4v9q');
    alert(t('logDetail.copyId') as string);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="px-4 py-4 space-y-4 max-w-2xl mx-auto pb-24"
    >
      {/* Header Info */}
      <section className="bg-white border border-outline-variant rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2">{t('logDetail.reqId')}</span>
            <div className="flex items-center gap-2 group cursor-pointer" onClick={copyId}>
              <span className="font-mono text-sm text-on-surface font-semibold">{id || 'req_8k2n9m1p5z7x4v9q'}</span>
              <Copy className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/20 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            <span className="text-[10px] font-black text-tertiary uppercase tracking-widest">{t('logDetail.success')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-outline-variant/20">
          <div>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase mb-1 block">{t('logDetail.timestamp')}</span>
            <span className="text-xs font-bold">2023-11-24 14:32:05</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase mb-1 block">{t('logDetail.latency')}</span>
            <span className="text-xs font-bold">1,245 ms</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase mb-1 block">{t('logDetail.model')}</span>
            <span className="text-xs font-bold text-primary">GPT-4o-Turbo</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase mb-1 block">{t('logDetail.sourceIp')}</span>
            <span className="text-xs font-bold">192.168.1.1</span>
          </div>
        </div>
      </section>

      {/* Token Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2 bg-white border border-outline-variant rounded-2xl p-5 shadow-sm">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">{t('logDetail.tokenDist')}</h3>
          <div className="space-y-6">
            <div className="relative h-2 w-full bg-surface-container rounded-full overflow-hidden flex shadow-inner">
              <div className="h-full bg-primary" style={{ width: '35%' }} />
              <div className="h-full bg-secondary" style={{ width: '65%' }} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase">{t('logDetail.prompt')}</span>
                </div>
                <span className="font-display text-xl font-bold">1,024</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase">{t('logDetail.completion')}</span>
                </div>
                <span className="font-display text-xl font-bold">2,048</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase mb-1 block">{t('logDetail.total')}</span>
                <span className="font-display text-xl font-bold text-secondary">3,072</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-outline-variant rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">{t('logDetail.estCost')}</h3>
          <div>
            <span className="font-display text-3xl font-bold text-primary">¥0.42</span>
            <p className="text-[8px] font-mono text-outline mt-2 leading-none">(1.0k * 0.01) + (2.0k * 0.03)</p>
          </div>
          <button 
            onClick={() => alert(t('logDetail.billingAlert') as string)}
            className="w-full bg-primary/5 hover:bg-primary/10 text-primary font-bold text-[10px] py-1.5 rounded-lg flex items-center justify-center gap-2 mt-4 uppercase tracking-widest transition-colors"
          >
            <Receipt className="w-3.5 h-3.5" />
            {t('logDetail.billing')}
          </button>
        </section>
      </div>

      {/* Code Blocks */}
      <div className="space-y-4">
        {[
          { label: t('logDetail.reqBody'), id: 'request', icon: Terminal, color: 'text-primary' },
          { label: t('logDetail.resBody'), id: 'response', icon: CircleCheck, color: 'text-tertiary' }
        ].map((block) => {
          const isOpen = openBlocks[block.id as keyof typeof openBlocks];
          return (
          <div key={block.id} className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
            <div 
              onClick={() => setOpenBlocks(prev => ({ ...prev, [block.id]: !isOpen }))}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <block.icon className={cn("w-5 h-5", block.color)} />
                <h3 className="text-sm font-bold">{block.label}</h3>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-outline transition-transform", !isOpen && "-rotate-90")} />
            </div>
            {isOpen && (
            <div className="p-4 pt-0">
               <pre className="bg-surface-container-low rounded-xl p-4 text-[11px] font-mono text-on-surface-variant overflow-x-auto leading-relaxed border border-outline-variant/30 shadow-inner">
                 {block.id === 'request' ? 
                   JSON.stringify({ 
                     model: 'gpt-4o-turbo', 
                     messages: [{ role: 'system', content: 'Design focused assistant' }],
                     temperature: 0.7 
                   }, null, 2) : 
                   JSON.stringify({
                     id: 'chat-9292',
                     status: 'success',
                     content: 'The architectural framework of the requested design...'
                   }, null, 2)
                 }
               </pre>
            </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button 
          onClick={() => alert(t('logDetail.exportAlert') as string)}
          className="flex-1 bg-surface-container-highest text-on-surface-variant font-bold text-[10px] py-3.5 rounded-xl border border-outline-variant flex items-center justify-center gap-2 hover:bg-outline-variant/20 transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          <Download className="w-4 h-4" />
          {t('logDetail.export')}
        </button>
        <button 
          onClick={() => alert(t('logDetail.rerunAlert') as string)}
          className="flex-1 bg-primary text-white font-bold text-[10px] py-3.5 rounded-xl shadow-lg active:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          <RefreshCcw className="w-4 h-4" />
          {t('logDetail.rerun')}
        </button>
      </div>
    </motion.div>
  );
};

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
