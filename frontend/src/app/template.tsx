"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTheme } from "@/components/ThemeProvider";

// 유성 — 대각선으로 스쳐 지나감
const SHOOTING_STARS = [
  { left: "78%", top: "6%",  delay: 0.05, duration: 0.75, length: 160 },
  { left: "90%", top: "22%", delay: 0.22, duration: 0.85, length: 110 },
  { left: "60%", top: "3%",  delay: 0.38, duration: 0.65, length: 130 },
];

export default function Template({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  // 별 반짝임 — 화면 곳곳에 산재
  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${8 + ((i * 23) % 84)}%`,
        top:  `${5 + ((i * 17) % 80)}%`,
        size: i % 4 === 0 ? 3 : i % 3 === 0 ? 2.5 : 2,
        delay: (i % 6) * 0.07,
        brightness: i % 3 === 0 ? 1 : 0.65,
      })),
    []
  );

  // ── Highjump: 아래에서 살짝 튀어오르며 등장 ─────────────────────────────────
  if (theme === "highjump") {
    return (
      <>
        {/* 콘텐츠: 아래서 점프하듯 올라옴 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.34, 1.56, 0.64, 1], // 살짝 오버슈트하는 스프링감
          }}
        >
          {children}
        </motion.div>
      </>
    );
  }

  // ── Midnight: 별똥별 쏟아지는 밤하늘에서 내려오듯 등장 ──────────────────────
  return (
    <>
      {/* 별 반짝임 — 화면에 퍼져 있다가 사라짐 */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="fixed rounded-full pointer-events-none z-[10]"
          style={{
            left: s.left,
            top:  s.top,
            width:  s.size,
            height: s.size,
            background: `rgba(255,255,255,${s.brightness})`,
            boxShadow: `0 0 ${s.size * 3}px rgba(191,219,254,0.5)`,
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, s.brightness, s.brightness * 0.4, 0], scale: [0.3, 1, 0.8, 0.3] }}
          transition={{ duration: 1.1, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {/* 유성 — 비스듬히 스쳐 지나감 */}
      {SHOOTING_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[11]"
          style={{
            left: star.left,
            top:  star.top,
            width:  star.length,
            height: 1.5,
            borderRadius: 9999,
            background:
              "linear-gradient(to right, transparent, rgba(147,197,253,0.35), rgba(255,255,255,0.9))",
            boxShadow: "0 0 6px rgba(191,219,254,0.4)",
            rotate: 148,
            transformOrigin: "right center",
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: -500, y: 295, opacity: [0, 1, 0.9, 0] }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "linear",
            opacity: { ease: "easeInOut", times: [0, 0.06, 0.75, 1], duration: star.duration },
          }}
        />
      ))}

      {/* 콘텐츠: 위에서 살짝 내려오듯 (밤하늘에서 착지하는 느낌) */}
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
