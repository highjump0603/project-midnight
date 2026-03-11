"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTheme } from "@/components/ThemeProvider";

// Midnight: shooting stars
const SHOOTING_STARS = [
  { left: "84%", top: "8%", delay: 0.08, duration: 0.82, length: 150 },
  { left: "93%", top: "20%", delay: 0.28, duration: 0.90, length: 115 },
];

// Highjump: rising dots
const RISING_DOTS = [
  { left: "18%", color: "#3B5BDB", delay: 0, size: 6 },
  { left: "34%", color: "#F97316", delay: 0.08, size: 4 },
  { left: "52%", color: "#6366F1", delay: 0.04, size: 5 },
  { left: "68%", color: "#3B5BDB", delay: 0.12, size: 4 },
  { left: "83%", color: "#F97316", delay: 0.03, size: 6 },
];

export default function Template({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${20 + ((i * 17) % 60)}%`,
        top: `${10 + ((i * 19) % 65)}%`,
        size: i % 3 === 0 ? 3 : 2,
        delay: (i % 5) * 0.14,
      })),
    []
  );

  if (theme === "highjump") {
    return (
      <>
        {/* White overlay fade */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-[200]"
          style={{ background: "rgba(248, 250, 252, 0.97)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Rising dots */}
        {RISING_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            className="fixed pointer-events-none z-[201] rounded-full"
            style={{
              left: dot.left,
              bottom: "38%",
              width: dot.size,
              height: dot.size,
              background: dot.color,
              boxShadow: `0 0 10px ${dot.color}88`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -90, opacity: [0, 0.9, 0] }}
            transition={{
              delay: dot.delay,
              duration: 0.75,
              ease: "easeOut",
              opacity: { times: [0, 0.2, 1], duration: 0.75 },
            }}
          />
        ))}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </>
    );
  }

  // Midnight theme (original)
  return (
    <>
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
          animate={{ x: -440, y: 252, opacity: [0, 1, 0.95, 0] }}
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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
