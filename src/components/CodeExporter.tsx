import React, { useState } from 'react';
import { UpsellConfig } from '../types';
import { Code, Copy, Check, ExternalLink, Sparkles, FileCode2 } from 'lucide-react';

interface CodeExporterProps {
  config: UpsellConfig;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'standalone' | 'wordpress'>('standalone');

  const rulesJson = JSON.stringify(config.bonusRules || []);

  const rawHtmlCode = `<!-- SCRIPT PARADISE ONE-CLICK UPSELL -->
<script src="https://multi.paradisepags.com/assets/js/one-click.js?v=1785262002" defer></script>

<!-- AUTOMAÇÃO DE REDIRECIONAMENTO DINÂMICO POR BÔNUS / TOKEN -->
<script>
  (function() {
    var defaultUrl = "${config.paradiseCheckoutUrl}";
    var rules = ${rulesJson};
    var declineBase = "${config.declineUrl}";

    function getTargetUrl() {
      var searchStr = window.location.search;
      if (!searchStr) return defaultUrl;

      var params = new URLSearchParams(searchStr);
      var target = defaultUrl;

      // 1. Mapeamento por Regras de Bônus / Order Bumps
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        if (!r.paramKey) continue;
        var val = params.get(r.paramKey);
        if (val !== null && (val === r.paramValue || r.paramValue === '*' || (r.paramValue === '1' && (val === 'true' || val === '1')))) {
          if (r.checkoutUrl) {
            target = r.checkoutUrl;
            break;
          }
        }
      }

      // 2. Token direto na URL (ex: ?token=SEUTOKEN ou ?checkout=...)
      var directToken = params.get('token') || params.get('token_id') || params.get('checkout') || params.get('c');
      if (directToken) {
        if (directToken.indexOf('http') === 0) {
          target = directToken;
        } else if (directToken.length >= 5) {
          if (target.indexOf('/c/') !== -1) {
            target = target.replace(/\\/c\\/[a-zA-Z0-9]+/, '/c/' + directToken);
          } else {
            target = 'https://compraonlineseguura.com/c/' + directToken;
          }
        }
      }

      // 3. Repassar parâmetros de rastreamento (UTMs, fpay_id, transaction_id)
      try {
        var urlObj = new URL(target);
        params.forEach(function(value, key) {
          if (!urlObj.searchParams.has(key)) {
            urlObj.searchParams.set(key, value);
          }
        });
        target = urlObj.toString();
      } catch (e) {
        target += (target.indexOf('?') !== -1 ? '&' : '?') + searchStr.replace(/^\\?/, '');
      }

      return target;
    }

    document.addEventListener("DOMContentLoaded", function() {
      var activeTargetUrl = getTargetUrl();
      var buyBtn = document.querySelector(".paradise-upsell-btn");
      if (buyBtn) {
        buyBtn.onclick = function(e) {
          var hasFpay = window.location.search.indexOf("fpay") !== -1 || window.location.search.indexOf("transaction_id") !== -1;
          if (!hasFpay) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = activeTargetUrl;
          }
        };
      }

      var declineLink = document.querySelector(".lp-btn-ghost");
      if (declineLink && window.location.search) {
        var declTarget = declineBase;
        try {
          var declObj = new URL(declTarget);
          var p = new URLSearchParams(window.location.search);
          p.forEach(function(v, k) {
            if (!declObj.searchParams.has(k)) declObj.searchParams.set(k, v);
          });
          declTarget = declObj.toString();
        } catch(err) {
          declTarget += (declTarget.indexOf('?') !== -1 ? '&' : '?') + window.location.search.replace(/^\\?/, '');
        }
        declineLink.href = declTarget;
      }
    });
  })();
</script>

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
    display: block;
    background: rgba(24, 24, 27, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    color: #d4d4d8 !important;
    font-weight: 600;
    text-decoration: underline !important;
    padding: 14px 20px;
    font-size: 15px;
    margin: 16px auto 0 auto;
    max-width: 540px;
    transition: all 0.2s ease;
  }
  .lp-btn-ghost:hover {
    background: rgba(39, 39, 42, 0.8);
    color: #ffffff !important;
  }
  .lp-price-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #09090b 0%, #064e3b 100%);
    border: 1px solid rgba(16, 185, 129, 0.5);
    padding: 10px 20px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
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

    <!-- MOCKUP DOS LIVROS REAIS DE ALTA DEFINIÇÃO -->
    <div style="max-width: 800px; margin: 0 auto 30px auto;">
      <img src="${config.productImage.includes('ibb.co/LDymbnzd') ? 'https://i.ibb.co/MyHrWMDk/Chat-GPT-Image-2-de-ago-de-2026-19-25-09.png' : config.productImage.includes('ibb.co/Q3vt1Xjv') ? 'https://i.ibb.co/cShV7xXh/Captura-de-tela-2026-07-28-163516.png' : config.productImage}" alt="Mente Inabalável - 3 Livros" class="lp-img" referrerpolicy="no-referrer" style="width: 100%; height: auto; display: block; object-fit: contain; margin: 0 auto;">
    </div>

    <div style="text-align: left; max-width: 500px; margin: 0 auto 24px auto;">
      <div class="lp-checkline"><span class="lp-check">✓</span> Complemento oficial do Método Antes da Explosão, feito para fechar sua jornada com segurança</div>
      <div class="lp-checkline"><span class="lp-check">✓</span> Sem novo cadastro — liberado junto ao material que você já garantiu na Paradise</div>
      <div class="lp-checkline"><span class="lp-check">✓</span> Acesso imediato, pensado para você se sentir amparada em cada etapa</div>
    </div>

    <!-- DESTAQUE DE PREÇO -->
    <div class="lp-price-tag">
      <span style="color: #d4d4d8; font-size: 14px; font-weight: 500;">De <span style="text-decoration: line-through; color: #71717a;">R$ 97,00</span> por apenas:</span>
      <span style="color: #34d399; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">R$ ${config.price}</span>
    </div>

    <div>
      <button class="paradise-upsell-btn" style="background-color: #28a745; color: #ffffff; padding: 18px 28px; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; width: 100%; max-width: 540px; box-shadow: 0 10px 25px rgba(40,167,69,0.3);" data-offer-hash="upsell_bef5645643e1bfd7" data-modal-title="Finalize com PIX para garantir seu bonus Exclusivo!" data-copy-button-text="Copiar Código PIX" data-modal-bg="#ffffff" data-modal-title-color="#000000" data-modal-btn-color="#000000" data-modal-btn-text-color="#ffffff">Sim, eu quero esta oferta por apenas R$ ${config.price}!</button>
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
