'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useAnimate } from 'framer-motion';
import SplitType from 'split-type';
import React from 'react';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  colorWipe?: boolean;
  /** 지정하면 자체 스크롤 감지 대신 이 값을 트리거로 사용 (다른 요소의 리빌 직후로 이어붙일 때) */
  externalInView?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function RevealText({
  children,
  className = '',
  delay = 0,
  once = true,
  colorWipe = false,
  externalInView,
  as: Component = 'p'
}: RevealTextProps) {
  const [scope, animate] = useAnimate();
  const detectedInView = useInView(scope, { once, margin: "-8% 0px" });
  const isInView = externalInView !== undefined ? externalInView : detectedInView;
  const splitRef = useRef<SplitType | null>(null);
  // 폰트 로딩(document.fonts.ready)이 끝나 분할이 실제로 완료됐는지 여부.
  // isInView가 분할 완료보다 먼저 true가 되면 리빌 대상 요소가 아직 없어 애니메이션이 아예 안 걸리는
  // 경쟁 조건이 있었음 — 이 상태를 별도로 추적해서 둘 다 준비됐을 때 리빌이 걸리도록 함.
  const [isSplitReady, setIsSplitReady] = useState(false);

  useEffect(() => {
    if (!scope.current) return;

    let isMounted = true;

    // 커스텀 폰트 로드 완료 후 분할하여 어색한 줄바꿈 방지
    document.fonts.ready.then(() => {
      if (!isMounted || !scope.current) return;

      // split-type을 사용하여 텍스트를 자동 라인 분할 및 마스킹 처리
      splitRef.current = new SplitType(scope.current, {
        types: 'lines,words',
        lineClass: 'split-line block overflow-hidden relative',
        wordClass: 'split-word origin-left inline-block' // 'block' 중복 제거
      });

      // FOUC 방지: 렌더링 즉시 105% 밑으로 숨기고 1.5도 회전
      const words = scope.current.querySelectorAll('.split-word');
      words.forEach((w: Element) => {
        (w as HTMLElement).style.transform = 'translateY(105%) rotate(1.5deg)';
      });

      setIsSplitReady(true);
    });

    return () => {
      isMounted = false;
      if (splitRef.current) splitRef.current.revert();
    };
  }, [scope, colorWipe]);

  useEffect(() => {
    if (isInView && isSplitReady && scope.current) {
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
    
    // 리사이즈 시 라인 재계산
    // split()이 .split-word를 전부 새로 만들기 때문에, 재분할 직후 현재 리빌 상태에 맞는
    // 트랜스폼을 다시 걸어주지 않으면 새 단어들이 숨김 처리 없이 그대로 노출되어 버림
    const handleResize = () => {
      if (splitRef.current) {
        splitRef.current.split({});
        const words = scope.current?.querySelectorAll('.split-word');
        words?.forEach((w: Element) => {
          (w as HTMLElement).style.transform = isInView
            ? 'translateY(0%) rotate(0deg)'
            : 'translateY(105%) rotate(1.5deg)';
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isInView, isSplitReady, scope, animate, delay, colorWipe]);

  return (
    // 분할+숨김 처리가 끝나기 전까지는 래퍼 자체를 감춰서, 원문 텍스트가 마스킹 없이
    // 먼저 노출됐다가 뒤늦게 숨겨지는 FOUC(깜빡임)를 원천 차단
    <Component
      ref={scope}
      style={{ visibility: isSplitReady ? undefined : 'hidden' }}
      className={`relative block ${className}`}
    >
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
