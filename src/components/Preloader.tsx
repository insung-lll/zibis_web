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

          <div className="absolute bottom-16 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none" className="animate-spin duration-1000">
              <path 
                d="M-4.37114e-07 10C-6.59372e-07 15.0847 4.02846 19.4286 9.00166 19.948C9.55096 20.0054 10 19.5523 10 19V19C10 18.4477 9.54999 18.0067 9.00237 17.935C5.11573 17.4265 2 13.9999 2 10C2 5.663 5.663 2 10 2C13.9999 2 17.4265 5.11573 17.935 9.00237C18.0067 9.54999 18.4477 10 19 10V10C19.5523 10 20.0054 9.55096 19.948 9.00166C19.4285 4.02846 15.0837 -2.14896e-07 10 -4.37114e-07C4.579 -6.74073e-07 -2.00154e-07 4.579 -4.37114e-07 10Z" 
                fill="#FCFCFC" 
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
