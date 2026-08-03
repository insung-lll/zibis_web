'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import RevealText from '@/components/RevealText';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

// 러버밴드(고무줄) 오버스크롤 튜닝값 — iOS 스타일: 당길수록 저항이 점점 세져서 MAX값엔 점근만 함(벽에 부딪히지 않음)
const RUBBER_BAND_MAX = 70; // 시각적으로 당겨지는 최대 픽셀
const RUBBER_BAND_CONST = 0.55; // 저항 강도 (클수록 빨리 뻑뻑해짐)
const RUBBER_BAND_RELEASE_DELAY = 70; // 휠 입력이 멈췄다고 판단하는 시간(ms)

// 당긴 원시 거리(raw)를 점근적으로 감쇠시켜 실제 표시 오프셋으로 변환
function dampRubberBand(raw: number) {
  const sign = Math.sign(raw);
  const abs = Math.abs(raw);
  return sign * (1 - 1 / (abs * RUBBER_BAND_CONST / RUBBER_BAND_MAX + 1)) * RUBBER_BAND_MAX;
}

export default function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const overscrollX = useMotionValue(0);
  const rawPull = useRef(0); // 감쇠 전 누적 당김량

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let releaseTimer: ReturnType<typeof setTimeout> | null = null;

    const releaseRubberBand = (fast = false) => {
      rawPull.current = 0;
      // 바운스 없는 이즈아웃 트윈으로 즉시 원위치 복귀 (자연스러운 감속)
      animate(overscrollX, 0, fast
        ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      );
    };

    const handleWheel = (e: WheelEvent) => {
      // 수직 휠 움직임이 있는 경우에만 가로 스크롤로 변환
      // 가로 스크롤(트랙패드 좌우 스와이프)인 경우 기본 동작 허용
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const atStart = container.scrollLeft <= 0;
        const atEnd = container.scrollLeft >= maxScrollLeft - 1;

        if ((atEnd && e.deltaY > 0) || (atStart && e.deltaY < 0)) {
          // 트랙패드에서 손을 떼었을 때 발생하는 미세한 관성(momentum) 스크롤 무시하고 즉시 복귀 (임계값 높임)
          if (Math.abs(e.deltaY) < 15) {
            if (releaseTimer) clearTimeout(releaseTimer);
            if (overscrollX.get() !== 0) releaseRubberBand(true);
            return;
          }

          // 스크롤 끝에서 계속 밀면 고무줄처럼 저항감 있게 살짝 딸려옴
          // set()으로 즉시 점프시키지 않고 짧은 이즈아웃 트윈으로 보간해 부드럽게 당겨지도록 함
          rawPull.current -= e.deltaY;
          const target = dampRubberBand(rawPull.current);
          animate(overscrollX, target, { duration: 0.25, ease: [0.25, 1, 0.5, 1] });

          if (releaseTimer) clearTimeout(releaseTimer);
          releaseTimer = setTimeout(() => releaseRubberBand(false), RUBBER_BAND_RELEASE_DELAY);
        } else {
          if (releaseTimer) clearTimeout(releaseTimer);
          if (overscrollX.get() !== 0) releaseRubberBand(true);
          container.scrollLeft += e.deltaY;
        }
      }
    };

    const handleScroll = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (maxScrollLeft > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((container.scrollLeft / maxScrollLeft) * 100)));
        setScrollPercent(percent);
      } else {
        setScrollPercent(0);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 퍼센티지 계산
    handleScroll();

    return () => {
      if (releaseTimer) clearTimeout(releaseTimer);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [overscrollX]);

  const allProjects = [
    {
      title: "신촌 아이파크",
      category: "@HOMELUDENCE",
      year: "2026",
      imageSrc: "/img/projects/homeludence_1.jpg",
      hoverImageSrc: "/img/projects/homeludence_2.jpg",
      colorClass: "bg-[#2A2B2D]",
      aspect: "aspect-[3/4]" as const,
      width: "w-[18vw] min-w-[250px] max-w-[300px]"
    },
    {
      title: "PROJECT 02",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#3D3A38]",
      aspect: "aspect-[16/10]" as const,
      width: "w-[26vw] min-w-[360px] max-w-[440px]"
    },
    {
      title: "PROJECT 03",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#1E2124]",
      aspect: "aspect-[3/4]" as const,
      width: "w-[18vw] min-w-[250px] max-w-[300px]"
    },
    {
      title: "PROJECT 04",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#2F2E2C]",
      aspect: "aspect-[16/10]" as const,
      width: "w-[26vw] min-w-[360px] max-w-[440px]"
    },
    {
      title: "PROJECT 05",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#2E3135]",
      aspect: "aspect-[3/4]" as const,
      width: "w-[18vw] min-w-[250px] max-w-[300px]"
    },
    {
      title: "PROJECT 06",
      category: "UPCOMING PROJECT",
      year: "2026",
      colorClass: "bg-[#232426]",
      aspect: "aspect-[16/10]" as const,
      width: "w-[26vw] min-w-[360px] max-w-[440px]"
    }
  ];

  return (
    <>
      {/* 데스크톱: 가로 스크롤 인터랙션 (전체 페이지 높이를 화면에 고정시켜 상하 튕김 차단) */}
      <div className="hidden md:block fixed inset-0 w-full h-[100dvh] bg-[#F9F9F7] text-[#111111] overflow-hidden">

        {/* 가로 스크롤 컨테이너: 기본 스크롤바 숨김 처리 */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-x-auto overflow-y-hidden flex flex-col justify-center pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >

          {/* 프로젝트 리스트가 가로로 나열되는 내부 영역 (w-max로 콘텐츠 너비 확보) */}
          {/* overscrollX: 스크롤 끝에서의 러버밴드 효과를 위한 별도 트랜스폼 레이어 */}
          <motion.div style={{ x: overscrollX }} className="flex items-end space-x-6 pl-12 md:pl-24 pr-5 h-[60vh] w-max">
            {allProjects.map((project, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 ${project.width}`}
              >
                <Link href={`/projects/${idx + 1}`} className="block w-full">
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    year={project.year}
                    imageSrc={project.imageSrc}
                    hoverImageSrc={project.hoverImageSrc}
                    disableHoverSlide={true}
                    colorClass={project.colorClass}
                    aspect={project.aspect}
                  />
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 하단 고정 인디케이터 및 대형 타이틀 바 */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 md:px-12 md:pb-12 z-20 flex justify-between items-end bg-transparent pointer-events-none select-none">

          <div className="pointer-events-auto">
            <RevealText as="h2" delay={0.3} className="text-8xl md:text-[7rem] font-bold tracking-tighter leading-none text-[#111111] uppercase select-none pr-2 md:pr-4">
              Projects
            </RevealText>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-[#111111] uppercase pb-2 md:pb-4 pointer-events-auto flex items-end">
            SCROLL TO EXPLORE ({scrollPercent.toString().padStart(2, '0')}%)
          </div>

          <div className="flex flex-col items-end space-y-1.5 pb-2 md:pb-4 text-[10px] font-semibold tracking-widest uppercase pointer-events-auto text-[#111111]/70">
            <a href="#" className="hover:text-[#111111] transition">IN PROGRESS ↗</a>
            <a href="#" className="hover:text-[#111111] transition">ARCHIVE ↗</a>
          </div>

        </div>
      </div>

      {/* 모바일: 일반적인 세로 스크롤, 카드가 폭을 꽉 채우며 아래로 쌓이는 방식 */}
      <div className="md:hidden w-full min-h-screen bg-[#F9F9F7] text-[#111111] px-6 pt-28 pb-20">
        <h2 className="text-5xl font-bold tracking-tighter leading-none text-[#111111] uppercase select-none mb-12">
          Projects
        </h2>

        <div className="flex flex-col space-y-14">
          {allProjects.map((project, idx) => (
            <div key={idx} className="w-full">
              <Link href={`/projects/${idx + 1}`} className="block w-full">
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  year={project.year}
                  imageSrc={project.imageSrc}
                  hoverImageSrc={project.hoverImageSrc}
                  disableHoverSlide={true}
                  colorClass={project.colorClass}
                  aspect={project.aspect}
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-2 pt-14 text-[10px] font-semibold tracking-widest uppercase text-[#111111]/70">
          <a href="#" className="hover:text-[#111111] transition">IN PROGRESS ↗</a>
          <a href="#" className="hover:text-[#111111] transition">ARCHIVE ↗</a>
        </div>
      </div>
    </>
  );
}
