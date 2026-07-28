import React from 'react';

interface BookMockup3DProps {
  className?: string;
}

export const BookMockup3D: React.FC<BookMockup3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[580px] mx-auto py-8 px-2 select-none ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-red-950/20 to-transparent blur-3xl pointer-events-none" />

      {/* 3D Stage Container */}
      <div className="relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] perspective-[1000px]">
        
        {/* BOOK 1 - GREEN (LEFT) */}
        <div className="relative z-10 transition-all duration-500 hover:z-30 hover:scale-105 transform -rotate-y-[18deg] rotate-z-[-2deg] translate-x-4 sm:translate-x-6 shadow-[0_20px_40px_rgba(0,0,0,0.9)] rounded-r-sm overflow-hidden border-t border-r border-b border-emerald-500/30 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 w-[130px] sm:w-[170px] h-[240px] sm:h-[310px] flex flex-col justify-between p-3 sm:p-4 text-center">
          {/* Spine depth simulation */}
          <div className="absolute top-0 left-0 bottom-0 w-2 sm:w-3 bg-gradient-to-r from-zinc-950 via-zinc-800 to-emerald-950/40 border-r border-emerald-500/20" />
          
          {/* Top Badge */}
          <div className="pl-2">
            <span className="inline-block bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[8px] sm:text-[10px] font-bold tracking-widest px-2 py-0.5 rounded uppercase">
              BÔNUS 1
            </span>
          </div>

          {/* Center Content */}
          <div className="my-auto pl-2 flex flex-col items-center">
            {/* Glowing Icon */}
            <div className="relative mb-2 sm:mb-3">
              <div className="absolute inset-0 bg-emerald-500/30 blur-md rounded-full" />
              <svg className="w-9 h-9 sm:w-14 sm:h-14 text-emerald-400 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Title */}
            <h4 className="text-amber-200 text-xs sm:text-base font-black tracking-wider uppercase leading-tight font-serif drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              BLINDAGEM<br />DO VÍNCULO
            </h4>

            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent my-1.5" />

            {/* Subtitle */}
            <p className="text-[7px] sm:text-[9px] text-zinc-400 uppercase tracking-tighter line-clamp-2 leading-tight">
              Fortaleça o que te sustenta e blinde o que te transforma
            </p>
          </div>

          {/* Author */}
          <div className="pl-2 border-t border-emerald-500/20 pt-1.5">
            <p className="text-[7px] sm:text-[9px] text-amber-300/80 tracking-widest uppercase font-serif">
              ISABELLA XAVIER
            </p>
          </div>
        </div>

        {/* BOOK 2 - PURPLE / GOLD (CENTER - PROMINENT) */}
        <div className="relative z-20 transition-all duration-500 hover:z-30 hover:scale-105 transform translate-y-[-8px] shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(168,85,247,0.2)] rounded-r-sm overflow-hidden border-t border-r border-b border-purple-400/40 bg-gradient-to-br from-zinc-900 via-purple-950/30 to-black w-[145px] sm:w-[190px] h-[260px] sm:h-[335px] flex flex-col justify-between p-3.5 sm:p-5 text-center">
          {/* Spine depth simulation */}
          <div className="absolute top-0 left-0 bottom-0 w-2.5 sm:w-3.5 bg-gradient-to-r from-zinc-950 via-zinc-800 to-purple-900/50 border-r border-purple-400/30" />
          
          {/* Top Badge */}
          <div className="pl-2">
            <span className="inline-block bg-purple-900/80 border border-purple-400/50 text-purple-300 text-[8px] sm:text-[10px] font-extrabold tracking-widest px-2.5 py-0.5 rounded uppercase shadow-sm">
              E-BOOK PRINCIPAL
            </span>
          </div>

          {/* Center Content */}
          <div className="my-auto pl-2 flex flex-col items-center">
            {/* Glowing Icon */}
            <div className="relative mb-2 sm:mb-3">
              <div className="absolute inset-0 bg-purple-500/40 blur-lg rounded-full" />
              <svg className="w-10 h-10 sm:w-16 sm:h-16 text-purple-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" strokeWidth="1" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-amber-100 text-sm sm:text-lg font-black tracking-widest uppercase leading-tight font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              RAIO-X DO<br />GATILHO
            </h3>

            <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent my-2" />

            {/* Subtitle */}
            <p className="text-[7.5px] sm:text-[10px] text-zinc-300 uppercase tracking-tight leading-tight px-1 font-medium">
              Identifique o que desencadeia e transforme o que te trava
            </p>
          </div>

          {/* Author */}
          <div className="pl-2 border-t border-purple-400/30 pt-2">
            <p className="text-[8px] sm:text-[10px] text-amber-300 font-bold tracking-widest uppercase font-serif">
              ISABELLA XAVIER
            </p>
          </div>
        </div>

        {/* BOOK 3 - RED (RIGHT) */}
        <div className="relative z-10 transition-all duration-500 hover:z-30 hover:scale-105 transform rotate-y-[18deg] rotate-z-[2deg] -translate-x-4 sm:-translate-x-6 shadow-[0_20px_40px_rgba(0,0,0,0.9)] rounded-r-sm overflow-hidden border-t border-r border-b border-red-500/30 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 w-[130px] sm:w-[170px] h-[240px] sm:h-[310px] flex flex-col justify-between p-3 sm:p-4 text-center">
          {/* Spine depth simulation */}
          <div className="absolute top-0 left-0 bottom-0 w-2 sm:w-3 bg-gradient-to-r from-zinc-950 via-zinc-800 to-red-950/40 border-r border-red-500/20" />
          
          {/* Top Badge */}
          <div className="pl-2">
            <span className="inline-block bg-red-950/80 border border-red-500/40 text-red-400 text-[8px] sm:text-[10px] font-bold tracking-widest px-2 py-0.5 rounded uppercase">
              BÔNUS 2
            </span>
          </div>

          {/* Center Content */}
          <div className="my-auto pl-2 flex flex-col items-center">
            {/* Glowing Icon */}
            <div className="relative mb-2 sm:mb-3">
              <div className="absolute inset-0 bg-red-500/30 blur-md rounded-full" />
              <svg className="w-9 h-9 sm:w-14 sm:h-14 text-red-400 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                <path d="M3.5 12h4l2-4 3 8 2-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Title */}
            <h4 className="text-amber-200 text-xs sm:text-base font-black tracking-wider uppercase leading-tight font-serif drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              PROTOCOLO<br />100 BPM
            </h4>

            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent my-1.5" />

            {/* Subtitle */}
            <p className="text-[7px] sm:text-[9px] text-zinc-400 uppercase tracking-tighter line-clamp-2 leading-tight">
              Para acalmar o coração e recuperar o controle
            </p>
          </div>

          {/* Author */}
          <div className="pl-2 border-t border-red-500/20 pt-1.5">
            <p className="text-[7px] sm:text-[9px] text-amber-300/80 tracking-widest uppercase font-serif">
              ISABELLA XAVIER
            </p>
          </div>
        </div>

      </div>

      {/* Surface Reflection Floor Shadow */}
      <div className="w-4/5 h-4 mx-auto bg-black/80 blur-lg rounded-full mt-2 pointer-events-none" />
    </div>
  );
};
