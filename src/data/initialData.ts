import { BonusModule, CommunityPost, UpsellConfig } from '../types';

export const defaultUpsellConfig: UpsellConfig = {
  headline: "Você já entendeu a raiz do seu padrão. Agora falta a parte que sustenta essa calma no dia em que o gatilho realmente aparecer.",
  subheadline: "Entender por que você reage é metade do caminho. Mente Inabalável é a outra metade: o que te dá segurança para agir diferente no instante exato em que o corpo já está tenso e o coração acelerado.",
  price: "9,90",
  paradiseCheckoutUrl: "https://compraonlineseguura.com/c/c3df716f02",
  declineUrl: "https://area.centraldealivio.com.br/?token=PARADISE-STD-1234",
  productImage: "https://ibb.co/MHZHcqG",
  timerMinutes: 10,
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
