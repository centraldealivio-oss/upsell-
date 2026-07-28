import React, { useState, useEffect } from 'react';
import { UpsellConfig } from '../types';
import { Check, ShieldCheck, AlertTriangle, ExternalLink, Settings2, Copy, CheckCircle, Code, X, Sparkles } from 'lucide-react';
import { CodeExporter } from './CodeExporter';

interface UpsellPageProps {
  config: UpsellConfig;
  setConfig: React.Dispatch<React.StateAction<UpsellConfig>>;
  onAcceptUpsell: () => void;
  onDeclineUpsell: () => void;
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

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAcceptClick = (e: React.MouseEvent) => {
    const isPreview = window.location.hostname.includes('ais-dev') || 
                      window.location.hostname.includes('run.app') || 
                      window.location.hostname.includes('localhost');
    
    if (isPreview) {
      e.preventDefault();
      onAcceptUpsell();
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(config.paradiseCheckoutUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative selection:bg-red-600 selection:text-white">


      {/* CONFIGURATION DRAWER */}
      {showConfigDrawer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-md p-6 overflow-y-auto space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white">Configurar Automação dos Links</h3>
              </div>
              <button
                onClick={() => setShowConfigDrawer(false)}
                className="text-zinc-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <label className="font-bold text-emerald-400 block">
                  1. Link da Área de Membros VIP (Aceitou Upsell R$ 9,90)
                </label>
                <p className="text-[11px] text-zinc-400">
                  URL para onde o cliente será direcionado após o pagamento aprovado do upsell na Paradise.
                </p>
                <input
                  type="url"
                  value={config.paradiseCheckoutUrl}
                  onChange={(e) => setConfig({ ...config, paradiseCheckoutUrl: e.target.value })}
                  placeholder="https://suaareademembros.com/vip"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-red-500 outline-none"
                />
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <label className="font-bold text-red-400 block">
                  2. Link da Área de Membros Padrão (Recusou Upsell)
                </label>
                <p className="text-[11px] text-zinc-400">
                  URL para onde o cliente vai quando clicar em "Não, obrigada. Prefiro seguir sem este complemento".
                </p>
                <input
                  type="text"
                  value={config.declineUrl}
                  onChange={(e) => setConfig({ ...config, declineUrl: e.target.value })}
                  placeholder="https://suaareademembros.com/login"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-red-500 outline-none"
                />
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <label className="font-bold text-zinc-200 block">
                  3. Preço do Upsell (R$)
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

          {/* PRODUCT IMAGE CONTAINER */}
          <div className="max-w-[460px] mx-auto mb-8 rounded-2xl overflow-hidden border border-red-600/35 shadow-2xl shadow-red-950/50 bg-zinc-900">
            <img
              src={
                config.productImage.includes('ibb.co/') && !config.productImage.includes('i.ibb.co/')
                  ? config.productImage.replace('ibb.co/', 'i.ibb.co/') + '/image.png'
                  : config.productImage
              }
              alt="Mente Inabalável - Central de Alívio"
              className="w-full h-auto object-cover select-none"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.dataset.triedJpg) {
                  target.dataset.triedJpg = 'true';
                  target.src = config.productImage.replace('ibb.co/', 'i.ibb.co/') + '/image.jpg';
                } else if (!target.dataset.triedWebp) {
                  target.dataset.triedWebp = 'true';
                  target.src = config.productImage.replace('ibb.co/', 'i.ibb.co/') + '/image.webp';
                } else if (!target.dataset.triedRaw) {
                  target.dataset.triedRaw = 'true';
                  target.src = config.productImage;
                }
              }}
            />
          </div>

          {/* CHECKLIST HIGHLIGHTS */}
          <div className="max-w-[480px] mx-auto text-left space-y-3 mb-8 text-zinc-300 text-sm">
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

          {/* MAIN CTA BUTTONS */}
          <div className="space-y-3 max-w-[540px] mx-auto">
            <button
              className="paradise-upsell-btn w-full shadow-lg shadow-emerald-900/30 hover:brightness-110 transition transform active:scale-95 flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#28a745',
                color: '#ffffff',
                padding: '16px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '17px',
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
              Sim, eu quero esta oferta!
            </button>

            <button
              onClick={onDeclineUpsell}
              className="inline-block text-zinc-500 hover:text-zinc-300 text-xs font-semibold underline decoration-zinc-700 underline-offset-4 py-2 px-4 transition cursor-pointer"
            >
              Não, obrigada. Prefiro seguir sem este complemento.
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

