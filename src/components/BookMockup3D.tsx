import React from 'react';

export const resolveImageUrl = (url?: string): string => {
  if (!url) return 'https://i.ibb.co/MyHrWMDk/Chat-GPT-Image-2-de-ago-de-2026-19-25-09.png';
  if (url.includes('ibb.co/LDymbnzd')) {
    return 'https://i.ibb.co/MyHrWMDk/Chat-GPT-Image-2-de-ago-de-2026-19-25-09.png';
  }
  if (url.includes('ibb.co/Q3vt1Xjv')) {
    return 'https://i.ibb.co/cShV7xXh/Captura-de-tela-2026-07-28-163516.png';
  }
  if (url.includes('ibb.co/JZvFRM0')) {
    return 'https://i.ibb.co/CLbs5TN/12.png';
  }
  return url;
};

interface BookMockup3DProps {
  imageUrl?: string;
  className?: string;
}

export const BookMockup3D: React.FC<BookMockup3DProps> = ({
  imageUrl,
  className = '',
}) => {
  const directUrl = resolveImageUrl(imageUrl);

  return (
    <div className={`relative w-full max-w-[850px] mx-auto my-6 select-none ${className}`}>
      <img
        src={directUrl}
        alt="Mente Inabalável - 3 Livros"
        referrerPolicy="no-referrer"
        className="w-full h-auto object-contain mx-auto block transition-all duration-300"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
};



