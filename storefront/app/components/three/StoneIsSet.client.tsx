import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, type RefObject } from "react";

import type { RingConfig } from "~/lib/builder/model";

import { ParametricRing } from "./ParametricRing.client";

gsap.registerPlugin(ScrollTrigger);
if (import.meta.env.DEV && typeof window !== "undefined") (window as unknown as { __ScrollTrigger?: typeof ScrollTrigger }).__ScrollTrigger = ScrollTrigger;

/**
 * "The stone is set." The house ring assembles over exactly one viewport of scroll:
 * band arrives, head rises, stone lowers, four claws close, one sweep of light.
 * Scrubbed, reversible, pinned one screen. Lenis runs only while this is mounted.
 * The wrapper (StoneIsSet.tsx) decides whether to mount this at all (reduced motion, no WebGL).
 * gsap.context() in an effect, reverted on unmount, so nothing outlives the page.
 */
export function StoneIsSetScene({ config, pinRef, onFirstFrame }: { config: RingConfig; pinRef: RefObject<HTMLElement | null>; onFirstFrame?: () => void }) {
  const progress = useRef(0);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const header = document.querySelector("header");
    const ctx = gsap.context(() => {
      const proxy = { t: 0 };
      gsap.to(proxy, {
        t: 1,
        ease: "none",
        onUpdate: () => {
          progress.current = proxy.t;
        },
        scrollTrigger: {
          trigger: pin,
          pin,
          pinSpacing: true,
          start: () => `top ${header?.getBoundingClientRect().height ?? 0}px`,
          end: "+=100%",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, pin);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pinRef]);

  return <ParametricRing config={config} view="set" interactive={false} progressRef={progress} onFirstFrame={onFirstFrame} className="absolute inset-0" />;
}
