"use client";

import dynamic from "next/dynamic";
import type { ParametricRingProps } from "./ParametricRing";

const ParametricRing = dynamic(() => import("./ParametricRing").then((m) => m.ParametricRing), {
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center caps-sm text-muted">Preparing the piece…</div>,
});

export function RingViewer(props: ParametricRingProps) {
  return <ParametricRing {...props} />;
}
