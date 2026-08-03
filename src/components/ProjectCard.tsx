import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  colorClass?: string;
  imageSrc?: string;
  hoverImageSrc?: string;
  disableHoverSlide?: boolean;
  aspect?: 'aspect-[4/5]' | 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-video' | 'aspect-square' | 'aspect-[16/10]';
}

export default function ProjectCard({ 
  title, 
  category, 
  year, 
  colorClass = 'bg-[#222222]',
  imageSrc,
  hoverImageSrc,
  disableHoverSlide = false,
  aspect = 'aspect-[4/3]'
}: ProjectCardProps) {
  const showSlideHover = hoverImageSrc && !disableHoverSlide;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] as const }}
      className="group cursor-pointer select-none"
    >
      {/* 미디어 영역 (이미지 또는 단색 배경) */}
      <div className={`relative overflow-hidden ${aspect} w-full bg-[#F9F9F7]`}>
        {imageSrc ? (
          <>
            {/* 기본 이미지: disableHoverSlide 시 은은한 줌(scale-105), 아닐 시 위로 이동하며 90% 축소 */}
            <div className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
              showSlideHover 
                ? 'group-hover:-translate-y-[5%] group-hover:scale-90' 
                : 'group-hover:scale-105'
            }`}>
              <Image 
                src={imageSrc} 
                alt={title} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* 호버 이미지: showSlideHover 일 때만 아래에서 위로 올라오는 애니메이션 적용 */}
            {showSlideHover && (
              <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[100%] group-hover:translate-y-0">
                <Image 
                  src={hoverImageSrc} 
                  alt={`${title} hover`} 
                  fill 
                  className="object-cover" 
                />
              </div>
            )}
          </>
        ) : (
          /* 이미지 미지정 단색 플레이스홀더 영역 */
          <div className={`absolute inset-0 ${colorClass} opacity-90 transition-opacity group-hover:opacity-100`}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 transition-opacity group-hover:opacity-40">
              <span className="text-[9px] font-mono tracking-widest text-[#F9F9F7] uppercase border border-[#F9F9F7]/30 px-3 py-1.5">
                ZIBIS
              </span>
            </div>
          </div>
        )}
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
          <h4 className="font-bold text-base md:text-lg tracking-tight text-[#111111] overflow-hidden">
            <span className="block leading-snug">({year}) {title}</span>
          </h4>
          <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-[#111111]/70 block">
            {category}
          </span>
        </div>
        
        {/* VIEW PROJECT 버튼 (이미지 포함 전체 카드 호버 시 애니메이션 동작) */}
        <div className="pt-0.5">
          <div
            className="relative overflow-hidden bg-[#036CC5] rounded-full px-4 py-2 text-[10px] md:px-5 md:py-2.5 md:text-[11px] font-semibold tracking-widest uppercase text-[#F9F9F7] inline-flex items-center justify-center z-10"
          >
            <div className="relative z-10 h-[12px] md:h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[12px] md:leading-[14px] text-center">
              <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
                VIEW PROJECT
              </span>
              <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
                VIEW PROJECT
              </span>
            </div>
            <span className="relative z-10 ml-1.5 md:ml-2 text-[12px] md:text-[14px] relative -top-[1px] text-[#F9F9F7] pointer-events-none select-none leading-[12px] md:leading-[14px]">→</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
