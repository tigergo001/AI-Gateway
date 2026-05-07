import React from 'react';
import { motion } from 'motion/react';
import { Plus, Component, Edit3, UserPlus, ArrowRight, Archive, Settings2, Trash2, Lock, Info, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const WorkspaceManagement = () => {
  const { t } = useLanguage();
  const workspaces = [
    { 
      id: '1', name: 'Production environment A', status: 'Active', 
      models: 12, created: '2023.10.15', members: ['JS', 'ML', '+3'], 
      color: 'bg-primary' 
    },
    { 
      id: '2', name: 'Testing - Beta', status: 'Idle', 
      models: 4, created: '2023.12.01', members: ['LZ'], 
      color: 'bg-secondary' 
    },
    { 
      id: '3', name: 'Archive: 2023 Geek Week', status: 'Stopped', 
      models: 0, created: '2023.05.20', members: [], 
      locked: true, color: 'bg-surface-container-highest' 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 space-y-6 max-w-2xl mx-auto pb-24"
    >
      <section className="flex justify-between items-end mt-4">
        <div>
          <h2 className="font-display text-2xl font-bold">Workspace Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage environments and collaboration.</p>
        </div>
        <button 
          onClick={() => alert('Creating a new workspace...')}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>
      </section>

      <div className="relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
         <input 
          type="text" 
          placeholder="Search workspaces..." 
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
            if(!ws.locked) alert(`Entering workspace: ${ws.name}`);
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
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">{ws.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => alert(`Editing workspace ${ws.id}`)}
                  className="p-2 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-on-surface-variant" />
                </button>
                <button 
                  onClick={() => alert(`Inviting user to workspace ${ws.id}`)}
                  className="p-2 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-on-surface-variant" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/30">
              <div className="space-y-1">
                <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest">Configured Models</span>
                <p className="font-display text-xl font-bold text-primary">{ws.models} <span className="text-[10px] font-normal text-on-surface-variant uppercase">Units</span></p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest">Created Date</span>
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
                   <span className="max-w-[140px] truncate">Automatic lock due to delay</span>
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
          <strong className="uppercase tracking-widest inline-block mb-1">Notice:</strong> Enterprise users can create unlimited workspaces. You have <span className="underline font-black">3</span> slots remaining.
        </p>
      </div>
    </motion.div>
  );
};
