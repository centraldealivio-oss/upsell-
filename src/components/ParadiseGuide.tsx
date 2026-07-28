import React, { useState } from 'react';
import { UpsellConfig } from '../types';
import { Server, CheckCircle2, ArrowRight, Copy, Check, Terminal, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';

interface ParadiseGuideProps {
  config: UpsellConfig;
  setUpsellPurchased: (val: boolean) => void;
  onNavigateToMemberArea: () => void;
}

export const ParadiseGuide: React.FC<ParadiseGuideProps> = ({
  config,
  setUpsellPurchased,
  onNavigateToMemberArea,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWebhookUrl, setCopiedWebhookUrl] = useState(false);
  const [testPayloadType, setTestPayloadType] = useState<'main' | 'upsell'>('upsell');
  const [webhookLog, setWebhookLog] = useState<string | null>(null);

  const sampleWebhookPayload = testPayloadType === 'upsell' ? {
    event: 'transaction.approved',
    platform: 'Paradise Pay',
    transaction_id: 'PRD-98472183',
    customer: {
      name: 'Mariana Silva',
      email: 'mariana.silva@gmail.com',
      cpf: '123.456.789-00'
    },
    products: [
      {
        id: 'prod_principal_01',
        name: 'Método Antes da Explosão',
        price: 29.90
      },
      {
        id: 'prod_upsell_02',
        name: 'Mente Inabalável (3 Bônus + Comunidade VIP)',
        price: 9.90
      }
    ],
    status: 'PAID',
    member_access_level: 'VIP_BONUS_COMMUNITY'
  } : {
    event: 'transaction.approved',
    platform: 'Paradise Pay',
    transaction_id: 'PRD-98472182',
    customer: {
      name: 'Mariana Silva',
      email: 'mariana.silva@gmail.com',
      cpf: '123.456.789-00'
    },
    products: [
      {
        id: 'prod_principal_01',
        name: 'Método Antes da Explosão',
        price: 29.90
      }
    ],
    status: 'PAID',
    member_access_level: 'VIP_NORMAL'
  };

  const handleSimulateWebhook = () => {
    if (testPayloadType === 'upsell') {
      setUpsellPurchased(true);
      setWebhookLog('✅ [Paradise Webhook Recebido] Transação PRD-98472183 aprovada. Produto Upsell identificado. Nível do aluno atualizado para VIP_BONUS_COMMUNITY.');
    } else {
      setUpsellPurchased(false);
      setWebhookLog('✅ [Paradise Webhook Recebido] Transação PRD-98472182 aprovada. Produto Principal apenas. Nível do aluno mantido em VIP_NORMAL.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-black text-xl shadow-lg shadow-red-950">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-900/60 px-2.5 py-1 rounded">
                Guia de Configuração Paradise Pay
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Como Integrar o Upsell e a Área de Membros na Paradise
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
            Siga os 3 passos simples abaixo para configurar a sua conta na plataforma Paradise de forma perfeita, ligando a venda do produto principal <strong className="text-white">Antes da Explosão</strong> ao upsell <strong className="text-white">Mente Inabalável</strong>.
          </p>
        </div>

        {/* STEP 1: Product Setup */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow">
              1
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Cadastrar os 2 Produtos no Painel da Paradise
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white">Produto 01 (Principal)</span>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">ID: prod_principal</span>
              </div>
              <p className="text-sm font-black text-white">Método Antes da Explosão</p>
              <p className="text-xs text-zinc-400">Preço sugerido: R$ 29,90</p>
              <div className="bg-zinc-900 p-2.5 rounded text-[11px] text-zinc-300 border border-zinc-800">
                <strong>URL de Obrigado / Redirecionamento Pós-Compra:</strong>
                <p className="text-red-400 font-mono mt-1 break-all">https://seu-dominio.com.br/upsell-mente-inabalavel</p>
                <p className="text-[10px] text-zinc-500 mt-1">Ao finalizar a compra do Produto 01, o cliente é enviado para a página de Upsell.</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-red-900/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-red-900/40 pb-2">
                <span className="text-xs font-bold text-red-400">Produto 02 (Upsell)</span>
                <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded font-mono border border-red-900">ID: prod_upsell</span>
              </div>
              <p className="text-sm font-black text-white">Mente Inabalável (Bônus + Comunidade)</p>
              <p className="text-xs text-zinc-400">Preço: R$ {config.price}</p>
              <div className="bg-zinc-900 p-2.5 rounded text-[11px] text-zinc-300 border border-zinc-800">
                <strong>Link de Checkout 1-Clique na Paradise:</strong>
                <p className="text-emerald-400 font-mono mt-1 break-all">{config.paradiseCheckoutUrl}</p>
                <p className="text-[10px] text-zinc-500 mt-1">Este é o link configurado nos botões "QUERO CONCLUIR MINHA JORNADA".</p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Return URLs & Buttons */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow">
              2
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Configurar os Botões da Página de Upsell
            </h3>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-5 space-y-4 text-xs text-zinc-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Botão SIM (Aceitar a oferta de R$ {config.price}):</p>
                <p className="text-zinc-400">Direciona o comprador diretamente para a cobrança do produto <strong className="text-white">Mente Inabalável</strong> na Paradise. Na Paradise, ative a opção "1-Click Upsell / Manter dados do comprador".</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-zinc-900">
              <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Botão NÃO (Recusar o complemento):</p>
                <p className="text-zinc-400">Redireciona o cliente direto para o login da Área de Membros (<code className="text-zinc-200">https://seu-dominio.com.br/area-de-membros</code>), onde ele acessará o VIP Normal.</p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Webhook & Access Rules Simulator */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow">
              3
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Testar Notificação de Postback / Webhook Paradise
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Selecione o evento para simular o recebimento do Webhook da Paradise em tempo real. Veja como a plataforma libera a aba de bônus e comunidade automaticamente ao detectar a compra do upsell!
          </p>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTestPayloadType('upsell')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  testPayloadType === 'upsell'
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Payload: Venda com Upsell (R$ 29,90 + R$ {config.price})
              </button>

              <button
                onClick={() => setTestPayloadType('main')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  testPayloadType === 'main'
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Payload: Somente Produto Principal (R$ 29,90)
              </button>
            </div>

            {/* Code Box */}
            <pre className="bg-zinc-900 p-4 rounded-lg text-xs font-mono text-zinc-300 overflow-x-auto border border-zinc-800">
              {JSON.stringify(sampleWebhookPayload, null, 2)}
            </pre>

            <button
              onClick={handleSimulateWebhook}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-lg shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Disparar Webhook de Teste para o Sistema</span>
            </button>

            {webhookLog && (
              <div className="bg-zinc-900 border border-emerald-500/40 text-emerald-300 p-3 rounded-lg text-xs font-mono animate-fade-in flex items-center justify-between">
                <span>{webhookLog}</span>
                <button
                  onClick={onNavigateToMemberArea}
                  className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded hover:bg-emerald-500 cursor-pointer"
                >
                  Ver Área de Membros
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
