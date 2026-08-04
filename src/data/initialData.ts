import { BonusModule, CommunityPost, UpsellConfig } from '../types';

export const defaultUpsellConfig: UpsellConfig = {
  headline: "Você já garantiu o conteúdo principal — e parte dos complementos. Sinta-se à vontade pra testar o que você já tem, no seu ritmo. Os outros ficam liberados pra desbloquear quando fizer sentido pra você, direto na sua área de membros.",
  subheadline: "Mas se esse momento é agora: os 3 bônus estão com uma promoção ativa, porque juntos eles são a peça que falta pra uma experiência completa.",
  price: "21,50",
  paradiseCheckoutUrl: "https://checkoutonline.org.ua/c/71f8ea06a3",
  declineUrl: "https://area.centraldealivio.com.br/?token=PARADISE-STD-1234",
  productImage: "https://i.ibb.co/MyHrWMDk/Chat-GPT-Image-2-de-ago-de-2026-19-25-09.png",
  timerMinutes: 10,
  useVectorMockup: true,
  forwardUrlParams: true,
  dynamicTokenInUrl: true,
  bonusRules: [
    {
      id: 'rule-combo-all',
      bonusName: '5. Combo Completo (Principal + Todos os 3 Bônus)',
      paramKey: 'combo',
      paramValue: 'true',
      checkoutUrl: 'https://checkoutonline.org.ua/c/71f8ea06a3',
      declineUrl: 'https://area.centraldealivio.com.br/?token=TOKEN-ALL-BONUSES',
      description: 'Liberado: Ebook + Audiobook + Bônus 1 + Bônus 2 + Bônus 3'
    },
    {
      id: 'rule-b1',
      bonusName: '2. Principal + Bônus 1 (Protocolo 100 BPM)',
      paramKey: 'b1',
      paramValue: '1',
      checkoutUrl: 'https://checkoutonline.org.ua/c/71f8ea06a3',
      declineUrl: 'https://area.centraldealivio.com.br/?token=TOKEN-BONUS1-BPM100',
      description: 'Liberado: Produto Principal + Bônus 1 (Áudios SOS & Bio-Feedback)'
    },
    {
      id: 'rule-b2',
      bonusName: '3. Principal + Bônus 2 (Raio-X do Gatilho)',
      paramKey: 'b2',
      paramValue: '1',
      checkoutUrl: 'https://checkoutonline.org.ua/c/71f8ea06a3',
      declineUrl: 'https://area.centraldealivio.com.br/?token=TOKEN-BONUS2-GATILHO',
      description: 'Liberado: Produto Principal + Bônus 2 (Diagnosticador Neuro-Comportamental)'
    },
    {
      id: 'rule-b3',
      bonusName: '4. Principal + Bônus 3 (Blindagem do Vínculo)',
      paramKey: 'b3',
      paramValue: '1',
      checkoutUrl: 'https://checkoutonline.org.ua/c/71f8ea06a3',
      declineUrl: 'https://area.centraldealivio.com.br/?token=TOKEN-BONUS3-VINCULO',
      description: 'Liberado: Produto Principal + Bônus 3 (Gerador de Acordo/Contrato)'
    },
    {
      id: 'rule-std',
      bonusName: '1. Somente Produto Principal (Ebook + Audiobook)',
      paramKey: 'std',
      paramValue: '1',
      checkoutUrl: 'https://checkoutonline.org.ua/c/71f8ea06a3',
      declineUrl: 'https://area.centraldealivio.com.br/?token=PARADISE-STD-1234',
      description: 'Liberado: Ebook "Antes da Explosão" + Narração MP3'
    },
    {
      id: 'rule-supremo',
      bonusName: '👑 Nível SUPREMO (Comunidade VIP Black)',
      paramKey: 'supremo',
      paramValue: 'true',
      checkoutUrl: 'https://checkoutonline.org.ua/c/71f8ea06a3',
      declineUrl: 'https://area.centraldealivio.com.br/?token=PARADISE-SUPREMO-9999',
      description: 'Liberado: Produto Principal + 3 Bônus + Acesso à Comunidade VIP Black'
    }
  ]
};

export const bonusModulesData: BonusModule[] = [
  {
    id: 'bonus-1',
    title: 'Protocolo de Regulação em Tempo Real',
    description: 'Um passo a passo guiado para acalmar a resposta do sistema nervoso assim que o gatilho dispara, impedindo a explosão.',
    type: 'audio',
    durationOrPages: 'Audio Guiado (12 min) + Guia em PDF',
    contentSnippet: 'Exercícios práticos de respiração diafragmática, reancoragem corporal e desativação da amígdala cerebral sob estresse alto.'
  },
  {
    id: 'bonus-2',
    title: 'Mapa Pessoal do Seu Gatilho',
    description: 'Worksheet interativa para mapear com clareza quais frases, tons de voz e comportamentos específicos disparam a sua reação automática.',
    type: 'pdf',
    durationOrPages: 'Ferramenta Diagnóstica em PDF (18 páginas)',
    contentSnippet: 'Identifique seu perfil de resposta (Ataque, Fuga, Paralisia ou Agradar) e anteceda a explosão com 30 segundos de margem.'
  },
  {
    id: 'bonus-3',
    title: 'Guia de Reconexão Pós-Conflito',
    description: 'Como retomar o diálogo com maturidade e sem remorso após um momento de tensão, quebrando o ciclo de desculpas vazias.',
    type: 'checklist',
    durationOrPages: 'Checklist de Diálogo + Manual de Aplicação',
    contentSnippet: 'Roteiros de frases exatas para desarmar hostilidades na família ou no relacionamento e restabelecer a paz em minutos.'
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Mariana Santos',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    badge: 'Membro Mente Inabalável',
    timestamp: 'Há 2 horas',
    title: 'O protocolo do áudio funcionou hoje cedo!',
    content: 'Gente, passei por uma situação supersensível com meu marido hoje que antes teria virado uma briga enorme. Lembrei do exercício de 30 segundos do Protocolo de Regulação, respirei e consegui responder sem gritar. Sentir essa sensação de controle é libertador!',
    likes: 24,
    commentsCount: 3,
    comments: [
      {
        id: 'c1',
        author: 'Dra. Camila (Equipe Central de Alívio)',
        timestamp: 'Há 1 hora',
        text: 'Parabéns Mariana! Esse é exatamente o objetivo da regulação em tempo real: criar o espaço entre o gatilho e a reação.'
      },
      {
        id: 'c2',
        author: 'Patrícia Lima',
        timestamp: '30 min atrás',
        text: 'Também usei essa semana! O Mapa do Gatilho me ajudou a perceber que o tom de voz irônico era meu maior gatilho.'
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Fernanda Oliveira',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Membro VIP Bônus',
    timestamp: 'Ontem às 18:40',
    title: 'Guia de Reconexão: Pedi desculpas do jeito certo pela 1ª vez',
    content: 'Sempre que brigávamos eu ficava remoendo por dias ou pedia desculpas com mágoa. Usei o roteiro de frases do Guia de Reconexão e conversamos com calma pela primeira vez em meses. Valeu cada centavo esse upsell!',
    likes: 38,
    commentsCount: 2,
    comments: [
      {
        id: 'c3',
        author: 'Luciana Ramos',
        timestamp: 'Ontem às 20:15',
        text: 'Sensacional Fernanda! Fiquei impressionada com esse bônus também.'
      }
    ]
  }
];
