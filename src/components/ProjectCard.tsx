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
        
        {/* VIEW PROJECT 텍스트 버튼 (이미지 포함 전체 카드 호버 시 밑줄 및 화살표 애니메이션 동작) */}
        <div className="pt-0.5">
          <div className="inline-flex items-center text-[14px] md:text-[16px] font-mono font-semibold tracking-widest uppercase text-[#858584] whitespace-nowrap">
            <span className="relative pb-0.5 z-10">
              VIEW PROJECT
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#858584] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
            <svg 
              width="24" 
              height="10" 
              viewBox="0 0 24 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="ml-2 relative -top-[1px] z-10 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M0 5H23M23 5L19 1M23 5L19 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
