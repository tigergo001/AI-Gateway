import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Component, Edit3, UserPlus, ArrowRight, Archive, Settings2, Trash2, Lock, Info, Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const WorkspaceManagement = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'invite'>('create');
  const [selectedWs, setSelectedWs] = useState<any>(null);

  const workspaces = [
    { 
      id: '1', name: t('workspace.prodEnv'), status: 'Active', 
      models: 12, created: '2023.10.15', members: ['JS', 'ML', '+3'], 
      color: 'bg-primary' 
    },
    { 
      id: '2', name: t('workspace.testBeta'), status: 'Idle', 
      models: 4, created: '2023.12.01', members: ['LZ'], 
      color: 'bg-secondary' 
    },
    { 
      id: '3', name: t('workspace.archiveYear'), status: 'Stopped', 
      models: 0, created: '2023.05.20', members: [], 
      locked: true, color: 'bg-surface-container-highest' 
    },
  ];

  const handleCreate = () => {
    setModalType('create');
    setSelectedWs(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ws: any) => {
    setModalType('edit');
    setSelectedWs(ws);
    setIsModalOpen(true);
  };

  const handleInvite = (ws: any) => {
    setModalType('invite');
    setSelectedWs(ws);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 space-y-6 max-w-2xl mx-auto pb-24"
    >
      <section className="flex justify-between items-end mt-4">
        <div>
          <h2 className="font-display text-2xl font-bold">{t('workspace.title')}</h2>
          <p className="text-sm text-on-surface-variant mt-1">{t('workspace.desc')}</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" />
          {t('workspace.create')}
        </button>
      </section>

      <div className="relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
         <input 
          type="text" 
          placeholder={t('workspace.search') as string} 
          className="w-full bg-white border border-outline-variant rounded-xl py-3.5 pl-10 pr-4 outline-none text-sm transition-all focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="space-y-4">
        {workspaces.map((ws) => (
          <div key={ws.id} className={cn(
            "glass-card border border-outline-variant p-5 rounded-2xl shadow-sm flex flex-col gap-4 group transition-all hover:shadow-md cursor-pointer",
            ws.locked && "opacity-70"
          )}
          onClick={() => {
            if(!ws.locked) alert(t('workspace.enterAlert', { val: ws.name as string }));
          }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center ring-4 ring-black/5", ws.color)}>
                  {ws.locked ? <Archive className={cn("w-6 h-6 text-on-surface-variant")} /> : <Component className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{ws.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={cn("w-1.5 h-1.5 rounded-full", ws.status === 'Active' ? 'bg-tertiary animate-pulse' : 'bg-outline')} />
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">{ws.status === 'Active' ? t('common.active') : ws.status === 'Stopped' ? t('common.offline') : ws.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => handleEdit(ws)}
                  className="p-2 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-on-surface-variant" />
                </button>
                <button 
                  onClick={() => handleInvite(ws)}
                  className="p-2 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-on-surface-variant" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/30">
              <div className="space-y-1">
                <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest">{t('workspace.confModels')}</span>
                <p className="font-display text-xl font-bold text-primary">{ws.models} <span className="text-[10px] font-normal text-on-surface-variant uppercase">{t('workspace.units')}</span></p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest">{t('workspace.createdDate')}</span>
                <p className="text-sm font-bold mt-1 text-on-surface-variant">{ws.created}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {ws.members.map((m, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[9px] font-black text-on-surface-variant shadow-sm">
                    {m}
                  </div>
                ))}
              </div>
              {ws.locked ? (
                 <div className="flex items-center gap-2 text-on-surface-variant/60 italic text-[10px]">
                   <span className="max-w-[140px] truncate">{t('workspace.autoLock')}</span>
                   <Lock className="w-4 h-4" />
                 </div>
              ) : (
                <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl flex gap-4">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <p className="text-xs text-primary font-medium leading-relaxed">
          <strong className="uppercase tracking-widest inline-block mb-1">{t('workspace.notice')}</strong> {t('workspace.noticeText', { val: <span className="underline font-black">3</span> })}
        </p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-outline-variant overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-xl font-bold">
                  {modalType === 'create' && t('workspace.modalTitleCreate')}
                  {modalType === 'edit' && t('workspace.modalTitleEdit')}
                  {modalType === 'invite' && t('workspace.modalTitleInvite')}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {(modalType === 'create' || modalType === 'edit') && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">{t('workspace.nameLabel')}</label>
                    <input 
                      type="text" 
                      defaultValue={modalType === 'edit' ? selectedWs?.name : ''}
                      placeholder={t('workspace.namePlaceholder') as string}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                    />
                  </div>
                )}

                {modalType === 'invite' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">{t('workspace.emailLabel')}</label>
                      <input 
                        type="email" 
                        placeholder={t('workspace.emailPlaceholder') as string}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-1">{t('workspace.roleLabel')}</label>
                      <select className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold appearance-none">
                        <option>{t('workspace.roleAdmin')}</option>
                        <option>{t('workspace.roleEditor')}</option>
                        <option>{t('workspace.roleViewer')}</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="pt-4 flex gap-3">
                  {modalType === 'edit' && (
                    <button 
                      onClick={() => {
                        if(window.confirm(t('workspace.confirmDelete') as string)) {
                          setIsModalOpen(false);
                          alert(t('common.status') + ': Deleted');
                        }
                      }}
                      className="flex-1 py-3 px-4 rounded-xl border border-error/20 text-error font-bold text-xs uppercase tracking-widest hover:bg-error/5 transition-colors"
                    >
                      {t('workspace.deleteBtn')}
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      alert(t('common.status') + ': Success');
                    }}
                    className="flex-[2] bg-primary text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all"
                  >
                    {t('common.save')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
