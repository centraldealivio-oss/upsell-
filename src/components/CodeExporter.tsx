import React, { useState } from 'react';
import { UpsellConfig } from '../types';
import { Code, Copy, Check, ExternalLink, Sparkles, FileCode2 } from 'lucide-react';

interface CodeExporterProps {
  config: UpsellConfig;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'standalone' | 'wordpress'>('standalone');

  const rawHtmlCode = `<!-- SCRIPT PARADISE ONE-CLICK UPSELL -->
<script src="https://multi.paradisepags.com/assets/js/one-click.js?v=1785262002" defer></script>

<!-- LANDING PAGE DE UPSELL - MENTE INABALÁVEL (CENTRAL DE ALÍVIO) -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,600;0,800;1,400&family=Playfair+Display:ital,wght@1,600;1,800&display=swap');

  .lp-container {
    background-color: #050505;
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
  }
  .lp-serif { font-family: 'Playfair Display', serif; }
  .lp-section { padding: 60px 20px; max-width: 900px; margin: 0 auto; }
  .lp-badge {
    color: #ef4444;
    background: rgba(153, 27, 27, 0.3);
    border: 1px solid rgba(220, 38, 38, 0.4);
    padding: 6px 16px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.2em;
    display: inline-block;
    margin-bottom: 16px;
  }
  .lp-btn {
    display: inline-block;
    background-color: #dc2626;
    color: #ffffff !important;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 18px 32px;
    border-radius: 4px;
    text-decoration: none !important;
    box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
    transition: all 0.3s ease;
    margin-top: 20px;
    font-size: 15px;
    cursor: pointer;
  }
  .lp-btn:hover { background-color: #b91c1c; transform: scale(1.03); }
  .lp-btn-ghost {
    display: inline-block;
    background: transparent;
    color: #71717a !important;
    font-weight: 600;
    text-decoration: underline !important;
    padding: 12px 20px;
    font-size: 13px;
    margin-top: 12px;
  }
  .lp-card {
    background-color: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 28px;
    margin-bottom: 20px;
  }
  .lp-img { max-width: 100%; height: auto; border-radius: 10px; display: block; margin: 0 auto; }
  .lp-checkline {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    text-align: left;
    color: #d4d4d8;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .lp-checkline span.lp-check { color: #ef4444; font-weight: 800; flex-shrink: 0; }
</style>

<div class="lp-container">

  <!-- HERO SECTION - UPSELL -->
  <section class="lp-section" style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <span class="lp-badge">A ETAPA FINAL DA SUA JORNADA</span>
    <h1 style="font-size: 32px; font-weight: 800; margin-bottom: 20px; line-height: 1.2;">
      ${config.headline}
    </h1>
    <p style="color: #a1a1aa; font-size: 16px; max-width: 700px; margin: 0 auto 30px auto;">
      ${config.subheadline}
    </p>

    <!-- IMAGEM DE DESTAQUE -->
    <div style="max-width: 480px; margin: 0 auto 30px auto; border-radius: 16px; overflow: hidden; border: 1px solid rgba(220,38,38,0.5); box-shadow: 0 0 50px rgba(220,38,38,0.3); background: #0a0a0a;">
      <img src="${config.productImage.includes('ibb.co/') && !config.productImage.includes('i.ibb.co/') ? config.productImage.replace('ibb.co/', 'i.ibb.co/') + '/image.png' : config.productImage}" alt="Mente Inabalável" class="lp-img" referrerpolicy="no-referrer" style="width: 100%; height: auto; display: block; image-rendering: -webkit-optimize-contrast; filter: contrast(1.08) brightness(1.04) saturate(1.12);">
    </div>

    <div style="text-align: left; max-width: 480px; margin: 0 auto 30px auto;">
      <div class="lp-checkline"><span class="lp-check">✓</span> Complemento oficial do Método Antes da Explosão, feito para fechar sua jornada com segurança</div>
      <div class="lp-checkline"><span class="lp-check">✓</span> Sem novo cadastro — liberado junto ao material que você já garantiu na Paradise</div>
      <div class="lp-checkline"><span class="lp-check">✓</span> Acesso imediato, pensado para você se sentir amparada em cada etapa</div>
    </div>

    <div>
      <button class="paradise-upsell-btn" onclick="window.location.href='${config.paradiseCheckoutUrl}'" style="background-color: #28a745; color: #ffffff; padding: 16px 28px; border: none; border-radius: 8px; font-size: 17px; font-weight: bold; cursor: pointer; width: 100%; max-width: 480px; box-shadow: 0 10px 25px rgba(40,167,69,0.3);" data-offer-hash="upsell_bef5645643e1bfd7" data-modal-title="Finalize com PIX para garantir seu bonus Exclusivo!" data-copy-button-text="Copiar Código PIX" data-modal-bg="#ffffff" data-modal-title-color="#000000" data-modal-btn-color="#000000" data-modal-btn-text-color="#ffffff">Sim, eu quero esta oferta!</button>
      <br>
      <a href="${config.declineUrl}" class="lp-btn-ghost">Não, obrigada. Prefiro seguir sem este complemento.</a>
    </div>
  </section>



</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-900/60 px-2.5 py-1 rounded">
                Exportação Direta
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                Código HTML Pronto para Copiar e Usar
              </h2>
            </div>

            <button
              onClick={handleCopy}
              className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-lg shadow-red-950 transition flex items-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>CÓDIGO COPIADO COM SUCESSO!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPIAR CÓDIGO HTML COMPLETO</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Este código é 100% autônomo e estilizado. Você pode colar diretamente em blocos de <strong className="text-zinc-200">HTML / Elementor Widget / WordPress / Hotmart / Kiwify / Paradise</strong> para publicar sua página de upsell sem precisar de bibliotecas externas.
          </p>

          <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 text-xs space-y-2 text-zinc-300">
            <p className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              Parâmetros Atuais Configurados no Código:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-400 font-mono text-[11px] pt-1">
              <div>• Link Checkout Paradise: <span className="text-red-400">{config.paradiseCheckoutUrl}</span></div>
              <div>• Valor do Upsell: <span className="text-emerald-400">R$ {config.price}</span></div>
              <div>• Produto de Destino: <span className="text-zinc-200">Mente Inabalável</span></div>
              <div>• Origem: <span className="text-zinc-200">Central de Alívio (Antes da Explosão)</span></div>
            </div>
          </div>

          {/* CODE EDITOR PREVIEW CONTAINER */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-2 text-zinc-300 font-semibold">
                <FileCode2 className="w-4 h-4 text-red-400" />
                upsell-mente-inabalavel.html
              </span>
              <span>{rawHtmlCode.length} caracteres</span>
            </div>

            <pre className="p-4 overflow-x-auto text-xs text-zinc-300 font-mono leading-relaxed max-h-[480px] selection:bg-red-900 selection:text-white">
              {rawHtmlCode}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
