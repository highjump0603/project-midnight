"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TransitionTarget = "midnight" | "highjump";

interface SiteTransitionCtx {
  trigger: (url: string, target: TransitionTarget) => void;
}

const Ctx = createContext<SiteTransitionCtx>({ trigger: () => {} });

export const useSiteTransition = () => useContext(Ctx);

export default function SiteTransitionProvider({ children }: { children: React.ReactNode }) {
  const [overlay, setOverlay] = useState<{ active: boolean; target: TransitionTarget }>({
    active: false,
    target: "highjump",
  });
  const urlRef = useRef("");

  const trigger = useCallback((url: string, target: TransitionTarget) => {
    urlRef.current = url;
    setOverlay({ active: true, target });
  }, []);

  const navigate = () => {
    window.location.href = urlRef.current;
  };

  const isMidnight = overlay.target === "midnight";

  return (
    <Ctx.Provider value={{ trigger }}>
      {children}
      <AnimatePresence>
        {overlay.active && (
          // 패널 없이 대상 사이트 배경색으로 부드럽게 페이드
          <motion.div
            key="site-exit-overlay"
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              background: isMidnight
                ? "linear-gradient(160deg, #020617 0%, #0f172a 55%, #020617 100%)"
                : "#f8fafc",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={navigate}
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
