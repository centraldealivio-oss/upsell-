import React, { useState, useEffect } from 'react';
import { UpsellConfig, BonusTokenRule } from '../types';
import { Check, ShieldCheck, AlertTriangle, ExternalLink, Settings2, Copy, CheckCircle, Code, X, Sparkles, Image, Box, Link2, Zap, HelpCircle } from 'lucide-react';
import { CodeExporter } from './CodeExporter';
import { BookMockup3D, resolveImageUrl } from './BookMockup3D';
import { computeDynamicCheckoutUrl, ComputedUrlResult } from '../lib/urlUtils';

  interface UpsellPageProps {
  config: UpsellConfig;
  setConfig: React.Dispatch<React.StateAction<UpsellConfig>>;
  onAcceptUpsell: (customTargetUrl?: string) => void;
  onDeclineUpsell: (customDeclineUrl?: string) => void;
}

export const UpsellPage: React.FC<UpsellPageProps> = ({
  config,
  setConfig,
  onAcceptUpsell,
  onDeclineUpsell,
}) => {
  const [timeLeft, setTimeLeft] = useState(config.timerMinutes * 60);
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeToast, setActiveToast] = useState<{ name: string; city: string; timeAgo: string } | null>(null);
  
  // Test simulator for query parameters (e.g., ?b1=1 or ?token=14da32acba)
  const [simulatedQuery, setSimulatedQuery] = useState<string>('');
  const [computedResult, setComputedResult] = useState<ComputedUrlResult>(() =>
    computeDynamicCheckoutUrl(config, '')
  );

  // Recalculate dynamic URL whenever config or simulated query changes
  useEffect(() => {
    const currentSearch = simulatedQuery || (typeof window !== 'undefined' ? window.location.search : '');
    setComputedResult(computeDynamicCheckoutUrl(config, currentSearch));
  }, [config, simulatedQuery]);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAcceptClick = (e: React.MouseEvent) => {
    const currentSearch = simulatedQuery || (typeof window !== 'undefined' ? window.location.search : '');
    const dynamicResult = computeDynamicCheckoutUrl(config, currentSearch);

    const isPreview = window.location.hostname.includes('ais-dev') || 
                      window.location.hostname.includes('run.app') || 
                      window.location.hostname.includes('localhost');
    
    if (isPreview) {
      e.preventDefault();
      onAcceptUpsell(dynamicResult.url);
      return;
    }

    // Se o cliente veio do checkout com params ou se temos um redirecionamento configurado
    const urlParams = new URLSearchParams(currentSearch);
    const hasFpay = urlParams.has('fpay') || urlParams.has('fpay_id') || urlParams.has('transaction_id');

    if (!hasFpay) {
      e.preventDefault();
      e.stopPropagation();
      if (dynamicResult.url && dynamicResult.url !== '#') {
        window.location.href = dynamicResult.url;
      } else {
        onAcceptUpsell(dynamicResult.url);
      }
    }
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Fake live sales notification simulation
  useEffect(() => {
    const notifications = [
      { name: 'Ana Paula S.', city: 'São Paulo - SP', timeAgo: 'há 1 minuto' },
      { name: 'Juliana M.', city: 'Belo Horizonte - MG', timeAgo: 'há 3 minutos' },
      { name: 'Roberta C.', city: 'Curitiba - PR', timeAgo: 'há 40 segundos' },
      { name: 'Carla R.', city: 'Rio de Janeiro - RJ', timeAgo: 'há 2 minutos' },
    ];

    const toastInterval = setInterval(() => {
      const randomToast = notifications[Math.floor(Math.random() * notifications.length)];
      setActiveToast(randomToast);
      setTimeout(() => setActiveToast(null), 4000);
    }, 12000);

    return () => clearInterval(toastInterval);
  }, []);

  const handleRuleChange = (index: number, field: keyof BonusTokenRule, value: string) => {
    if (!config.bonusRules) return;
    const updatedRules = [...config.bonusRules];
    updatedRules[index] = { ...updatedRules[index], [field]: value };
    setConfig({ ...config, bonusRules: updatedRules });
  };

  const handleAddRule = () => {
    const newRule: BonusTokenRule = {
      id: `rule-${Date.now()}`,
      bonusName: 'Novo Bônus / Token',
      paramKey: 'b1',
      paramValue: '1',
      checkoutUrl: config.paradiseCheckoutUrl,
      description: 'Regra de redirecionamento para parâmetro específico'
    };
    setConfig({
      ...config,
      bonusRules: [...(config.bonusRules || []), newRule]
    });
  };

  const handleRemoveRule = (index: number) => {
    if (!config.bonusRules) return;
    const updatedRules = config.bonusRules.filter((_, i) => i !== index);
    setConfig({ ...config, bonusRules: updatedRules });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative selection:bg-red-600 selection:text-white">

      {/* SECRET DEV / ADMIN TOGGLE VIA URL ?admin=1 */}
      {typeof window !== 'undefined' && window.location.search.includes('admin=1') && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
          <button
            onClick={() => setShowConfigDrawer(true)}
            className="bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur shadow-xl flex items-center gap-2 transition cursor-pointer"
            title="Configurar Automação de Links e Bônus"
          >
            <Settings2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Automação de Bônus & Links</span>
          </button>
        </div>
      )}

      {/* CONFIGURATION DRAWER */}
      {showConfigDrawer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-lg p-6 overflow-y-auto space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Automação de Bônus & Checkout</h3>
                  <p className="text-[11px] text-zinc-400">Redirecione o cliente conforme os bônus comprados</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigDrawer(false)}
                className="text-zinc-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs text-zinc-300">

              {/* SIMULATOR QUICK TEST */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                    <Zap className="w-4 h-4" />
                    Simular Entrada de Cliente por Bônus/Token
                  </span>
                  <span className="text-[10px] text-emerald-300/80">Teste em Tempo Real</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-normal">
                  Selecione um cenário abaixo para ver o botão verde mudar de destino automaticamente conforme o que o cliente comprou:
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setSimulatedQuery('?combo=true')}
                    className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] transition ${
                      simulatedQuery === '?combo=true'
                        ? 'border-emerald-400 bg-emerald-900/50 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    📦 Combo 3 Bônus (Default)
                  </button>

                  <button
                    type="button"
                    onClick={() => setSimulatedQuery('?b1=1')}
                    className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] transition ${
                      simulatedQuery === '?b1=1'
                        ? 'border-emerald-400 bg-emerald-900/50 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    🎵 Cliente comprou Bônus 1
                  </button>

                  <button
                    type="button"
                    onClick={() => setSimulatedQuery('?b2=1')}
                    className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] transition ${
                      simulatedQuery === '?b2=1'
                        ? 'border-emerald-400 bg-emerald-900/50 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    📄 Cliente comprou Bônus 2
                  </button>

                  <button
                    type="button"
                    onClick={() => setSimulatedQuery('?b3=1')}
                    className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] transition ${
                      simulatedQuery === '?b3=1'
                        ? 'border-emerald-400 bg-emerald-900/50 text-white font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    📋 Cliente comprou Bônus 3
                  </button>
                </div>

                {/* CURRENT RESOLVED LINK DISPLAY */}
                <div className="mt-2 p-2 bg-black/60 rounded-lg border border-emerald-500/20 text-[10px] space-y-1 font-mono">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Regra Ativa:</span>
                    <span className="text-emerald-400 font-bold">
                      {computedResult.matchedRuleName || 'Checkout Padrão (Combo)'}
                    </span>
                  </div>
                  <div className="text-zinc-300 truncate">
                    <span>Target URL: </span>
                    <span className="text-emerald-300 font-semibold">{computedResult.url}</span>
                  </div>
                </div>
              </div>

              {/* DEFAULT MAIN COMBO LINK */}
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <label className="font-bold text-emerald-400 block">
                  1. Link Padrão / Combo Completo (Todos os 3 Bônus)
                </label>
                <p className="text-[11px] text-zinc-400">
                  Link do botão verde quando o cliente tiver interesse nos 3 bônus de uma vez ou não tiver parâmetros de bônus na URL.
                </p>
                <input
                  type="url"
                  value={config.paradiseCheckoutUrl}
                  onChange={(e) => setConfig({ ...config, paradiseCheckoutUrl: e.target.value })}
                  placeholder="https://compraonlineseguura.com/c/e39ff0881a"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              {/* BONUS SPECIFIC REDIRECT RULES */}
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-amber-400 block">
                      2. Mapeamento de Links por Bônus / Token
                    </label>
                    <p className="text-[11px] text-zinc-400">
                      Configure qual link do produto abrir quando o cliente comprar um bônus específico na etapa anterior.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddRule}
                    className="bg-zinc-800 hover:bg-zinc-700 text-amber-300 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 cursor-pointer"
                  >
                    + Nova Regra
                  </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {(config.bonusRules || []).map((rule, idx) => (
                    <div key={rule.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 space-y-2 relative group">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={rule.bonusName}
                          onChange={(e) => handleRuleChange(idx, 'bonusName', e.target.value)}
                          className="bg-transparent font-bold text-amber-200 text-xs focus:outline-none border-b border-dashed border-zinc-700 focus:border-amber-400"
                          placeholder="Nome da Regra/Bônus"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveRule(idx)}
                          className="text-zinc-500 hover:text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded"
                        >
                          Remover
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-zinc-400 block text-[10px]">Parâmetro da URL:</span>
                          <input
                            type="text"
                            value={rule.paramKey}
                            onChange={(e) => handleRuleChange(idx, 'paramKey', e.target.value)}
                            placeholder="ex: b1, ob, token"
                            className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200 font-mono text-[11px]"
                          />
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px]">Valor Esperado:</span>
                          <input
                            type="text"
                            value={rule.paramValue}
                            onChange={(e) => handleRuleChange(idx, 'paramValue', e.target.value)}
                            placeholder="ex: 1, bonus1"
                            className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-zinc-200 font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-zinc-400 block text-[10px]">Link do Checkout do Produto para este Bônus:</span>
                        <input
                          type="text"
                          value={rule.checkoutUrl}
                          onChange={(e) => handleRuleChange(idx, 'checkoutUrl', e.target.value)}
                          placeholder="https://compraonlineseguura.com/c/SEUTOKEN"
                          className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-emerald-400 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DECLINE LINK */}
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <label className="font-bold text-red-400 block">
                  3. Link da Área de Membros Padrão (Recusou Upsell)
                </label>
                <input
                  type="text"
                  value={config.declineUrl}
                  onChange={(e) => setConfig({ ...config, declineUrl: e.target.value })}
                  placeholder="https://area.centraldealivio.com.br/?token=..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-red-500 outline-none"
                />
              </div>

              {/* PRODUCT MOCKUP TYPE & PRICE */}
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <label className="font-bold text-zinc-200 block">
                  4. Preço do Upsell (R$)
                </label>
                <input
                  type="text"
                  value={config.price}
                  onChange={(e) => setConfig({ ...config, price: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-red-500 outline-none"
                />
              </div>

              <button
                onClick={() => {
                  setShowConfigDrawer(false);
                  setShowExportModal(true);
                }}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Code className="w-4 h-4" />
                <span>Gerar e Copiar Código HTML Atualizado</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT CODE MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl p-2">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-red-600 text-white p-2 rounded-full border border-white/20 transition z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <CodeExporter config={config} />
          </div>
        </div>
      )}

      {/* Timer Urgency Bar */}
      <div className="bg-red-950/80 border-b border-red-900/60 py-2.5 px-4 text-center text-xs sm:text-sm font-semibold text-red-200 flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
        <span>ATENÇÃO: Esta oferta especial expira em</span>
        <span className="bg-red-600 text-white font-mono font-bold px-2 py-0.5 rounded text-sm tracking-wider shadow">
          {formattedTime}
        </span>
        <span className="hidden sm:inline">| Não feche nem atualize esta página.</span>
      </div>

      {/* ACTIVE RULE AUTOMATION BADGE (ONLY VISIBLE IF ?admin=1 FOR TESTING) */}
      {computedResult.isCustomParamActive && typeof window !== 'undefined' && window.location.search.includes('admin=1') && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/40 py-2 px-4 text-center text-xs font-semibold text-emerald-200 flex items-center justify-center gap-2 animate-fade-in">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Automação Ativa:</span>
          <span className="bg-emerald-800/80 text-emerald-100 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
            {computedResult.matchedRuleName || `Token ${computedResult.tokenDetected}`}
          </span>
          <span className="text-zinc-400 hidden md:inline">→ Direciona para: {computedResult.url}</span>
        </div>
      )}

      {/* MAIN UPSELL CONTENT */}
      <div className="max-w-[860px] mx-auto px-4 py-10 sm:py-16">
        
        {/* HERO SECTION */}
        <div className="text-center pb-12 border-b border-zinc-800/80">
          <div className="inline-block bg-red-950/40 border border-red-600/40 text-red-400 text-[11px] font-extrabold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
            A ETAPA FINAL DA SUA JORNADA
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6 tracking-tight max-w-3xl mx-auto">
            {config.headline}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {config.subheadline}
          </p>

          {/* PRODUCT IMAGE DISPLAY */}
          <div className="mb-8">
            <BookMockup3D imageUrl={config.productImage} />
          </div>

          {/* CHECKLIST HIGHLIGHTS */}
          <div className="max-w-[500px] mx-auto text-left space-y-3 mb-8 text-zinc-300 text-sm">
            <div className="flex items-start gap-2.5">
              <span className="text-red-500 font-extrabold text-base flex-shrink-0">✓</span>
              <span>
                <strong>Complemento oficial</strong> do Método Antes da Explosão, feito para fechar sua jornada com segurança.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-red-500 font-extrabold text-base flex-shrink-0">✓</span>
              <span>
                <strong>Sem novo cadastro</strong> — liberado junto ao material que você já garantiu na Paradise.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-red-500 font-extrabold text-base flex-shrink-0">✓</span>
              <span>
                <strong>Acesso imediato</strong>, pensado para você se sentir amparada em cada etapa.
              </span>
            </div>
          </div>

          {/* PRICE CALLOUT BADGE */}
          <div className="mb-6 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-zinc-950 via-emerald-950/60 to-zinc-950 border border-emerald-500/50 px-6 py-3 rounded-2xl shadow-xl">
            <span className="text-zinc-300 text-xs sm:text-sm font-medium">De <span className="line-through text-zinc-500">R$ 97,00</span> por apenas:</span>
            <span className="text-emerald-400 font-black text-xl sm:text-2xl tracking-tight">R$ {config.price}</span>
          </div>

          {/* MAIN CTA BUTTONS */}
          <div className="space-y-4 max-w-[560px] mx-auto">
            <button
              className="paradise-upsell-btn w-full shadow-xl shadow-emerald-900/30 hover:brightness-110 transition transform active:scale-95 flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#28a745',
                color: '#ffffff',
                padding: '18px 24px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
              data-offer-hash="upsell_bef5645643e1bfd7"
              data-modal-title="Finalize com PIX para garantir seu bonus Exclusivo!"
              data-copy-button-text="Copiar Código PIX"
              data-modal-bg="#ffffff"
              data-modal-title-color="#000000"
              data-modal-btn-color="#000000"
              data-modal-btn-text-color="#ffffff"
              onClick={handleAcceptClick}
            >
              Sim, eu quero esta oferta por apenas R$ {config.price}!
            </button>

            <button
              onClick={() => onDeclineUpsell(computedResult.declineUrl)}
              className="w-full text-zinc-300 hover:text-white text-sm sm:text-base font-semibold underline underline-offset-4 mt-3 py-3 px-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/80 transition cursor-pointer shadow-md"
            >
              Já adquiri meu produto, quero continuar
            </button>
          </div>
        </div>

      </div>

      {/* Live Sales Notification Toast */}
      {activeToast && (
        <div className="fixed bottom-4 left-4 z-50 bg-zinc-900/95 border border-red-600/40 text-white p-3.5 rounded-xl shadow-2xl backdrop-blur flex items-center gap-3 animate-slide-up max-w-xs">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold flex items-center justify-center text-xs">
            ✓
          </div>
          <div className="text-xs">
            <p className="font-bold text-white">{activeToast.name}</p>
            <p className="text-zinc-400 text-[11px]">
              {activeToast.city} adiciou Mente Inabalável <span className="text-red-400 font-medium">({activeToast.timeAgo})</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

