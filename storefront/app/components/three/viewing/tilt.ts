/**
 * The light is yours. On a computer the pointer carries the lamp; on a phone, tilting the phone does,
 * the way you tip a ring in daylight to see it flash. Values are -1..1, read every frame by the stage.
 */
export const tilt = {
  /** smoothed values the stage reads */
  x: 0,
  y: 0,
  /** raw targets */
  tx: 0,
  ty: 0,
  source: "idle" as "idle" | "pointer" | "device",
  lastInput: 0,
};

const clamp = (v: number, a = -1, b = 1) => Math.min(b, Math.max(a, v));

export function listenPointer() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (tilt.source === "device") return;
      tilt.tx = clamp((e.clientX / window.innerWidth) * 2 - 1);
      tilt.ty = clamp((e.clientY / window.innerHeight) * 2 - 1);
      tilt.source = "pointer";
      tilt.lastInput = performance.now();
    },
    { passive: true },
  );
}

type DOE = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> };

export function canTilt() {
  return typeof window !== "undefined" && "DeviceOrientationEvent" in window && window.matchMedia("(pointer: coarse)").matches;
}

let listening = false;

/** Must be called from a tap: iPhone asks permission for motion the first time. */
export async function enableTilt(): Promise<boolean> {
  const D = (window as unknown as { DeviceOrientationEvent?: DOE }).DeviceOrientationEvent;
  if (!D) return false;
  try {
    if (typeof D.requestPermission === "function") {
      const answer = await D.requestPermission();
      if (answer !== "granted") return false;
    }
  } catch {
    return false;
  }
  if (listening) return true;
  listening = true;
  let base: { b: number; g: number } | null = null;
  window.addEventListener("deviceorientation", (e) => {
    if (e.beta == null || e.gamma == null) return;
    // measured from however the phone was held when the light was handed over,
    // drifting slowly back to center so a resting hand reads as still
    if (!base) base = { b: e.beta, g: e.gamma };
    base.b += (e.beta - base.b) * 0.004;
    base.g += (e.gamma - base.g) * 0.004;
    tilt.tx = clamp((e.gamma - base.g) / 18);
    tilt.ty = clamp((e.beta - base.b) / 18);
    tilt.source = "device";
    tilt.lastInput = performance.now();
  });
  return true;
}
