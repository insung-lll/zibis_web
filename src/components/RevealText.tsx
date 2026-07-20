'use client';

import { useEffect, useRef } from 'react';
import { useInView, useAnimate } from 'framer-motion';
import SplitType from 'split-type';
import React from 'react';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  colorWipe?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function RevealText({
  children,
  className = '',
  delay = 0,
  once = true,
  colorWipe = false,
  as: Component = 'p'
}: RevealTextProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once, margin: "-8% 0px" });
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!scope.current) return;

    // split-type을 사용하여 텍스트를 자동 라인 분할 및 마스킹 처리
    splitRef.current = new SplitType(scope.current, {
      types: 'lines,words',
      lineClass: 'split-line block overflow-hidden relative',
      wordClass: 'split-word block origin-left inline-block'
    });

    // FOUC 방지: 렌더링 즉시 105% 밑으로 숨기고 1.5도 회전
    const words = scope.current.querySelectorAll('.split-word');
    words.forEach((w: Element) => {
      (w as HTMLElement).style.transform = 'translateY(105%) rotate(1.5deg)';
    });

    return () => {
      if (splitRef.current) splitRef.current.revert();
    };
  }, [scope, colorWipe]);

  useEffect(() => {
    if (isInView && scope.current) {
      const lines = scope.current.querySelectorAll('.split-line');
      
      lines.forEach((line: Element, index: number) => {
        const words = line.querySelectorAll('.split-word');
        const lineDelay = delay + (index * 0.12);

        if (words.length > 0) {
          // 1. 단어들이 솟아오르는 마스킹 리빌 애니메이션
          animate(Array.from(words), { y: '0%', rotate: 0 }, {
            duration: 1.0,
            ease: [0.65, 0, 0.35, 1], // easeInOutCubic — 완만하게 가속했다가 감속하는 자연스러운 곡선
            delay: lineDelay
          });

          // 2. 컬러 와이프(Color Wipe) 애니메이션 (colorWipe prop이 true일 때만 실행)
          // Safari 렌더링 버그(background-clip과 transform 충돌)를 완벽하게 회피하기 위해,
          // CSS 그라디언트 대신 단어 단위의 컬러 스태거(Color Stagger) 기법으로 Wipe 효과를 구현합니다.
          if (colorWipe) {
            Array.from(words).forEach((word, wIndex) => {
              animate(word, { color: "#036CC5" }, {
                duration: 0.4,
                ease: "easeOut",
                delay: lineDelay + 0.3 + (wIndex * 0.03) // 단어별 순차적 딜레이로 물결(Sweep) 효과 연출
              });
            });
          }
        }
      });
    }
  }, [isInView, scope, animate, delay, colorWipe]);

  return (
    <Component ref={scope} className={`relative block ${className}`}>
      {/* \n 문자를 <br/>로 치환하여 split-type이 디자이너의 의도적인 강제 줄바꿈을 완벽히 인식하게 함 */}
      {children.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i !== arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Component>
  );
}
