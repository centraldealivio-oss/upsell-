import React, { useState } from 'react';
import { BonusModule, CommunityPost, UpsellConfig } from '../types';
import { Lock, Unlock, Play, FileText, Download, MessageSquare, ThumbsUp, Send, Users, ShieldCheck, Sparkles, ExternalLink, Volume2 } from 'lucide-react';

interface MemberAreaProps {
  upsellPurchased: boolean;
  setUpsellPurchased: (val: boolean) => void;
  bonusModules: BonusModule[];
  initialPosts: CommunityPost[];
  config: UpsellConfig;
  onNavigateToUpsell: () => void;
}

export const MemberArea: React.FC<MemberAreaProps> = ({
  upsellPurchased,
  setUpsellPurchased,
  bonusModules,
  initialPosts,
  config,
  onNavigateToUpsell,
}) => {
  const [activeTab, setActiveTab] = useState<'main-course' | 'bonuses' | 'community'>('bonuses');
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [activeAudioModule, setActiveAudioModule] = useState<string | null>(null);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'Você (Membro VIP)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      badge: 'Membro Mente Inabalável',
      timestamp: 'Agora mesmo',
      title: 'Relato da Minha Prática',
      content: newPostText,
      likes: 1,
      commentsCount: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Top Banner indicating Member Area Status */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-bold text-white text-sm">Área de Membros Central de Alívio</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">Plataforma de Alunos</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">Status da Conta:</span>
            {upsellPurchased ? (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5" />
                Acesso VIP Completo (Comunidade + 3 Bônus Liberados)
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  VIP Normal (Sem Bônus)
                </span>
                <button
                  onClick={() => setUpsellPurchased(true)}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-2.5 py-1 rounded text-[11px] transition cursor-pointer"
                >
                  Simular Liberação (+ R$ {config.price})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Navigation Tabs inside Member Area */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('main-course')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'main-course'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-4 h-4 text-zinc-400" />
            <span>1. Curso Principal (Antes da Explosão)</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
              Liberado
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bonuses')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'bonuses'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Bônus Exclusivos Mente Inabalável</span>
            {upsellPurchased ? (
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                Ativo
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Bloqueado
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'community'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3. Comunidade VIP Central de Alívio</span>
            {upsellPurchased ? (
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                Ativo
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Bloqueado
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: MAIN COURSE */}
        {activeTab === 'main-course' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                Produto Digital Principal
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2 mb-2">
                Método Antes da Explosão — Guia Prático
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                Seu treinamento principal está liberado! Abaixo você tem o ebook digital completo e os módulos base para entender os mecanismos da raiva, estresse acumulado e autocontrole emocional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/40 text-red-500 font-extrabold flex items-center justify-center text-sm">
                    PDF
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Ebook Oficial "Antes da Explosão"</h3>
                    <p className="text-xs text-zinc-400">Download em alta resolução (142 páginas)</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Simulação de download do Ebook Principal realizado com sucesso!')}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer border border-zinc-700"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  Baixar Ebook Completo
                </button>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 font-extrabold flex items-center justify-center text-sm">
                    AULA
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Vídeo de Boas-Vindas & Orientação</h3>
                    <p className="text-xs text-zinc-400">Duração: 14 minutos com a Equipe Central de Alívio</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Simulação de player de vídeo iniciado!')}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer border border-zinc-700"
                >
                  <Play className="w-3.5 h-3.5 text-red-400" />
                  Assistir Aula Introdutória
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BONUSES AREA */}
        {activeTab === 'bonuses' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-900 border border-red-900/50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-red-900/40 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-900/60 px-2.5 py-1 rounded">
                    Área VIP de Bônus Exclusivos
                  </span>
                  <h2 className="text-2xl font-black text-white mt-2">
                    Mente Inabalável — Trilha de Regulação
                  </h2>
                </div>
                {upsellPurchased ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Acesso Total Ativo
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-amber-400" />
                    Bônus Bloqueados
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                Esta área contém os 3 módulos práticos de intervenção imediata para desarmar conflitos antes que saiam do controle.
              </p>
            </div>

            {/* IF NOT PURCHASED -> SHOW LOCK BANNER WITH UPGRADE CTA */}
            {!upsellPurchased ? (
              <div className="bg-[#0a0a0a] border-2 border-red-600/70 rounded-2xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 font-extrabold flex items-center justify-center mx-auto shadow-lg shadow-red-950">
                  <Lock className="w-8 h-8" />
                </div>

                <div className="max-w-xl mx-auto space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Estes Bônus São Exclusivos do Mente Inabalável
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Você adquiriu o VIP Normal. Para ter acesso aos 3 Bônus Práticos (Protocolo de Regulação em Áudio, Mapa dos Gatilhos e Guia de Reconexão) mais o acesso à Comunidade VIP, conclua seu upgrade promocional por apenas R$ {config.price}.
                  </p>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>O que você desbloqueia imediatamente:</span>
                  </div>
                  <p>✓ Áudio guiado de 12 min de desativação do estresse</p>
                  <p>✓ Ferramenta diagnóstica em PDF do Mapa de Gatilhos</p>
                  <p>✓ Guia de frases para reconexão pós-briga</p>
                  <p>✓ Acesso direto à Comunidade de Alunos VIP</p>
                </div>

                <div className="max-w-md mx-auto space-y-3 pt-2">
                  <button
                    onClick={onNavigateToUpsell}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-xl shadow-red-950 transition transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>DESBLOQUEAR TUDO POR APENAS R$ {config.price}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setUpsellPurchased(true)}
                    className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold underline cursor-pointer"
                  >
                    [Modo Teste: Simular Liberação Manual Grátis]
                  </button>
                </div>
              </div>
            ) : (
              /* UNLOCKED BONUS MODULES */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bonusModules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-red-600/40 transition shadow-xl group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-900/60 px-2 py-0.5 rounded">
                          {module.type === 'audio' ? 'Áudio Guiado' : module.type === 'pdf' ? 'Worksheet PDF' : 'Checklist Prático'}
                        </span>
                        <Unlock className="w-4 h-4 text-emerald-400" />
                      </div>

                      <h3 className="font-extrabold text-white text-base group-hover:text-red-400 transition">
                        {module.title}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {module.description}
                      </p>

                      <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 text-[11px] text-zinc-300">
                        <span className="font-semibold text-zinc-400 block mb-0.5">Conteúdo do Módulo:</span>
                        {module.contentSnippet}
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-zinc-800">
                      {module.type === 'audio' ? (
                        <button
                          onClick={() => setActiveAudioModule(activeAudioModule === module.id ? null : module.id)}
                          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{activeAudioModule === module.id ? 'Pausar Áudio' : 'Ouvir Áudio Guiado'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Simulação: Download do arquivo "${module.title}" iniciado!`)}
                          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-2.5 px-4 rounded-lg border border-zinc-700 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-emerald-400" />
                          <span>Baixar {module.type === 'pdf' ? 'PDF Interativo' : 'Checklist'}</span>
                        </button>
                      )}

                      {/* Audio Player Drawer Simulation */}
                      {activeAudioModule === module.id && (
                        <div className="mt-3 bg-zinc-950 p-3 rounded-xl border border-red-600/40 text-xs text-center space-y-2 animate-fade-in">
                          <p className="font-bold text-red-400 text-[11px] flex items-center justify-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                            Reproduzindo Protocolo de Regulação (12 min)
                          </p>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-red-600 h-full w-1/3 animate-pulse"></div>
                          </div>
                          <p className="text-[10px] text-zinc-400">Voz guiada: Dra. Camila — Central de Alívio</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMMUNITY FEED */}
        {activeTab === 'community' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-900/60 px-2.5 py-1 rounded">
                Espaço Exclusivo de Troca
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2 mb-1">
                Comunidade VIP Central de Alívio
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Partilhe vitórias, tire dúvidas com a equipe e apoie outras pessoas que também estão buscando regulação emocional.
              </p>
            </div>

            {!upsellPurchased ? (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center space-y-4">
                <Lock className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Comunidade Restrita a Alunos Mente Inabalável</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  A comunidade é um bônus exclusivo da oferta Mente Inabalável. Garanta seu acesso pelo valor promocional de R$ {config.price}.
                </p>
                <button
                  onClick={onNavigateToUpsell}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 px-6 rounded-lg transition cursor-pointer"
                >
                  Quero Acesso à Comunidade VIP
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Create Post Form */}
                <form onSubmit={handleAddPost} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                      alt="Seu Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                    />
                    <span className="text-xs font-bold text-zinc-200">Criar uma nova publicação na Comunidade</span>
                  </div>

                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Compartilhe como foi usar o Mente Inabalável na sua rotina hoje..."
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newPostText.trim()}
                      className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-5 rounded-lg transition flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publicar Relato</span>
                    </button>
                  </div>
                </form>

                {/* Posts Feed */}
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover border border-red-600/40"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-xs sm:text-sm">{post.author}</h4>
                              {post.badge && (
                                <span className="text-[9px] font-extrabold bg-red-950/80 text-red-400 border border-red-900/60 px-2 py-0.5 rounded-full">
                                  {post.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-zinc-500">{post.timestamp}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-extrabold text-sm text-zinc-100 mb-1">{post.title}</h5>
                        <p className="text-xs text-zinc-300 leading-relaxed">{post.content}</p>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className="flex items-center gap-1.5 hover:text-red-400 transition cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{post.likes} Curtidas</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post.comments.length} Comentários</span>
                        </div>
                      </div>

                      {/* Comments list */}
                      {post.comments.length > 0 && (
                        <div className="bg-zinc-950 rounded-xl p-3 space-y-2 mt-2 border border-zinc-900">
                          {post.comments.map((c) => (
                            <div key={c.id} className="text-xs text-zinc-300 space-y-0.5 border-b border-zinc-900 last:border-0 pb-2 last:pb-0">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-red-400 text-[11px]">{c.author}</span>
                                <span className="text-[10px] text-zinc-500">{c.timestamp}</span>
                              </div>
                              <p className="text-zinc-300 text-xs">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
