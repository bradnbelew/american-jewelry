export const DESIGN_MODES = [
  { id: "classic", name: "Refined original", description: "The familiar photographic direction, with the shopping repairs." },
  { id: "working", name: "The Working Jeweler", description: "Design first. Bold type, a working drawing study and a visual family of objects." },
  { id: "company", name: "In Good Company", description: "Warm, generous and worn. Collections and people give the objects their context." },
  { id: "light", name: "In Full Light", description: "Bright, direct and precise. A large object stage and a simpler path to the right diamond." },
] as const;
export type DesignMode = (typeof DESIGN_MODES)[number]["id"];
export const validDesign = (s: string | null | undefined): s is DesignMode => DESIGN_MODES.some((m) => m.id === s);
export function readDesign(request: Request, live: boolean): DesignMode {
  if (live) return "classic";
  const query = new URL(request.url).searchParams.get("preview");
  if (query !== null) return validDesign(query) ? query : "classic";
  const saved = request.headers.get("Cookie")?.match(/(?:^|;\s*)aj_design=([^;]*)/)?.[1];
  return validDesign(saved) ? saved : "classic";
}
export function designCookie(request: Request, mode: DesignMode, live: boolean): HeadersInit | undefined {
  if (live || !new URL(request.url).searchParams.has("preview")) return undefined;
  return { "Set-Cookie": `aj_design=${mode}; Path=/; Max-Age=2592000; SameSite=Lax; HttpOnly${new URL(request.url).protocol === "https:" ? "; Secure" : ""}` };
}
