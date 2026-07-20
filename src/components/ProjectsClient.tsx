'use client';

import { useRef, useState, useEffect } from 'react';
import RevealText from '@/components/RevealText';

export default function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // 수직 휠 움직임이 있는 경우에만 가로 스크롤로 변환
      // 가로 스크롤(트랙패드 좌우 스와이프)인 경우 기본 동작 허용
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
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
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const allProjects = [
    {
      title: "OH OFFICE",
      colorClass: "bg-[#2A2B2D]",
      aspect: "aspect-[1.5]", // 가로형
      width: "w-[22.5vw] min-w-[220px]"
    },
    {
      title: "MYRTLE POOL HOUSE",
      colorClass: "bg-[#3D3A38]",
      aspect: "aspect-[0.7]", // 세로형
      width: "w-[16vw] min-w-[160px]"
    },
    {
      title: "LOWER BOWEN",
      colorClass: "bg-[#1E2124]",
      aspect: "aspect-[1.4]", // 가로형
      width: "w-[21vw] min-w-[210px]"
    },
    {
      title: "JALOURA GUEST HOUSE",
      colorClass: "bg-[#2F2E2C]",
      aspect: "aspect-[0.75]", // 세로형
      width: "w-[17.5vw] min-w-[170px]"
    },
    {
      title: "JALOURA MAIN HOUSE",
      colorClass: "bg-[#2E3135]",
      aspect: "aspect-[1.3]", // 가로형
      width: "w-[19vw] min-w-[190px]"
    },
    {
      title: "RUNIC",
      colorClass: "bg-[#232426]",
      aspect: "aspect-[0.7]", // 세로형
      width: "w-[16vw] min-w-[160px]"
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
          <div className="flex items-end space-x-4 pl-12 md:pl-24 pr-5 h-[60vh] w-max">
            {allProjects.map((project, idx) => (
              <div key={idx} className={`flex-shrink-0 flex flex-col space-y-4 ${project.width}`}>

                <div className={`relative overflow-hidden ${project.colorClass} ${project.aspect} w-full`}>
                  <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]">
                  {project.title}
                </span>

              </div>
            ))}
          </div>
        </div>

        {/* 하단 고정 인디케이터 및 대형 타이틀 바 */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 md:px-12 md:pb-12 z-20 flex justify-between items-end bg-transparent pointer-events-none select-none">

          <div className="pointer-events-auto">
            <RevealText as="h2" delay={0.3} className="text-8xl md:text-[7rem] font-bold tracking-tighter leading-[0.8] text-[#111111] uppercase select-none pr-2 md:pr-4">
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
        <h2 className="text-5xl font-bold tracking-tighter leading-[0.9] text-[#111111] uppercase select-none mb-12">
          Projects
        </h2>

        <div className="flex flex-col space-y-14">
          {allProjects.map((project, idx) => (
            <div key={idx} className="flex flex-col space-y-4 w-full">
              <div className={`relative overflow-hidden ${project.colorClass} ${project.aspect} w-full`} />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]">
                {project.title}
              </span>
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
