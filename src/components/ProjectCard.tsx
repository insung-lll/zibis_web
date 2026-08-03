import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  colorClass?: string;
  imageSrc?: string;
  aspect?: 'aspect-[4/5]' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-video' | 'aspect-square' | 'aspect-[16/10]';
}

export default function ProjectCard({ 
  title, 
  category, 
  year, 
  colorClass = 'bg-[#222222]',
  imageSrc,
  aspect = 'aspect-[4/3]'
}: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] as const }}
      className="group cursor-pointer select-none"
    >
      {/* 미디어 영역 (이미지 또는 단색 배경) */}
      <div className={`relative overflow-hidden ${aspect} w-full bg-[#1A1A1A]`}>
        <motion.div 
          className={`absolute inset-0 ${imageSrc ? '' : colorClass} opacity-90 transition-opacity group-hover:opacity-100`}
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1.0 }}
          whileHover={{ scale: 1.06 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ 
            scale: { duration: 1.8, ease: [0.19, 1, 0.22, 1] as const },
            opacity: { duration: 0.6 }
          }}
        >
          {imageSrc && (
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-700 ease-out" 
            />
          )}
        </motion.div>
        
        {/* 가상 레이아웃 및 엠블럼 효과 (이미지 미지정시에만 선명하게 노출) */}
        {!imageSrc && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 transition-opacity group-hover:opacity-40">
            <span className="text-[9px] font-mono tracking-widest text-[#F9F9F7] uppercase border border-[#F9F9F7]/30 px-3 py-1.5">
              ZIBIS
            </span>
          </div>
        )}
        
        {/* 다크 오버레이 호버 효과 */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      
      {/* 텍스트 설명 정보 (타이틀 볼드/크기 상향, 카테고리/연도 크기 상향) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] as const, delay: 0.3 }}
        className="mt-4 flex justify-between items-start text-xs tracking-wider text-[#111111]"
      >
        <div className="space-y-1">
          <h4 className="font-bold text-base md:text-lg tracking-tight group-hover:translate-x-1 transition-transform duration-300 text-[#111111]">
            {title}
          </h4>
          <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-[#111111]/70 block">
            {category}
          </span>
        </div>
        <span className="font-mono text-xs md:text-sm font-semibold text-[#111111]/60 pt-0.5">{year}</span>
      </motion.div>
    </motion.div>
  );
}
