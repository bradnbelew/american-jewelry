"use client";

import dynamic from "next/dynamic";
import type { RingSceneProps } from "./RingScene";

const RingScene = dynamic(() => import("./RingScene").then((m) => m.RingScene), {
  ssr: false,
  loading: () => <div className="plate w-full h-full flex items-center justify-center text-muted label">Loading the piece…</div>,
});

export function RingViewer(props: RingSceneProps) {
  return <RingScene {...props} />;
}
