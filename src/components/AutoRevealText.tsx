'use client';

import { useEffect, useRef } from 'react';
import { useInView, useAnimate } from 'framer-motion';
import SplitType from 'split-type';

interface AutoRevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function AutoRevealText({ 
  children, 
  className = '', 
  delay = 0, 
  as: Component = 'p'
}: AutoRevealTextProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-8% 0px" });
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!scope.current) return;

    // split-type을 사용하여 텍스트를 줄(line) 단위로 쪼갬.
    // masking(가리기) 효과를 위해 lines와 words를 둘 다 생성
    splitRef.current = new SplitType(scope.current, { 
      types: 'lines,words', 
      lineClass: 'split-line overflow-hidden relative leading-[1.3] py-[0.1em]', 
      wordClass: 'split-word origin-left inline-block' 
    });

    // FOUC 방지: 즉시 105% 밑으로 숨기고 1.5도 회전시켜 둠
    const words = scope.current.querySelectorAll('.split-word');
    words.forEach((w: Element) => {
      (w as HTMLElement).style.transform = 'translateY(105%) rotate(1.5deg)';
    });

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [scope]);

  useEffect(() => {
    if (isInView && scope.current) {
      const lines = scope.current.querySelectorAll('.split-line');
      
      lines.forEach((line: Element, index: number) => {
        const words = line.querySelectorAll('.split-word');
        if (words.length > 0) {
          // 각 라인별로 시차(stagger)를 두어 애니메이션 실행
          animate(Array.from(words), { y: '0%', rotate: 0 }, { 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1], // 부드러운 cubic-bezier 감속
            delay: delay + (index * 0.12)
          });
        }
      });
    }
  }, [isInView, scope, animate, delay]);

  return (
    <Component ref={scope} className={`block ${className}`}>
      {children}
    </Component>
  );
}
