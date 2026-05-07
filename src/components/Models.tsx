import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Plus, Gauge, Receipt, Database, X } from 'lucide-react';
import { models as initialModels } from '../constants';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Models = () => {
  const { t } = useLanguage();
  const [modelList, setModelList] = useState(initialModels);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');

  const handleAddModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newModelName.trim()) {
      setModelList([...modelList, {
        id: Math.random().toString(36).substr(2, 9),
        name: newModelName,
        status: 'active',
        quota: 100,
        latency: '0ms',
        lastPing: 'Just now',
        icon: 'openai'
      }]);
      setNewModelName('');
      setShowAddModal(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-4 py-4 space-y-6 max-w-2xl mx-auto"
    >
      <div className="flex items-end justify-between mt-4">
        <div>
          <h2 className="font-display text-2xl font-bold mb-1">{t('models.title')}</h2>
          <p className="text-sm text-on-surface-variant">{t('models.subtitle')}</p>
        </div>
        <div className="bg-primary-container/10 px-3 py-1 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase">{modelList.filter(m => m.status === 'active').length} {t('models.active')}</span>
        </div>
      </div>

      <div className="space-y-4">
        {modelList.map((model) => (
          <div key={model.id} className="glass-card rounded-xl p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden",
                  model.icon === 'openai' ? "bg-black" : 
                  model.icon === 'anthropic' ? "bg-[#D97757]/10" : "bg-primary-container/10"
                )}>
                  {model.icon === 'openai' && <div className="text-white font-bold italic">AI</div>}
                  {model.icon === 'anthropic' && <div className="text-[#D97757] font-bold">A</div>}
                  {model.icon === 'deepseek' && <Database className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">{model.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("w-2 h-2 rounded-full", model.status === 'active' ? "bg-tertiary" : "bg-error")} />
                    <span className={cn("text-[10px] font-bold uppercase", model.status === 'active' ? "text-tertiary" : "text-error")}>
                      {model.status === 'active' ? t('common.active') : t('common.offline')}
                    </span>
                  </div>
                </div>
              </div>
              <Link to={`/model-detail/${model.id}`} className="text-outline hover:text-primary transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
            </div>

            <div className={cn("space-y-2", model.status === 'offline' && "opacity-60")}>
              <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase">
                <span>{t('models.remainingQuota')}</span>
                <span>{model.quota}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div 
                  className={cn("h-full", model.status === 'active' ? (model.quota > 70 ? "bg-tertiary" : "bg-secondary") : "bg-error")} 
                  style={{ width: `${model.quota}%` }} 
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className={cn("text-[10px] font-mono", model.status === 'offline' ? "text-error" : "text-outline")}>
                  {model.status === 'offline' ? t('models.statusOffline') : `${t('models.latency')} ${model.latency}`}
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant">{t('models.lastPing')} {model.lastPing}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-8">
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
          <Gauge className="w-5 h-5 text-secondary mb-1" />
          <span className="text-[10px] font-bold text-on-surface-variant uppercase">{t('models.avgLatency')}</span>
          <span className="font-display text-xl font-bold">658ms</span>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-1">
          <Receipt className="w-5 h-5 text-tertiary mb-1" />
          <span className="text-[10px] font-bold text-on-surface-variant uppercase">{t('models.totalTokens')}</span>
          <span className="font-display text-xl font-bold">1.2M</span>
        </div>
      </div>

      <button 
        onClick={() => setShowAddModal(true)} 
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{t('models.addBtn')}</h3>
                <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">{t('models.modelName')}</label>
                  <input
                    type="text"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter') handleAddModel(e as any);
                    }}
                    placeholder={t('models.modelNamePlaceholder') as string}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddModel}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl active:scale-[0.98] transition-transform"
                >
                  {t('models.addBtn')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
