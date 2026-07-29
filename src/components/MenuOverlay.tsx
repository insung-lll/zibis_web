'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function MenuOverlay({ isOpen, onClose, onOpenContact }: MenuOverlayProps) {
  const pathname = usePathname();

  const overlayVariants = {
    closed: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const containerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const linkVariants = {
    closed: { y: 100, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'B2B', href: '/b2b' },
    { name: 'lighting planner', href: '/lighting-planner' },
    { name: 'News', href: '/news' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <motion.div
      variants={overlayVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#111111] text-[#F9F9F7] px-6 py-6 md:px-12 md:py-10"
    >
      {/* 헤더 부분 */}
      <header className="flex items-center justify-between w-full">
        <Link href="/" onClick={onClose} className="invisible select-none hover:opacity-80 transition-opacity">
          <img src="/img/zibis_logo2.png" alt="ZIBIS" className="h-7 md:h-8 w-auto object-contain" />
        </Link>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="group relative hidden sm:inline-flex items-center pb-1 text-xs uppercase tracking-widest text-[#F9F9F7]"
          >
            <span className="relative z-10 h-[14px] overflow-hidden flex flex-col justify-start pointer-events-none select-none leading-[14px]">
              <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block">
                CONTACT US
              </span>
              <span className="transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full block absolute top-full left-0 right-0">
                CONTACT US
              </span>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F9F9F7] transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            onClick={onClose} 
            className="group flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#F9F9F7]/60 transition hover:text-[#F9F9F7]"
          >
            <X className="h-9 w-9 transition-transform group-hover:rotate-90" strokeWidth={1} />
          </button>
        </div>
      </header>

      {/* 중앙 메뉴 리스트 */}
      <motion.div 
        variants={containerVariants} 
        animate={isOpen ? 'open' : 'closed'}
        className="flex flex-col justify-center flex-grow max-w-4xl mx-auto w-full space-y-4 py-12"
      >
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <div key={index} className="overflow-hidden py-1">
              <motion.div variants={linkVariants}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group relative inline-flex items-center text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-none uppercase transition duration-300 ${
                    isActive ? 'text-[#F9F9F7]' : 'text-[#F9F9F7]/50 hover:text-[#F9F9F7]'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-3 block">
                    {item.name}
                  </span>
                  
                  {/* 데코 인덱스 넘버 */}
                  <span className="text-[10px] font-mono ml-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    (0{index + 1})
                  </span>

                  {/* 호버 시 배경에 나타나는 선 */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F9F9F7] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* 하단 정보 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full text-[10px] uppercase tracking-widest text-[#F9F9F7]/40 border-t border-[#F9F9F7]/10 pt-6">
        <div className="flex flex-col space-y-2 mb-4 sm:mb-0">
          <span>ZIBIS Smart & Premium Design Studio</span>
          <span>© 2026 ZIBIS. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9F9F7] transition">
            instagram
          </a>
          <Link href="/privacy-policy" className="hover:text-[#F9F9F7] transition">
            privacy policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-[#F9F9F7] transition">
            terms of service
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
