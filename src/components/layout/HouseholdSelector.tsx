'use client';

import { useState } from 'react';
import { useHouseholds } from '@/hooks/useHouseholds';
import { ChevronDown, Home, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HouseholdSelector() {
  const { households, activeHousehold, switchActiveHousehold, isLoading } = useHouseholds();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading && !activeHousehold) {
    return (
      <div className="px-5 py-3 animate-pulse">
        <div className="h-8 bg-white/5 rounded-lg w-full" />
      </div>
    );
  }

  // Si solo hay uno y es FREE, no mostramos el selector desplegable
  if (households.length <= 1) {
    return (
      <div className="px-3 py-3">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-200">
          <Home size={14} className="text-emerald-400" />
          <span className="text-[12.5px] font-medium truncate">{activeHousehold?.name || 'Mi Hogar'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-3 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-200 transition-colors group"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Home size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-[12.5px] font-medium truncate">{activeHousehold?.name}</span>
        </div>
        <ChevronDown size={14} className={cn("text-gray-500 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute left-3 right-3 mt-1.5 py-1.5 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <p className="px-3.5 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Tus Hogares
            </p>
            <div className="max-h-[200px] overflow-y-auto">
              {households.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    if (h.id !== activeHousehold?.id) switchActiveHousehold(h.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] transition-colors",
                    h.id === activeHousehold?.id 
                      ? "text-emerald-400 bg-emerald-500/5 font-medium" 
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  )}
                >
                  <Home size={13} className={cn(h.id === activeHousehold?.id ? "opacity-100" : "opacity-40")} />
                  <span className="truncate flex-1 text-left">{h.name}</span>
                  {h.id === activeHousehold?.id && (
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-1.5 pt-1.5 border-t border-white/5">
              <button 
                onClick={() => {
                  window.location.href = '/hogar';
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Plus size={13} />
                <span>Gestionar hogares</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
