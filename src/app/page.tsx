'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import RevealText from '@/components/RevealText';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Parallax translation and fading out for hero section
  const heroY = useTransform(scrollY, [0, 800], [0, 240]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // CTA 타이틀 리빌 감지 (문단 리빌을 이 트리거에 이어붙여 스크롤 속도와 무관하게 간격을 고정)
  const ctaTitleRef = useRef<HTMLDivElement>(null);
  const ctaTitleInView = useInView(ctaTitleRef, { margin: "-8% 0px", once: true });

  // Selected works data
  const projects = [
    {
      title: "Sidney House",
      category: "Residential Architecture",
      year: "2025",
      colorClass: "bg-[#2A2B2D]",
      span: "lg:col-span-8",
      aspect: "aspect-[16/10]" as const
    },
    {
      title: "Ascot Studio",
      category: "Commercial Office",
      year: "2026",
      colorClass: "bg-[#3D3A38]",
      span: "lg:col-span-4",
      aspect: "aspect-[3/4]" as const
    },
    {
      title: "Clayfield Renovation",
      category: "Residential Renovation & Interior",
      year: "2024",
      colorClass: "bg-[#1E2124]",
      span: "lg:col-span-5",
      aspect: "aspect-square" as const
    },
    {
      title: "Teneriffe Loft",
      category: "Interior Design Only",
      year: "2025",
      colorClass: "bg-[#2F2E2C]",
      span: "lg:col-span-7",
      aspect: "aspect-[16/10]" as const
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#F9F9F7]">
      {/* 1. Hero Section (Parallax scroll) */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-0 min-h-screen w-full flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-24 bg-[#EBEBE9]"
      >
        {/* Geometric block overlay */}
        <div className="absolute inset-0 grid grid-cols-12 gap-0 pointer-events-none opacity-40">
          <div className="col-span-8 bg-[#E5E5E3] h-full" />
          <div className="col-span-4 bg-[#DFDFDD] h-full" />
        </div>

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#111111]/45 block">
            (Architecture + Smart Space Design Studio)
          </span>
          
          {/* upgraded reveal text */}
          <RevealText 
            as="h1" 
            className="text-lg sm:text-3xl md:text-4xl font-light tracking-tight leading-none text-[#111111] max-w-5xl"
          >
            {"The ZIBIS style is defined by\nstrong, solid forms with subtle elegance,\nnatural balance and enduring appeal"}
          </RevealText>

          <div className="pt-4">
            <span className="text-xs font-mono tracking-widest text-[#111111]/60 uppercase block">
              Scroll down
            </span>
          </div>
        </div>

        {/* View Project — 히어로 우측 하단, 대표 프로젝트로 이동 (oharchitecture 레퍼런스) */}
        <Link
          href="/projects"
          className="absolute bottom-20 right-6 md:bottom-24 md:right-12 z-10 group bg-[#111111] border border-[#111111] rounded-full px-6 py-3 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7] inline-flex items-center justify-center overflow-hidden"
        >
          <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center">
            <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
              View Project
            </span>
            <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
              View Project
            </span>
          </div>
          <span className="relative z-10 ml-2 text-[#F9F9F7] pointer-events-none select-none leading-[14px]">→</span>
        </Link>
      </motion.section>

      {/* 2. Content Section (Stacking over hero) */}
      <section className="relative z-10 bg-[#F9F9F7] px-6 py-24 md:px-12 md:py-36 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        
        {/* Studio Philosophy Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-32">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
              (Our Studio)
            </span>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <RevealText 
              as="h2" 
              className="text-2xl md:text-3xl font-bold tracking-[-0.01em] leading-tight max-w-none text-[#111111]"
            >
              {"We design spaces for people.\nNo matter the scale of the projects,\nour down-to-earth approach stays the same."}
            </RevealText>
            <RevealText 
              delay={0.4} 
              className="text-sm font-light leading-relaxed text-[#111111] max-w-xl"
            >
              We listen first, design second. We take the time to understand how you live, work, and move through your space. Then, we bring your vision to life. Drawing from real experience, we create contemporary, aspirational spaces that feel effortless and truly yours.
            </RevealText>
            <div className="pt-4">
              <Link
                href="/about"
                className="relative overflow-hidden group bg-[#036CC5] border border-[#036CC5] rounded-full px-6 py-3 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7] inline-flex items-center justify-center min-w-[240px] z-10"
              >
                {/* 텍스트만 롤링되고 화살표는 고정되도록 분리 */}
                <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center">
                  <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
                    learn more about our studio
                  </span>
                  <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
                    learn more about our studio
                  </span>
                </div>
                <span className="relative z-10 ml-2 text-[#F9F9F7] pointer-events-none select-none leading-[14px]">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Selected Works Grid */}
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end border-b border-[#111111]/10 pb-6 mb-12">
            <RevealText as="h3" className="text-xl md:text-3xl font-light tracking-[-0.01em] leading-snug uppercase">
              Featured Works
            </RevealText>
            <Link href="/projects" className="text-xs font-semibold tracking-widest uppercase text-[#111111]/60 hover:text-[#111111] transition">
              view all works (4)
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-60">
            {projects.map((project, idx) => (
              <div key={idx} className={`${project.span}`}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  year={project.year}
                  colorClass={project.colorClass}
                  aspect={project.aspect}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto mt-36 text-center space-y-8 py-16 border-t border-[#111111]/10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40 block">
            (Get in touch)
          </span>
          
          <div ref={ctaTitleRef}>
            <RevealText
              as="h2"
              className="text-3xl md:text-5xl font-medium tracking-tight max-w-2xl mx-auto leading-none"
            >
              {"Ready to design your\nnext inspired space?"}
            </RevealText>
          </div>

          <RevealText
            externalInView={ctaTitleInView}
            delay={0.5}
            className="text-sm font-light leading-relaxed text-[#111111]/60 max-w-md mx-auto"
          >
            With our structured process, we prioritize clarity, collaboration, and your unique vision to shape spaces that simply work for how you live.
          </RevealText>
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => (window as any).lenis?.scrollTo(0)} // Scroll up to trigger navigation contact modal
              className="relative overflow-hidden group bg-[#036CC5] border border-[#036CC5] rounded-full px-8 py-4 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7] inline-flex items-center justify-center min-w-[260px] z-10"
            >
              <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center w-full">
                <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
                  Tell us about your project
                </span>
                <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
                  Tell us about your project
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
