/** Legacy shared URLs and cookies resolve to the one current storefront. */
export type DesignMode = "classic" | "working" | "company" | "light";
export function readDesign(_request: Request, _live: boolean): DesignMode { return "classic"; }
export function designCookie(request: Request, _mode: DesignMode, live: boolean): HeadersInit | undefined {
  if (live || !request.headers.get("Cookie")?.includes("aj_design=")) return undefined;
  return {"Set-Cookie": `aj_design=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`};
}
