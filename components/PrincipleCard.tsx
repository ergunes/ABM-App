import React from 'react';
import { Principle } from '../types';

interface PrincipleCardProps {
  principle: Principle;
  onClick: (principle: Principle) => void;
  hoverText: string;
}

const PrincipleCard: React.FC<PrincipleCardProps> = ({ principle, onClick, hoverText }) => {
  const { title, description, icon: Icon, colorTheme, id } = principle;

  return (
    <div 
      onClick={() => onClick(principle)}
      className={`
        ${colorTheme.bg} 
        ${colorTheme.border} 
        border 
        rounded-2xl 
        p-6 
        flex 
        items-start 
        gap-4 
        cursor-pointer 
        transition-all 
        duration-300 
        transform 
        hover:-translate-y-1 
        hover:shadow-lg
        ${colorTheme.hover}
        group
      `}
    >
      <div className={`
        flex-shrink-0 
        w-16 
        h-16 
        rounded-full 
        flex 
        items-center 
        justify-center 
        ${colorTheme.iconBg}
        text-gray-800
        shadow-sm
      `}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <div className="flex-1">
        <h3 className={`font-bold text-lg mb-1 flex items-center gap-2 ${colorTheme.text}`}>
          <span className="text-sm opacity-60 font-mono">{id}.</span>
          {title}
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
        <div className="mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <span>{hoverText}</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default PrincipleCard;