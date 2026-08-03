'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectDetailClientProps {
  projectId: string;
}

export default function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 더미 데이터 연동
  const projectData = {
    title: projectId === '1' ? '신촌 아이파크' : `PROJECT 0${projectId}`,
    location: 'SEOUL, KOREA',
    partner: '@HOMELUDENCE',
    date: '2026.01',
    heroImage: projectId === '1' ? '/img/projects/homeludence_1.jpg' : '/img/hero_2.jpg',
  };

  return (
    <div ref={containerRef} className="w-full">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#111111]">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 origin-center"
        >
          <Image 
            src={projectData.heroImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
          />
          {/* 오버레이 (텍스트 가독성 확보) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-x-6 md:inset-x-12 bottom-12 md:bottom-24 z-10 flex flex-col justify-end text-[#F9F9F7]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 md:mb-16"
          >
            {projectData.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] md:text-xs font-mono tracking-widest uppercase opacity-80"
          >
            <div>
              <p className="opacity-50 mb-1">LOCATION</p>
              <p>{projectData.location}</p>
            </div>
            <div>
              <p className="opacity-50 mb-1">PARTNER</p>
              <p>{projectData.partner}</p>
            </div>
            <div>
              <p className="opacity-50 mb-1">DATE</p>
              <p>{projectData.date}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Project Brief Section (스토리텔링) */}
      <section className="py-24 md:py-48 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-3xl lg:text-4xl leading-snug md:leading-snug font-medium tracking-tight"
        >
          "휴식과 집중이 모두 가능한 다목적 공간.<br className="hidden md:block"/>
          시간과 상황에 따라 빛의 온도와 밝기가 자연스럽게 바뀌는 집을 완성했습니다."
        </motion.p>
      </section>

      {/* 3. Smart Lighting Solution Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full bg-[#EBEBE9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
          <div className="md:col-span-6 flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">ZIBIS IoT Lighting</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-12">
              화이트 톤으로 정돈한 24평 아파트 인테리어. 군더더기 없는 공간에 지비스 IoT 조명을 적용해,
              아침에는 활기찬 주광색으로, 저녁에는 아늑한 전구색으로 변환되며 사용자의 바이오리듬에 맞춘 최적의 조명 환경을 제공합니다.
            </p>
            <div className="space-y-4">
              <div className="border-b border-[#111111]/10 pb-4">
                <p className="font-bold text-sm tracking-widest uppercase mb-1">Used Products</p>
                <p className="text-[#111111]/70">ZIBIS 3인치 스마트 다운라이트, ZIBIS 스마트 스트립 라이트</p>
              </div>
              <div className="border-b border-[#111111]/10 pb-4">
                <p className="font-bold text-sm tracking-widest uppercase mb-1">Color Temp</p>
                <p className="text-[#111111]/70">2700K - 6500K (Tunable White)</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 relative aspect-[4/5] overflow-hidden">
            <Image 
              src="/img/projects/homeludence_2.jpg" 
              alt="Smart Lighting Focus" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </section>

      {/* 4. Image Gallery Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          {/* Full-width 이미지 */}
          <div className="col-span-1 md:col-span-12 relative aspect-[16/9] overflow-hidden group">
            <Image 
              src={projectData.heroImage} 
              alt="Gallery Image 1" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
          </div>
          {/* 2-Column 이미지 */}
          <div className="col-span-1 md:col-span-6 relative aspect-[3/4] overflow-hidden group">
            <Image 
              src="/img/projects/homeludence_2.jpg" 
              alt="Gallery Image 2" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
          </div>
          <div className="col-span-1 md:col-span-6 relative aspect-[3/4] overflow-hidden group">
             {/* 더미 배경 (다른 이미지가 등록될 공간) */}
             <div className="absolute inset-0 bg-[#2A2B2D] flex items-center justify-center">
                <span className="text-[#F9F9F7]/30 tracking-widest text-sm">ZIBIS</span>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Next Project Section */}
      <section className="relative w-full h-[60vh] overflow-hidden group cursor-pointer border-t border-[#111111]/10">
        <Link href="/projects" className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto">
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 transition-colors duration-500 group-hover:text-[#F9F9F7]">Next Project</p>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter transition-colors duration-500 group-hover:text-[#F9F9F7]">PROJECT 02</h2>
        </Link>
        
        {/* 호버 시 나타나는 다음 프로젝트 배경 */}
        <div className="absolute inset-0 bg-[#111111] opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-10" />
      </section>
      
    </div>
  );
}
