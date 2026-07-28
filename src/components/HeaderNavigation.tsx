import React from 'react';
import { Sparkles, PlayCircle, GraduationCap, Code, Server, CheckCircle2 } from 'lucide-react';

export type ViewTab = 'upsell-page' | 'simulator' | 'member-area' | 'export-code' | 'paradise-guide';

interface HeaderNavigationProps {
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  upsellPurchased: boolean;
  setUpsellPurchased: (val: boolean) => void;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentTab,
  setCurrentTab,
  upsellPurchased,
  setUpsellPurchased,
}) => {
  const tabs = [
    {
      id: 'upsell-page' as ViewTab,
      label: 'Página de Upsell',
      icon: Sparkles,
      tag: 'Visual'
    },
    {
      id: 'simulator' as ViewTab,
      label: 'Simulador do Funil',
      icon: PlayCircle,
      tag: 'Teste'
    },
    {
      id: 'member-area' as ViewTab,
      label: 'Área de Membros',
      icon: GraduationCap,
      badge: upsellPurchased ? 'VIP Bônus Ativo' : 'VIP Normal'
    },
    {
      id: 'export-code' as ViewTab,
      label: 'Exportar HTML',
      icon: Code,
      tag: 'Código'
    },
    {
      id: 'paradise-guide' as ViewTab,
      label: 'Integração Paradise',
      icon: Server,
      tag: 'Webhook'
    },
  ];

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 text-white sticky top-0 z-50 shadow-2xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-zinc-950 px-4 py-2 text-xs font-semibold text-zinc-200 flex flex-wrap items-center justify-between border-b border-red-900/40">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>Central de Alívio • Estrutura de Upsell "Mente Inabalável"</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-300">
          <span className="text-zinc-400">Status da Compra Atual:</span>
          <button
            onClick={() => setUpsellPurchased(!upsellPurchased)}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
              upsellPurchased
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            {upsellPurchased ? 'Comprou Upsell (VIP Bônus + Comunidade Liberados)' : 'Somente Produto Principal (VIP Normal)'}
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-extrabold text-xl shadow-lg shadow-red-950">
            M
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              Mente Inabalável
              <span className="text-[10px] font-bold uppercase tracking-widest bg-red-600/30 text-red-400 border border-red-600/50 px-2 py-0.5 rounded">
                Upsell Paradise
              </span>
            </h1>
            <p className="text-xs text-zinc-400">
              Produto Principal: <strong className="text-zinc-200 font-medium">Antes da Explosão</strong>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800/80 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-950 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      upsellPurchased && tab.id === 'member-area'
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
