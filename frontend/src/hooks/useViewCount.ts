"use client";

import { useEffect } from "react";
import { recordView } from "@/lib/api";

export function useViewCount(pagePath: string, slug?: string) {
  useEffect(() => {
    recordView(pagePath, slug);
  }, [pagePath, slug]);
}
