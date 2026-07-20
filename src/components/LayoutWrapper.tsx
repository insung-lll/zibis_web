'use client';

import { ReactNode, useState } from 'react';
import SmoothScroll from './SmoothScroll';
import Preloader from './Preloader';
import Header from './Header';
import MenuOverlay from './MenuOverlay';
import ContactModal from './ContactModal';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* 프리로더 로딩 애니메이션 */}
      <Preloader />

      {/* 스크롤 반응형 헤더 네비게이션 */}
      <Header 
        onOpenMenu={() => setIsMenuOpen(true)} 
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* 전체 화면 메뉴 오버레이 */}
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* 8단계 문의 폼 모달 */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* 메인 콘텐츠 영역 (패럴랙스 등의 원활한 레이아웃을 위해 상단 패딩 제거) */}
      <main className="flex flex-col min-h-screen">
        {children}
      </main>
    </SmoothScroll>
  );
}
