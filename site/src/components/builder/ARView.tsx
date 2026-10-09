"use client";

import { useEffect, useState } from "react";
import type * as THREE from "three";

/** Exports the live ring to a GLB and opens it in model-viewer, which offers AR on phones that support it. */
export function ARView({ getGroup }: { getGroup: () => THREE.Group | null }) {
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  const start = async () => {
    const g = getGroup();
    if (!g) return;
    setBusy(true);
    try {
      await import("@google/model-viewer");
      const { GLTFExporter } = await import("three/examples/jsm/exporters/GLTFExporter.js");
      const exporter = new GLTFExporter();
      const buf = (await exporter.parseAsync(g, { binary: true })) as ArrayBuffer;
      const blob = new Blob([buf], { type: "model/gltf-binary" });
      setUrl((u) => {
        if (u) URL.revokeObjectURL(u);
        return URL.createObjectURL(blob);
      });
      setOpen(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button type="button" className="pill" onClick={start} disabled={busy}>
        {busy ? "Preparing…" : "View in your space"}
      </button>
      {open && url && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4" role="dialog" aria-label="View in your space">
          <div className="bg-white w-full max-w-lg flex flex-col">
            <div className="flex items-center justify-between px-5 h-14 border-b border-hair">
              <span className="caps">Your ring</span>
              <button type="button" className="caps text-muted hover:text-ink" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <model-viewer src={url} alt="Your ring" ar ar-modes="webxr scene-viewer quick-look" ar-scale="fixed" camera-controls auto-rotate shadow-intensity="1" exposure="1.1" style={{ width: "100%", height: "420px", background: "#f7f5f0" }} />
            <p className="px-5 py-4 text-[0.75rem] text-muted leading-relaxed">
              On an Android phone, tap the AR button to place the ring at its real size. On iPhone, AR needs the house&apos;s USDZ file, which arrives with the launch; the model still turns here.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
