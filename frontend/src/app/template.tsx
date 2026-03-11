"use client";

import { motion } from "framer-motion";

// 별똥별 목록 — 우상단에서 좌하단 방향으로 흐름
const SHOOTING_STARS = [
  { left: "88%", top: "6%",  delay: 0.02, duration: 0.55, length: 160 },
  { left: "70%", top: "3%",  delay: 0.15, duration: 0.50, length: 130 },
  { left: "95%", top: "22%", delay: 0.08, duration: 0.58, length: 145 },
  { left: "78%", top: "32%", delay: 0.26, duration: 0.48, length: 105 },
  { left: "60%", top: "13%", delay: 0.18, duration: 0.52, length: 120 },
];

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 어두운 밤하늘 배경 */}
      <motion.div
        className="fixed inset-0 bg-midnight-950 pointer-events-none z-[200]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.38, duration: 0.45, ease: "easeOut" }}
      />

      {/* 별똥별 */}
      {SHOOTING_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[201]"
          style={{
            left: star.left,
            top: star.top,
            width: star.length,
            height: 2,
            borderRadius: 9999,
            // 꼬리(왼쪽) → 머리(오른쪽, 밝음), 이동 방향에 맞춰 rotate 153°
            background:
              "linear-gradient(to right, transparent, rgba(147,197,253,0.4), rgba(255,255,255,0.95))",
            boxShadow: "0 0 8px 2px rgba(147,197,253,0.35)",
            rotate: 153,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: -520,
            y: 270,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "easeIn",
            opacity: { times: [0, 0.05, 0.75, 1] },
          }}
        />
      ))}

      {/* 페이지 컨텐츠 — 어둠이 걷힐 때 함께 나타남 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
