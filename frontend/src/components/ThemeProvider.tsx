"use client";

import { createContext, useContext } from "react";
import type { Theme } from "@/lib/theme";

const ThemeContext = createContext<Theme>("midnight");

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
