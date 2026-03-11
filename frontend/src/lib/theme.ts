export type Theme = "midnight" | "highjump";

export function getThemeFromHost(host: string): Theme {
  if (host.includes("highjump")) return "highjump";
  return "midnight";
}
