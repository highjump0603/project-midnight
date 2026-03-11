import { NextRequest, NextResponse } from "next/server";
import { getThemeFromHost } from "@/lib/theme";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const theme = getThemeFromHost(host);

  const res = NextResponse.next();
  res.headers.set("x-theme", theme);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|images).*)"],
};
