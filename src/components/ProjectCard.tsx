'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  colorClass?: string;
  aspect?: 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-video' | 'aspect-square' | 'aspect-[16/10]';
}

export default function ProjectCard({ 
  title, 
  category, 
  year, 
  colorClass = 'bg-[#222222]',
  aspect = 'aspect-[4/3]'
}: ProjectCardProps) {
  return (
    <div className="group cursor-pointer select-none">
      {/* 단색 미디어 영역 */}
      <div className={`relative overflow-hidden ${aspect} w-full bg-[#1A1A1A]`}>
        <motion.div 
          className={`absolute inset-0 ${colorClass} opacity-90 transition-opacity group-hover:opacity-100`}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        />
        
        {/* 가상 레이아웃 및 엠블럼 효과 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 transition-opacity group-hover:opacity-40">
          <span className="text-[9px] font-mono tracking-widest text-[#F9F9F7] uppercase border border-[#F9F9F7]/30 px-3 py-1.5">
            ZIBIS
          </span>
        </div>
      </div>
      
      {/* 텍스트 설명 정보 */}
      <div className="mt-4 flex justify-between items-start text-xs tracking-wider text-[#111111]">
        <div className="space-y-1">
          <h4 className="font-medium text-sm tracking-normal group-hover:translate-x-1 transition-transform duration-300">
            {title}
          </h4>
          <span className="text-[10px] tracking-wide uppercase text-[#111111]/50 block font-light">
            {category}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#111111]/50">{year}</span>
      </div>
    </div>
  );
}
