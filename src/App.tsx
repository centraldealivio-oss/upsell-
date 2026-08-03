import React, { useState } from 'react';
import { UpsellPage } from './components/UpsellPage';
import { defaultUpsellConfig } from './data/initialData';
import { UpsellConfig } from './types';
import { computeDynamicCheckoutUrl } from './lib/urlUtils';

export default function App() {
  const [upsellConfig, setUpsellConfig] = useState<UpsellConfig>(defaultUpsellConfig);

  // When customer clicks "Accept Upsell"
  const handleAcceptUpsell = (customTargetUrl?: string) => {
    const computed = computeDynamicCheckoutUrl(upsellConfig);
    const targetUrl = customTargetUrl || computed.url;

    if (targetUrl && targetUrl !== '#' && targetUrl !== '#accept') {
      window.location.href = targetUrl;
    } else {
      alert("Para testar o redirecionamento, insira o link no botão ⚙️ de configurações (no canto superior direito).");
    }
  };

  // When customer clicks "Decline"
  const handleDeclineUpsell = (customDeclineUrl?: string) => {
    const computed = computeDynamicCheckoutUrl(upsellConfig);
    const declineTarget = customDeclineUrl || computed.declineUrl || upsellConfig.declineUrl;

    if (declineTarget && declineTarget !== '#' && declineTarget !== '#decline') {
      window.location.href = declineTarget;
    } else {
      alert("Para testar o redirecionamento, insira o link da sua Área de Membros Padrão nas configurações.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      <main className="flex-1">
        <UpsellPage
          config={upsellConfig}
          setConfig={setUpsellConfig}
          onAcceptUpsell={handleAcceptUpsell}
          onDeclineUpsell={handleDeclineUpsell}
        />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-6 px-4 text-center text-xs text-zinc-500">
        <p>
          Central de Alívio © {new Date().getFullYear()} • Método Antes da Explosão & Mente Inabalável.
        </p>
      </footer>
    </div>
  );
}

