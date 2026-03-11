"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// 별똥별: 우상단 → 좌하단, rotate 145° 고정
const SHOOTING_STARS = [
  { left: "84%", top: "8%",  delay: 0.08, duration: 0.82, length: 150 },
  { left: "93%", top: "20%", delay: 0.28, duration: 0.90, length: 115 },
];

export default function Template({ children }: { children: React.ReactNode }) {
  // 반짝이는 배경 별 — 중앙 영역에 집중해 모바일에서도 잘 보임
  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${20 + ((i * 17) % 60)}%`,
        top:  `${10 + ((i * 19) % 65)}%`,
        size: i % 3 === 0 ? 3 : 2,
        delay: (i % 5) * 0.14,
      })),
    []
  );

  return (
    <>
      {/* ① 어두운 밤하늘 오버레이 — blur 없이 단순하게 */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[200]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(30,58,138,0.12), rgba(2,6,23,0.88) 40%, rgba(2,6,23,0.98) 100%)",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ② 반짝이는 별 */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="fixed rounded-full pointer-events-none z-[201]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 7px rgba(255,255,255,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.8, 0.25, 0], scale: [0.4, 1, 0.7, 0.4] }}
          transition={{ duration: 1.4, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ③ 중앙 글로우 */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[202]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 38%, rgba(147,197,253,0.10), transparent 70%)",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ④ 별똥별 — 등속에 가까운 linear로 자연스러운 궤적 */}
      {SHOOTING_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[203]"
          style={{
            left: star.left,
            top: star.top,
            width: star.length,
            height: 2,
            borderRadius: 9999,
            background:
              "linear-gradient(to right, transparent, rgba(191,219,254,0.4), rgba(255,255,255,0.95))",
            boxShadow: "0 0 8px rgba(191,219,254,0.3), 0 0 14px rgba(147,197,253,0.15)",
            rotate: 145,
            transformOrigin: "right center",
          }}
          initial={{ x: 20, y: -10, opacity: 0 }}
          animate={{
            x: -440,
            y: 252,
            opacity: [0, 1, 0.95, 0],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "linear",
            opacity: {
              ease: "easeInOut",
              times: [0, 0.08, 0.72, 1],
              duration: star.duration,
            },
          }}
        />
      ))}

      {/* ⑤ 컨텐츠 — 오버레이와 타이밍 맞춰 자연스럽게 등장 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
