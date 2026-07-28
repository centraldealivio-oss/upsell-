import React, { useState } from 'react';
import { UpsellPage } from './components/UpsellPage';
import { defaultUpsellConfig } from './data/initialData';
import { UpsellConfig } from './types';

export default function App() {
  const [upsellConfig, setUpsellConfig] = useState<UpsellConfig>(defaultUpsellConfig);

  // When customer clicks "Accept Upsell"
  const handleAcceptUpsell = () => {
    if (upsellConfig.paradiseCheckoutUrl && upsellConfig.paradiseCheckoutUrl !== '#' && upsellConfig.paradiseCheckoutUrl !== '#accept') {
      window.location.href = upsellConfig.paradiseCheckoutUrl;
    } else {
      alert("Para testar o redirecionamento, insira o link da sua Área de Membros VIP no botão ⚙️ de configurações (no canto superior direito).");
    }
  };

  // When customer clicks "Decline"
  const handleDeclineUpsell = () => {
    if (upsellConfig.declineUrl && upsellConfig.declineUrl !== '#' && upsellConfig.declineUrl !== '#decline') {
      window.location.href = upsellConfig.declineUrl;
    } else {
      alert("Para testar o redirecionamento, insira o link da sua Área de Membros Padrão no botão ⚙️ de configurações (no canto superior direito).");
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

