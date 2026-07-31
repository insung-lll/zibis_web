'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SCROLL_THRESHOLD = 50; // 스크롤 감지 기준값

const NavLink = ({ href, children, isDarkText }: { href: string; children: React.ReactNode; isDarkText?: boolean }) => (
  <Link href={href} className="relative block overflow-hidden group py-1">
    <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px]">
      <span className={`transition-all duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block ${isDarkText ? 'text-[#111111]/70 group-hover:text-[#111111]' : 'text-[#FFF]/70 group-hover:text-[#FFF]'}`}>
        {children}
      </span>
      <span className={`transition-all duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full left-0 right-0 ${isDarkText ? 'text-[#111111]' : 'text-[#FFF]'}`}>
        {children}
      </span>
    </div>
  </Link>
);

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenContact: () => void;
}

export default function Header({ onOpenMenu, onOpenContact }: HeaderProps) {
  const [showFloating, setShowFloating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isProjectsPage = pathname === '/projects';
  const isDarkText = pathname !== '/';

  // 모바일 여부 감지: 모바일에서는 내비게이션이 숨겨지므로 메뉴 버튼을 항상 노출해야 함
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const updateIsMobile = () => setIsMobile(mql.matches);
    updateIsMobile();
    mql.addEventListener('change', updateIsMobile);
    return () => mql.removeEventListener('change', updateIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 550px 초과 시 플로팅 헤더 노출 (프로젝트 페이지에서는 미노출)
      if (currentScrollY > 550 && !isProjectsPage) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectsPage]);

  // 모바일에서는 스크롤 위치/페이지와 무관하게 상담+메뉴 버튼을 상단에 항상 고정 노출
  const showFloatingPills = isMobile || showFloating;

  return (
    <>
      {/* 1. 기본 상단 헤더 메뉴바 (일반 페이지에서는 absolute로 스크롤 퇴장, 프로젝트 페이지에서는 fixed 영구 고정) */}
      <header
        className={`${
          isProjectsPage ? 'fixed' : 'absolute'
        } top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-12 md:py-8 bg-transparent pointer-events-auto`}
      >
        {/* 좌측 영역 (로고) */}
        <div className="flex-1 flex items-center h-full">
          <Link href="/" className="select-none hover:opacity-80 transition-opacity">
            <img src={isDarkText ? "/img/zibis_logo1.png" : "/img/zibis_logo2.png"} alt="ZIBIS" className="h-7 md:h-8 w-auto object-contain" />
          </Link>
        </div>

        {/* 중앙 영역 (화면 기준 절대 정중앙 배치) */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-4 text-sm font-bold tracking-widest uppercase whitespace-nowrap">
          <NavLink href="/projects" isDarkText={isDarkText}>Projects</NavLink>
          <span className={`w-[3px] h-[3px] rounded-full shrink-0 ${isDarkText ? 'bg-[#111111]/40' : 'bg-[#FFF]/40'}`} />
          <NavLink href="/about" isDarkText={isDarkText}>About</NavLink>
          <span className={`w-[3px] h-[3px] rounded-full shrink-0 ${isDarkText ? 'bg-[#111111]/40' : 'bg-[#FFF]/40'}`} />
          <NavLink href="/b2b" isDarkText={isDarkText}>B2B</NavLink>
          <span className={`w-[3px] h-[3px] rounded-full shrink-0 ${isDarkText ? 'bg-[#111111]/40' : 'bg-[#FFF]/40'}`} />
          <NavLink href="/lighting-planner" isDarkText={isDarkText}>lighting planner</NavLink>
          <span className={`w-[3px] h-[3px] rounded-full shrink-0 ${isDarkText ? 'bg-[#111111]/40' : 'bg-[#FFF]/40'}`} />
          <NavLink href="/news" isDarkText={isDarkText}>News</NavLink>
          <span className={`w-[3px] h-[3px] rounded-full shrink-0 ${isDarkText ? 'bg-[#111111]/40' : 'bg-[#FFF]/40'}`} />
          <NavLink href="/resources" isDarkText={isDarkText}>Resources</NavLink>
        </nav>

        {/* 우측 영역 (상담 버튼) : 모바일/태블릿에서는 플로팅 버튼이 항상 대신 노출되므로 데스크톱 전용 */}
        <div className="flex-1 hidden lg:flex justify-end items-center">
          {/* CONTACT US (기본 블랙 버튼, 텍스트 롤링, 동그라미 표식) */}
          <button
            onClick={onOpenContact}
            className="relative overflow-hidden group bg-[#2A2B2D] border border-[#2A2B2D] rounded-full px-6 py-3 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7] z-10 flex items-center justify-center min-w-[170px]"
          >
            <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center w-full">
              <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
                상담 및 파트너십 문의
              </span>
              <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
                상담 및 파트너십 문의
              </span>
            </div>
            <div className="flex items-center justify-center w-1.5 h-1.5 ml-3 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full border border-[#F9F9F7] block transition-all duration-300 group-hover:w-1 group-hover:h-1 group-hover:bg-[#F9F9F7]" />
            </div>
          </button>
        </div>
      </header>

      {/* 2. 플로팅 둥근 헤더 (스크롤 시 우측 상단에 Mask Slide-up Reveal) */}
      <AnimatePresence>
        {showFloatingPills && (
          /* 마스크 역할을 하는 overflow-hidden 컨테이너 (투명도 조절 없음) */
          <div className="fixed top-4 right-4 md:top-6 md:right-12 z-50 overflow-hidden py-1 px-1 h-[52px] md:h-[60px] flex items-center">
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="flex items-center space-x-2 md:space-x-3"
            >
              {/* CONTACT US (1번 헤더와 완벽히 동일한 크기/스타일) */}
              <button
                onClick={onOpenContact}
                className="relative overflow-hidden group bg-[#2A2B2D] border border-[#2A2B2D] rounded-full px-4 py-2.5 text-[10px] md:px-6 md:py-3 md:text-xs font-semibold tracking-widest uppercase text-[#F9F9F7] z-10 flex items-center justify-center min-w-[124px] md:min-w-[170px]"
              >
                <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center w-full">
                  <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#F9F9F7]">
                    상담 및 파트너십 문의
                  </span>
                  <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#F9F9F7] left-0 right-0">
                    상담 및 파트너십 문의
                  </span>
                </div>
                <div className="flex items-center justify-center w-1.5 h-1.5 ml-2 md:ml-3 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#F9F9F7] block transition-all duration-300 group-hover:w-1 group-hover:h-1 group-hover:bg-[#F9F9F7]" />
                </div>
              </button>

              {/* MENU 버튼 (1번 헤더와 완벽히 동일한 크기/스타일) */}
              <button
                onClick={onOpenMenu}
                className="relative overflow-hidden group bg-[#EBEBE9] border border-[#EBEBE9] rounded-full px-4 py-2.5 text-[10px] md:px-6 md:py-3 md:text-xs font-semibold tracking-widest uppercase text-[#111111] z-10 flex items-center justify-center min-w-[68px] md:min-w-[100px] shadow-sm"
              >
                <div className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px] text-center w-full">
                  <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block text-[#111111]">
                    MENU
                  </span>
                  <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full text-[#111111] left-0 right-0">
                    MENU
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
