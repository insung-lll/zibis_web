'use client';

import { useRef, useState } from 'react';
import { useInView, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import RevealText from '@/components/RevealText';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringProject, setIsHoveringProject] = useState(false);

  // CTA 타이틀 리빌 감지 (문단 리빌을 이 트리거에 이어붙여 스크롤 속도와 무관하게 간격을 고정)
  const ctaTitleRef = useRef<HTMLDivElement>(null);
  const ctaTitleInView = useInView(ctaTitleRef, { margin: "-8% 0px", once: true });

  const { scrollY } = useScroll();
  // 0에서 800px 스크롤하는 동안 투명도가 0.3에서 0.9로 진해짐
  const overlayOpacity = useTransform(scrollY, [0, 800], [0.3, 0.9]);

  // Selected works data
  const projects = [
    {
      title: "신촌 아이파크",
      category: "@HOMELUDENCE",
      year: "2026",
      imageSrc: "/img/projects/homeludence_1.jpg",
      hoverImageSrc: "/img/projects/homeludence_2.jpg",
      colorClass: "bg-[#2A2B2D]",
      span: "xl:col-span-5 w-full min-w-[100%] xl:min-w-[460px] justify-self-start",
      aspect: "aspect-[4/5]" as const
    },
    {
      title: "PROJECT 02",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#3D3A38]",
      span: "xl:col-start-7 xl:col-span-6 w-full min-w-[100%] xl:min-w-[460px] justify-self-end",
      aspect: "aspect-[4/3]" as const
    },
    {
      title: "PROJECT 03",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#2F2E2C]",
      span: "xl:col-span-7 w-full min-w-[100%] xl:min-w-[640px] justify-self-start",
      aspect: "aspect-[16/10]" as const
    },
    {
      title: "PROJECT 04",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#1E2124]",
      span: "xl:col-start-9 xl:col-span-4 w-full min-w-[100%] xl:min-w-[380px] justify-self-end",
      aspect: "aspect-[3/4]" as const
    }
  ];

  return (
    // overflow-hidden은 sticky를 무력화하므로 가로 넘침만 잘라내는 overflow-x-clip 사용
    <div ref={containerRef} className="relative w-full overflow-x-clip bg-[#F9F9F7]">
      {/* 1. Hero Section — sticky로 화면에 고정, 다음 섹션이 위로 올라와 덮는 스택 스크롤 */}
      <section
        className="sticky top-0 z-0 h-screen w-full flex flex-col justify-end px-6 pb-[60px] md:px-12 md:pb-[76px] bg-[#EBEBE9] overflow-hidden"
      >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 overflow-hidden bg-[#111111]">
          {/* 기본 배경 */}
          <div 
            className={`absolute inset-0 bg-[url('/img/hero_2.jpg')] bg-cover bg-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
              isHoveringProject ? '-translate-y-[5%] scale-90 opacity-50' : 'translate-y-0 scale-100 opacity-100'
            }`} 
          />
          
          {/* 호버 시 아래에서 위로 슬라이드 인 되는 프로젝트 배경 */}
          <div 
            className={`absolute inset-0 bg-[url('/img/projects/homeludence_2.jpg')] bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHoveringProject ? 'translate-y-0' : 'translate-y-[100%]'
            }`}
          />
        </div>
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* 중앙 그리드 레이아웃 (새로운 텍스트 요소들) */}
        <div className="absolute inset-x-6 md:inset-x-12 top-[calc(50%+40px)] -translate-y-1/2 z-10 grid grid-cols-4 md:grid-cols-12 gap-4 pointer-events-none text-[#F9F9F7] items-start mt-12 md:mt-0">
          {/* 1. Date */}
          <div className="col-span-4 md:col-span-3 lg:col-span-2 text-[14px] font-sans tracking-widest uppercase">
            2026.01.24
          </div>
          
          {/* 2. Tag */}
          <div className="col-span-4 md:col-span-3 md:col-start-4 lg:col-start-5 lg:col-span-2 text-[14px] font-sans tracking-widest uppercase text-[#F9F9F7]/70">
            @HOMELUDENCE
          </div>

          {/* 3. Description */}
          <div className="col-span-4 md:col-span-4 md:col-start-7 lg:col-start-8 lg:col-span-3 text-[12px] md:text-[14px] max-w-[280px] leading-[1.3] tracking-wider uppercase font-sans text-[#F9F9F7]/70 break-keep">
            <p>
              A FULL INTERIOR RENOVATION OF A 79㎡ APARTMENT, FINISHED ENTIRELY IN WHITE. ZIBIS IOT LIGHTING RUNS THROUGHOUT THE SPACE, QUIETLY SHIFTING WARMTH AND BRIGHTNESS TO MATCH THE RHYTHM OF THE DAY.
            </p>
            <p className="mt-2">
              화이트 톤으로 정돈한 24평 아파트 인테리어. 군더더기 없는 공간에 지비스 IOT 조명을 적용해, 시간과 상황에 따라 빛의 온도와 밝기가 자연스럽게 바뀌는 집을 완성했습니다.
            </p>
          </div>

          {/* 4. View Project */}
          <div className="col-span-4 md:col-span-2 md:col-start-11 lg:col-start-11 lg:col-span-2 text-left md:text-right pointer-events-auto mt-2 md:mt-0 pt-0.5">
            <Link 
              href="/projects" 
              onMouseEnter={() => setIsHoveringProject(true)}
              onMouseLeave={() => setIsHoveringProject(false)}
              className="group inline-flex items-center text-[14px] font-sans tracking-widest uppercase hover:text-[#F9F9F7] whitespace-nowrap"
            >
              <span className="relative pb-0.5 z-10">
                VIEW PROJECT
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F9F9F7] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
              <span className="ml-2 text-[18px] relative -top-[2px] z-10 leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 하단 텍스트 레이아웃 */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between">
          <div className="space-y-4">
            <span className="text-[10px] md:text-[14px] font-mono tracking-[0.25em] uppercase text-[#F9F9F7]/70 block">
              (SMART LIGHTING — ZIBIS)
            </span>
            <RevealText 
              as="h1" 
              className="text-[26px] sm:text-[36px] md:text-[44px] font-light tracking-tight leading-none text-[#F9F9F7] max-w-5xl"
            >
              <span className="block pb-1">{"The Smart Home Partner,"}</span>
              <span className="block"><span className="font-semibold">ZIBIS</span>{" Smart Lighting Solution."}</span>
            </RevealText>
          </div>

          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 hidden md:block mb-1">
            <span className="text-[10px] md:text-[14px] font-mono tracking-[0.25em] text-[#F9F9F7]/70 uppercase">
              SCROLL DOWN
            </span>
          </div>
        </div>
      </section>

      {/* 2. Content Section (Stacking over hero) */}
      <section className="relative z-10 bg-[#F9F9F7] px-6 py-24 md:px-12 md:py-36 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        
        {/* ZIBIS Story Section (Wide Layout) */}
        <div className="w-full mb-16 md:mb-24">
          {/* Huge Wide Title */}
          <h2 className="text-[32px] md:text-[4vw] lg:text-[4vw] font-bold tracking-tight leading-[1.2] md:leading-[1.1] text-[#111111] mb-5 md:mb-8 break-keep relative -top-[30px] md:-top-[60px]">
            진정한 스마트홈의 완성은,<br className="hidden md:block" />
            공간이 시작될 때 설계되어야 합니다.
          </h2>

          {/* Content Layout (Images + Tag + Text) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-y-8 lg:gap-y-10">
            
            {/* Top Row: Tag (Bottom Aligned) + Images */}
            <div className="lg:col-span-3 flex flex-col justify-end hidden lg:flex">
              <span className="text-[10px] md:text-[14px] font-mono tracking-widest uppercase text-[#111111]/40 block leading-none">
                (Our Story)
              </span>
            </div>
            
            <div className="lg:col-span-9">
              {/* Mobile Tag */}
              <div className="lg:hidden mb-4">
                <span className="text-[10px] md:text-[14px] font-mono tracking-widest uppercase text-[#111111]/40 block">
                  (Our Story)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <Image src="/img/2_1_1.jpg" alt="Zibis story image 1" fill className="object-cover" />
                </div>
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <Image src="/img/2_2_2.svg" alt="Zibis story image 2" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Bottom Row: Description */}
            <div className="lg:col-span-9 lg:col-start-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="space-y-10 lg:ml-2 w-full max-w-[640px]">
                  <RevealText 
                    delay={0.2} 
                    className="text-[14px] md:text-[15px] font-medium leading-[1.4] text-[#111111] opacity-70 break-keep"
                  >
                    조명은 인테리어가 끝난 후 고르는 소품이 아닙니다. 벽과 천장의 배선이 이루어지는 가장 첫 단계에서 뼈대를 세워야 완벽한 스마트홈이 탄생합니다. 지비스는 혁신적인 2WIRE 배선 기술과 끊김 없는 무선 통신으로 재공사 없는 가장 확실한 스마트 조명 인프라를 제안합니다.
                  </RevealText>
                  
                  <div className="pt-2">
                    <Link
                      href="/about"
                      className="relative overflow-hidden group bg-[#036CC5] rounded-full px-6 py-3 text-[11px] font-semibold tracking-widest uppercase text-[#F9F9F7] inline-flex items-center justify-center z-10"
                    >
                      <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center">
                        <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
                          learn more about zibis
                        </span>
                        <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
                          learn more about zibis
                        </span>
                      </div>
                      <span className="relative z-10 ml-2 text-[14px] relative -top-[1px] text-[#F9F9F7] pointer-events-none select-none leading-[14px]">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Works Grid */}
        <div className="w-full px-6 md:px-12 pt-12 pb-36">
          <div className="flex justify-between items-center md:items-end pb-4 mb-8 md:mb-12">
            <RevealText as="h3" className="text-[46px] md:text-[90px] font-medium tracking-tight uppercase text-[#111111] leading-none">
              PROJECTS
            </RevealText>
            <Link href="/projects" className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#111111]/40 hover:text-[#111111] transition mb-0 md:mb-4">
              VIEW ALL PROJECTS (4)
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-x-6 gap-y-16 xl:gap-y-52 items-start">
            {projects.map((project, idx) => (
              <div key={idx} className={`${project.span}`}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  year={project.year}
                  imageSrc={project.imageSrc}
                  hoverImageSrc={project.hoverImageSrc}
                  colorClass={project.colorClass}
                  aspect={project.aspect}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto mt-36 text-center space-y-8 py-16 border-t border-[#111111]/10">
          <span className="text-[10px] md:text-[14px] font-mono tracking-widest uppercase text-[#111111]/40 block">
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
