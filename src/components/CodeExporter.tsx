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

    <!-- MOCKUP 3D DE ALTA DEFINIÇÃO SEM BORRADO -->
    ${config.useVectorMockup !== false ? `
    <div style="max-width: 580px; margin: 0 auto 30px auto; padding: 10px; position: relative;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; perspective: 1000px;">
        <!-- Livro 1 - Verde -->
        <div style="width: 150px; height: 260px; background: linear-gradient(135deg, #18181b 0%, #000 100%); border: 1px solid rgba(16,185,129,0.4); border-radius: 4px; padding: 12px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; transform: rotateY(-15deg); box-shadow: -10px 15px 30px rgba(0,0,0,0.8);">
          <span style="background: rgba(6,78,59,0.8); border: 1px solid rgba(16,185,129,0.5); color: #34d399; font-size: 8px; font-weight: 800; padding: 2px 6px; border-radius: 3px; letter-spacing: 1px;">BÔNUS 1</span>
          <div>
            <div style="font-size: 24px; color: #34d399; margin-bottom: 8px;">🛡️</div>
            <div style="color: #fde68a; font-size: 11px; font-weight: 900; letter-spacing: 1px; font-family: serif; line-height: 1.2;">BLINDAGEM<br>DO VÍNCULO</div>
            <div style="height: 1px; background: rgba(16,185,129,0.5); width: 30px; margin: 6px auto;"></div>
            <div style="color: #a1a1aa; font-size: 7px; text-transform: uppercase;">Fortaleça o que te sustenta</div>
          </div>
          <div style="border-top: 1px solid rgba(16,185,129,0.2); pt: 4px; font-size: 7px; color: #fde68a; font-family: serif;">ISABELLA XAVIER</div>
        </div>

        <!-- Livro 2 - Roxo (Destaque Centro) -->
        <div style="width: 170px; height: 290px; background: linear-gradient(135deg, #18181b 0%, #2e1065 50%, #000 100%); border: 1px solid rgba(192,132,252,0.5); border-radius: 4px; padding: 14px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; z-index: 2; box-shadow: 0 20px 40px rgba(0,0,0,0.9), 0 0 20px rgba(168,85,247,0.3);">
          <span style="background: rgba(88,28,135,0.8); border: 1px solid rgba(192,132,252,0.6); color: #e9d5ff; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 3px; letter-spacing: 1px;">E-BOOK PRINCIPAL</span>
          <div>
            <div style="font-size: 28px; color: #d8b4fe; margin-bottom: 8px;">👁️</div>
            <div style="color: #fef08a; font-size: 13px; font-weight: 900; letter-spacing: 1.5px; font-family: serif; line-height: 1.2;">RAIO-X DO<br>GATILHO</div>
            <div style="height: 1px; background: rgba(253,224,71,0.6); width: 40px; margin: 8px auto;"></div>
            <div style="color: #e4e4e7; font-size: 8px; text-transform: uppercase;">Identifique o que desencadeia</div>
          </div>
          <div style="border-top: 1px solid rgba(192,132,252,0.3); pt: 6px; font-size: 8px; color: #fde68a; font-weight: bold; font-family: serif;">ISABELLA XAVIER</div>
        </div>

        <!-- Livro 3 - Vermelho -->
        <div style="width: 150px; height: 260px; background: linear-gradient(135deg, #18181b 0%, #000 100%); border: 1px solid rgba(239,68,68,0.4); border-radius: 4px; padding: 12px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; transform: rotateY(15deg); box-shadow: 10px 15px 30px rgba(0,0,0,0.8);">
          <span style="background: rgba(127,29,29,0.8); border: 1px solid rgba(239,68,68,0.5); color: #fca5a5; font-size: 8px; font-weight: 800; padding: 2px 6px; border-radius: 3px; letter-spacing: 1px;">BÔNUS 2</span>
          <div>
            <div style="font-size: 24px; color: #fca5a5; margin-bottom: 8px;">❤️</div>
            <div style="color: #fde68a; font-size: 11px; font-weight: 900; letter-spacing: 1px; font-family: serif; line-height: 1.2;">PROTOCOLO<br>100 BPM</div>
            <div style="height: 1px; background: rgba(239,68,68,0.5); width: 30px; margin: 6px auto;"></div>
            <div style="color: #a1a1aa; font-size: 7px; text-transform: uppercase;">Acalme o coração</div>
          </div>
          <div style="border-top: 1px solid rgba(239,68,68,0.2); pt: 4px; font-size: 7px; color: #fde68a; font-family: serif;">ISABELLA XAVIER</div>
        </div>
      </div>
    </div>` : `
    <div style="max-width: 480px; margin: 0 auto 30px auto; border-radius: 16px; overflow: hidden; border: 1px solid rgba(220,38,38,0.4); box-shadow: 0 10px 30px rgba(0,0,0,0.5); background: #09090b; padding: 4px;">
      <img src="${config.productImage.includes('ibb.co/') && !config.productImage.includes('i.ibb.co/') ? config.productImage.replace('ibb.co/', 'i.ibb.co/') + '/image.png' : config.productImage}" alt="Mente Inabalável" class="lp-img" referrerpolicy="no-referrer" style="width: 100%; height: auto; display: block; border-radius: 12px; object-fit: contain;">
    </div>`}

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
