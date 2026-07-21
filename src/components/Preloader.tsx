'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1회성 세션 체크 (원할 경우 설정 가능하지만 데모용으로 매번 1.8초 동안 노출)
    const timer = setTimeout(() => {
      setLoading(false);
      // Lenis 스크롤이 로딩 중 멈춰있다가 로딩 해제 시 풀리도록 설정
      if (document.documentElement.classList.contains('lenis-stopped')) {
        document.documentElement.classList.remove('lenis-stopped');
      }
    }, 1800);

    // 스크롤 방지용 클래스 추가
    document.documentElement.classList.add('lenis-stopped');

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as const } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111111] text-[#F9F9F7]"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="overflow-hidden text-5xl font-light tracking-[0.25em] uppercase flex">
              {['Z', 'I', 'B', 'I', 'S'].map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1] as const
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xs font-light tracking-widest text-[#F9F9F7]/80"
            >
              (Smart & Premium Space Planner)
            </motion.p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
