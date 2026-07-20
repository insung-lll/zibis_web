'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 전역 스크롤 위치 디버그 또는 타 컴포넌트에서 참조할 수 있도록 window 객체에 추가
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
