'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

interface ProjectDetailClientProps {
  projectId: string;
}

export default function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 데이터 허브에서 해당 프로젝트 가져오기
  const projectIndex = projects.findIndex(p => p.id === projectId);
  const projectData = projects[projectIndex];

  if (!projectData) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  
  // Hero Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
          "{projectData.brief}<br className="hidden md:block"/>
          {projectData.briefSub}"
        </motion.p>
      </section>

      {/* 3. Smart Lighting Solution Section */}
      <section className="py-24 md:py-48 px-6 md:px-12 w-full bg-[#F9F9F7]">
        <div className="max-w-screen-2xl mx-auto flex flex-col">
          {/* 텍스트 영역 */}
          <div className="mb-24 md:mb-32">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">지비스 스마트 조명</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed text-[#111111]">
              {projectData.brief}<br />
              {projectData.briefSub}
            </p>
          </div>
          
          {/* 제품 썸네일 그리드 영역 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 items-end">
            {projectData.products.map((product, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`relative w-full ${product.aspect || 'aspect-square'} mb-6 bg-[#EBEBE9] flex items-center justify-center overflow-hidden`}>
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  ) : (
                    <span className="text-[#111111]/30 text-xs">Image</span>
                  )}
                </div>
                <p className="font-bold text-sm md:text-base tracking-tight text-center">{product.name}</p>
              </div>
            ))}
          </div>

          {/* 왜 이 제품을 사용했는지 (Why ZIBIS IoT) */}
          <div className="mt-24 md:mt-32 max-w-5xl border-t border-[#111111]/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h4 className="text-xl md:text-2xl font-bold tracking-tight mb-4">{projectData.whyZibisTitle1}</h4>
              <p className="text-sm md:text-base opacity-75 leading-relaxed text-[#111111]">
                {projectData.whyZibisDesc1}
              </p>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-bold tracking-tight mb-4">{projectData.whyZibisTitle2}</h4>
              <p className="text-sm md:text-base opacity-75 leading-relaxed text-[#111111]">
                {projectData.whyZibisDesc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Image Gallery Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          {projectData.gallery.map((item, idx) => (
            <div key={idx} className={`${item.colSpan} relative ${item.aspect} overflow-hidden group bg-[#EBEBE9] flex items-center justify-center`}>
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={`Gallery Image ${idx + 1}`} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              ) : (
                <span className="text-[#111111]/30 text-sm tracking-widest">ZIBIS</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Next Project Section */}
      <section className="relative w-full h-[60vh] overflow-hidden group cursor-pointer border-t border-[#111111]/10">
        <Link href={`/projects/${nextProject.id}`} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto">
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 transition-colors duration-500 group-hover:text-[#F9F9F7]">Next Project</p>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter transition-colors duration-500 group-hover:text-[#F9F9F7]">{nextProject.title}</h2>
        </Link>
        
        {/* 호버 시 나타나는 다음 프로젝트 배경 */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-10" 
          style={{ backgroundImage: `url(${nextProject.heroImage})` }}
        />
        <div className="absolute inset-0 bg-[#111111]/50 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 z-10" />
      </section>
      
    </div>
  );
}
