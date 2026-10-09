"use client";

import { useState } from "react";
import { Pic } from "./Pic";
import { RingViewer } from "./three/RingViewer";
import type { MetalKey, SettingKey } from "./three/RingScene";

export function PieceGallery({ photos, three }: { photos: string[]; three?: { metal: MetalKey; setting: SettingKey; carat: number } }) {
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const [first, ...rest] = photos;

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <div className="relative aspect-square overflow-hidden bg-ivory">
        {mode === "photo" || !three ? (
          <Pic k={first} sizes="(min-width: 1024px) 55vw, 100vw" priority />
        ) : (
          <RingViewer {...three} className="absolute inset-0" />
        )}
        {three && (
          <div className="absolute left-4 bottom-4 flex gap-2">
            <button type="button" className="pill bg-white/90" aria-pressed={mode === "photo"} onClick={() => setMode("photo")}>
              Photo
            </button>
            <button type="button" className="pill bg-white/90" aria-pressed={mode === "3d"} onClick={() => setMode("3d")}>
              3D
            </button>
          </div>
        )}
      </div>
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {rest.map((k) => (
            <div key={k} className="relative aspect-square overflow-hidden bg-ivory">
              <Pic k={k} sizes="(min-width: 1024px) 27vw, 50vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
