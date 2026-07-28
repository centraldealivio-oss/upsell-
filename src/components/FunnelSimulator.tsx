import React, { useState } from 'react';
import { UpsellConfig } from '../types';
import { ShoppingBag, ArrowRight, CheckCircle2, XCircle, Sparkles, RefreshCw, Lock, Unlock, Server } from 'lucide-react';

interface FunnelSimulatorProps {
  config: UpsellConfig;
  upsellPurchased: boolean;
  setUpsellPurchased: (val: boolean) => void;
  onNavigateToMemberArea: () => void;
  onNavigateToUpsellPage: () => void;
}

export const FunnelSimulator: React.FC<FunnelSimulatorProps> = ({
  config,
  upsellPurchased,
  setUpsellPurchased,
  onNavigateToMemberArea,
  onNavigateToUpsellPage,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [customerEmail, setCustomerEmail] = useState('cliente.exemplo@gmail.com');
  const [customerName, setCustomerName] = useState('Mariana Silva');

  const handleSimulateMainPurchase = () => {
    setCurrentStep(2);
  };

  const handleSimulateUpsellAccept = () => {
    setUpsellPurchased(true);
    setCurrentStep(3);
  };

  const handleSimulateUpsellDecline = () => {
    setUpsellPurchased(false);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setUpsellPurchased(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Title & Introduction */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-900/50 px-2.5 py-1 rounded">
                Simulador do Funil Paradise
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                Jornada Interativa do Comprador
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reiniciar Teste de Fluxo
            </button>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Teste exatamente como o seu cliente navega desde o checkout do produto principal na Paradise, passando pela página de upsell do <strong className="text-white">Mente Inabalável</strong>, até a liberação do acesso correspondente na área de membros.
          </p>

          {/* Stepper Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div
              className={`p-3.5 rounded-xl border transition ${
                currentStep === 1
                  ? 'bg-red-950/40 border-red-600/60 text-white shadow-lg'
                  : currentStep > 1
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold">Passo 1</span>
                {currentStep > 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-red-400" />
                )}
              </div>
              <p className="text-xs font-bold">Compra Produto Principal</p>
              <p className="text-[11px] text-zinc-400">Antes da Explosão (R$ 29,90)</p>
            </div>

            <div
              className={`p-3.5 rounded-xl border transition ${
                currentStep === 2
                  ? 'bg-red-950/40 border-red-600/60 text-white shadow-lg'
                  : currentStep > 2
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold">Passo 2</span>
                {currentStep > 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-xs font-bold">Página de Upsell</p>
              <p className="text-[11px] text-zinc-400">Mente Inabalável (R$ {config.price})</p>
            </div>

            <div
              className={`p-3.5 rounded-xl border transition ${
                currentStep === 3
                  ? 'bg-red-950/40 border-red-600/60 text-white shadow-lg'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold">Passo 3</span>
                {upsellPurchased ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-xs font-bold">Área de Membros</p>
              <p className="text-[11px] text-zinc-400">
                {upsellPurchased ? 'VIP Bônus + Comunidade Liberados' : 'VIP Normal'}
              </p>
            </div>
          </div>
        </div>

        {/* STEP 1: Main Product Purchase */}
        {currentStep === 1 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Simulação de Checkout Paradise — Produto Principal</h3>
                <p className="text-xs text-zinc-400">O cliente finaliza o pagamento do "Antes da Explosão"</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">Nome do Comprador</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">E-mail do Comprador</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Produto: Método Antes da Explosão (Ebook / Curso)</p>
                  <p className="text-zinc-400 text-[11px]">Plataforma: Paradise Pay • Status: Aprovado</p>
                </div>
                <span className="font-black text-emerald-400 text-sm">R$ 29,90</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSimulateMainPurchase}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Aprovar Compra e Redirecionar para o Upsell</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Upsell Decision */}
        {currentStep === 2 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">O Comprador Chegou na Página de Upsell</h3>
                  <p className="text-xs text-zinc-400">Ele visualiza a oferta do "Mente Inabalável" (R$ {config.price})</p>
                </div>
              </div>
              <button
                onClick={onNavigateToUpsellPage}
                className="text-xs text-red-400 hover:text-red-300 font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                Ver Página do Upsell Completa
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={config.productImage}
                  alt="Mente Inabalável"
                  className="w-20 h-20 rounded-lg object-cover border border-red-600/40 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded">
                    3 Bônus Exclusivos + Área de Comunidade
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">Mente Inabalável</h4>
                  <p className="text-xs text-zinc-400">
                    Protocolo de Regulação, Mapa dos Gatilhos, Guia de Reconexão e Comunidade VIP.
                  </p>
                  <p className="text-xs font-black text-red-400 mt-1">Adicional: R$ {config.price}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-zinc-300 text-center">Simule a decisão do seu cliente agora:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleSimulateUpsellAccept}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm p-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ACEITAR UPSELL (R$ {config.price})</span>
                </button>

                <button
                  onClick={handleSimulateUpsellDecline}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs sm:text-sm p-4 rounded-xl border border-zinc-700 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <XCircle className="w-5 h-5 text-zinc-400" />
                  <span>RECUSAR UPSELL (Seguir p/ VIP Normal)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Member Access Result */}
        {currentStep === 3 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-600/40 flex items-center justify-center text-emerald-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Resultado do Acesso na Área de Membros</h3>
                <p className="text-xs text-zinc-400">Webhook processado e privilégios de usuário definidos</p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${
              upsellPurchased
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
            }`}>
              <div className="flex items-start gap-3">
                {upsellPurchased ? (
                  <Unlock className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Lock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-base text-white">
                    {upsellPurchased
                      ? 'Parabéns! VIP Bônus + Comunidade LIBERADOS!'
                      : 'Acesso VIP Normal Liberado (Sem Bônus Mente Inabalável)'}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {upsellPurchased
                      ? `O cliente ${customerName} (${customerEmail}) comprou o produto principal + o Upsell. Ele tem acesso total ao Método Antes da Explosão, aos 3 Bônus Exclusivos e à Comunidade VIP.`
                      : `O cliente ${customerName} (${customerEmail}) comprou apenas o produto principal. Ele tem acesso ao Método Antes da Explosão. A aba de Bônus & Comunidade exibe um cadeado com botão para realizar o upgrade por R$ ${config.price}.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateToMemberArea}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-lg shadow-red-950 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Server className="w-4 h-4" />
                <span>Entrar na Área de Membros Agora (Visualizar Como Cliente)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
