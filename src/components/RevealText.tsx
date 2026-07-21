'use client';

import { useEffect, useRef } from 'react';
import { useInView, useAnimate } from 'framer-motion';
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

// SplitType 대체 커스텀 분할기.
// SplitType은 lines 분할 시 단어 사이 공백을 제거하고, 이 환경(React 하이드레이션 + <br/>)에서
// 줄 그룹핑이 깨지는 문제가 있어 직접 구현: 공백을 텍스트 노드로 보존하고,
// 모든 단어의 offsetTop을 먼저 측정한 뒤 같은 행끼리 줄 div로 묶는다.
function splitIntoLines(el: HTMLElement) {
  // 1) 텍스트 노드를 단어 span + 공백 텍스트 노드로 분해 (<br>은 강제 줄바꿈 마커로 유지)
  const frag = document.createDocumentFragment();
  const wordEls: HTMLElement[] = [];

  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent || '').split(/(\s+)/);
      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '));
        } else {
          const w = document.createElement('span');
          w.className = 'split-word origin-left inline-block';
          w.style.display = 'inline-block';
          w.textContent = part;
          frag.appendChild(w);
          wordEls.push(w);
        }
      });
    } else if ((node as HTMLElement).tagName === 'BR') {
      frag.appendChild(document.createElement('br'));
    } else {
      frag.appendChild(node.cloneNode(true));
    }
  });

  el.replaceChildren(frag);

  // 2) 이동시키기 전에 전체 단어의 행 위치(offsetTop)를 한 번에 측정
  //    (하나씩 옮기면서 재측정하면 리플로우로 값이 어긋남)
  const tops = new Map<HTMLElement, number>();
  wordEls.forEach((w) => tops.set(w, w.offsetTop));

  // 3) 같은 행의 단어(+사이 공백)를 줄 div로 그룹핑. <br>은 강제 줄바꿈.
  const lines: HTMLElement[] = [];
  let current: HTMLElement | null = null;
  let currentTop: number | null = null;

  const newLine = () => {
    const d = document.createElement('div');
    d.className = 'split-line block overflow-hidden relative';
    lines.push(d);
    return d;
  };

  Array.from(el.childNodes).forEach((node) => {
    if ((node as HTMLElement).tagName === 'BR') {
      // 강제 줄바꿈: 다음 단어부터 새 줄 (br 자체는 버림 — 줄 div가 block이라 자동 개행)
      current = null;
      currentTop = null;
      node.remove();
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      // 공백은 현재 줄 끝에 붙임 (줄 시작 전이면 무의미하므로 버림)
      if (current) current.appendChild(node);
      else node.remove();
      return;
    }
    const w = node as HTMLElement;
    const top = tops.get(w) ?? 0;
    if (current === null || currentTop === null || Math.abs(top - currentTop) > 1) {
      current = newLine();
      currentTop = top;
    }
    current.appendChild(w);
  });

  el.replaceChildren(...lines);
  return { words: wordEls, lines };
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

  // ⚠️ 분할 완료 여부를 state로 두면 setState → 리렌더 → React가 분할된 DOM을 재조정하며
  // 구조가 깨질 수 있으므로 반드시 ref + 명령형 DOM 조작으로만 처리 (리렌더 유발 금지)
  const originalHTMLRef = useRef<string | null>(null);
  const isSplitReadyRef = useRef(false);
  const hasRevealedRef = useRef(false);
  const isInViewRef = useRef(false);
  isInViewRef.current = isInView;

  const runReveal = () => {
    if (!scope.current || hasRevealedRef.current) return;
    hasRevealedRef.current = true;

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
        if (colorWipe) {
          Array.from(words).forEach((word, wIndex) => {
            animate(word, { color: "#036CC5" }, {
              duration: 0.4,
              ease: "easeOut",
              delay: lineDelay + 0.3 + (wIndex * 0.03)
            });
          });
        }
      }
    });
  };

  const runRevealRef = useRef(runReveal);
  runRevealRef.current = runReveal;

  const hideWords = (el: HTMLElement, hidden: boolean) => {
    el.querySelectorAll('.split-word').forEach((w) => {
      (w as HTMLElement).style.transform = hidden
        ? 'translateY(105%) rotate(1.5deg)'
        : 'translateY(0%) rotate(0deg)';
    });
  };

  useEffect(() => {
    if (!scope.current) return;

    let isMounted = true;
    let fontsReady = false;
    let lastSplitWidth = 0;
    originalHTMLRef.current = scope.current.innerHTML;

    // 분할 실행: 폭이 0이면(백그라운드 탭 등 미레이아웃 상태) 건너뛰고,
    // ResizeObserver가 폭이 생기는 순간 다시 시도한다 — 0폭에서 분할하면 전 단어가 세로로 쪼개짐
    const attemptSplit = () => {
      if (!isMounted || !scope.current || !fontsReady) return;
      const width = scope.current.clientWidth;
      if (width === 0) return;

      const alreadySplit = isSplitReadyRef.current;
      if (alreadySplit && width === lastSplitWidth) return; // 폭 변화 없으면 재분할 불필요

      if (alreadySplit && originalHTMLRef.current !== null) {
        scope.current.innerHTML = originalHTMLRef.current; // 재분할: 원본 복원 후 다시
      }
      splitIntoLines(scope.current);
      lastSplitWidth = width;

      // FOUC 방지: 분할 직후 숨김 (이미 리빌된 상태면 보이는 위치로)
      hideWords(scope.current, !hasRevealedRef.current);

      // 분할·숨김이 끝난 뒤에야 래퍼를 노출 (그 전까지는 원문이 마스킹 없이 보이는 FOUC 차단)
      scope.current.style.visibility = 'visible';
      isSplitReadyRef.current = true;

      // 분할 완료 전에 이미 뷰포트에 들어와 있었다면 즉시 리빌 (경쟁 조건 해소)
      if (isInViewRef.current) runRevealRef.current();
    };

    // 커스텀 폰트 로드 완료 후 분할하여 어색한 줄바꿈 방지
    document.fonts.ready.then(() => {
      fontsReady = true;
      attemptSplit();
    });

    // 요소 폭 변화 감지: 최초 레이아웃 확보 시 분할, 이후 리사이즈 시 재분할
    const ro = new ResizeObserver(() => attemptSplit());
    ro.observe(scope.current);

    return () => {
      isMounted = false;
      ro.disconnect();
      // 원본 복원 (StrictMode 재마운트 대비)
      if (scope.current && originalHTMLRef.current !== null) {
        scope.current.innerHTML = originalHTMLRef.current;
        isSplitReadyRef.current = false;
        hasRevealedRef.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope]);

  useEffect(() => {
    if (isInView && isSplitReadyRef.current) {
      runRevealRef.current();
    }
  }, [isInView]);

  return (
    // 분할+숨김 처리가 끝나기 전까지는 래퍼를 감춰서 FOUC 차단.
    // visibility 해제는 이펙트에서 명령형으로 처리 (state로 하면 리렌더로 분할 DOM이 깨짐)
    <Component
      ref={scope}
      style={{ visibility: 'hidden' }}
      className={`relative block ${className}`}
    >
      {/* \n 문자를 <br/>로 치환하여 디자이너의 의도적인 강제 줄바꿈을 인식하게 함 */}
      {children.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i !== arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Component>
  );
}
