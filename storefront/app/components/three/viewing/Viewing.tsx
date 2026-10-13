import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { stoneDiameterMm } from "~/lib/builder/model";
import type { RingConfig } from "~/lib/builder/model";

import type { ViewingSpec } from "./pieces";

/**
 * The viewing, server side. The poster is in the HTML (it is what loads first, and the whole
 * experience under reduced motion or without WebGL); the room mounts after hydration, draws only
 * while it is on screen, and the poster fades once the first frame is ready (council P14).
 */
const Scene = lazy(() =>
  import("./ViewingScene.client").then((m) => ({ default: m.ViewingScene })),
);

/** True once the browser has WebGL and the visitor has not asked for reduced motion (then the room is never offered). */
export function useWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    if (probe.getContext("webgl2") ?? probe.getContext("webgl")) setOk(true);
  }, []);
  return ok;
}

/** Phones hand the light to the motion sensor; iPhone asks once, from a tap. */
function TiltControl({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState<"off" | "on" | "no">("off");
  useEffect(
    () =>
      setShow(
        "DeviceOrientationEvent" in window &&
          window.matchMedia("(pointer: coarse)").matches,
      ),
    [],
  );
  if (!show || state === "on") return null;
  return (
    <button
      type="button"
      className={`btn btn-light ${className}`}
      onClick={async () => {
        const { enableTilt } = await import("./tilt");
        setState((await enableTilt()) ? "on" : "no");
      }}
    >
      {state === "no"
        ? "Motion is off in this browser"
        : "Tilt to see the fire"}
    </button>
  );
}

/** A frame inside a section: the piece in the light, the lining continuous with the section around it. */
export function ViewingFrame({
  spec,
  poster,
  posterTall,
  alt,
  offset = 0,
  lift = 0,
  eager = false,
  fill = false,
  className = "",
  children,
}: {
  spec: ViewingSpec;
  poster: string;
  /** an art-directed poster for phones */
  posterTall?: string;
  alt: string;
  offset?: number;
  lift?: number;
  /** the frame is the first thing on the page: load the poster first */
  eager?: boolean;
  /** fill the positioned parent (a hero) instead of sizing itself by aspect ratio */
  fill?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const gl = useWebGL();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !gl) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "120px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [gl]);

  return (
    <div
      ref={ref}
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Inside a section the room has no edge: it fades into the lining around it, so it never reads as a box. */}
      <div className={`absolute inset-0 ${fill ? "" : "viewing-fade"}`}>
        {gl && (active || ready) && (
          <Suspense fallback={null}>
            <Scene
              spec={spec}
              active={active}
              offset={offset}
              lift={lift}
              onFirstFrame={() => setReady(true)}
            />
          </Suspense>
        )}
        <picture>
          {posterTall && (
            <source media="(max-width: 767px)" srcSet={posterTall} />
          )}
          <img
            src={poster}
            alt=""
            width={1600}
            height={1280}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding={eager ? "sync" : "async"}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-[var(--ease-house)] ${ready ? "opacity-0" : "opacity-100"}`}
          />
        </picture>
      </div>
      {children}
      {ready && <TiltControl className="absolute bottom-4 left-4" />}
    </div>
  );
}

/** "See it in the light": a dark room opened over the product page, closed with Escape or "Close". */
export function ViewingRoom({
  spec,
  metal,
  carat,
  title,
  open,
  onClose,
}: {
  spec: ViewingSpec;
  metal?: RingConfig["metal"];
  /** the selected version's carat; the stone drawn is the stone priced */
  carat?: number;
  title: string;
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [closer, setCloser] = useState(false);
  const [ready, setReady] = useState(false);
  const gl = useWebGL();
  const ct = carat ?? (spec.jewel.kind === "ring" ? spec.jewel.carat : undefined);
  const stoneMm = ct ? stoneDiameterMm(ct).toFixed(1) : null;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (!open) {
      setCloser(false);
      setReady(false);
    }
  }, [open]);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      className="viewing-room m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-ink p-0 text-paper"
      aria-label={`${title}, in the light`}
    >
      {open && gl && (
        <Suspense fallback={null}>
          <Scene
            spec={spec}
            metal={metal}
            carat={carat}
            active={open}
            closer={closer}
            onFirstFrame={() => setReady(true)}
          />
        </Suspense>
      )}
      {/* a real overlay under the words and controls at the foot of the room */}
      <div
        className="viewing-foot pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
        aria-hidden
      />
      {!ready && (
        <p className="label absolute inset-0 flex items-center justify-center text-paper/80">
          {gl
            ? "Bringing out the piece"
            : "The light needs WebGL, which this browser has turned off."}
        </p>
      )}
      <div className="wrap pointer-events-none absolute inset-x-0 top-0 flex h-[4.5rem] items-center justify-between">
        <p className="font-text text-[1.0625rem] text-paper">
          {title}, in the light
        </p>
        <button
          type="button"
          className="link link-light pointer-events-auto min-w-11 justify-center"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-4 pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
        <div
          className={`flex max-w-[40ch] flex-col gap-2 transition-opacity duration-500 ${closer && spec.grade ? "opacity-100" : "opacity-0"}`}
          aria-live="polite"
        >
          <p className="font-text text-[1.125rem] text-paper">{closer ? spec.grade : ""}</p>
          {closer && stoneMm ? (
            <p className="label !text-paper/80">
              Shown larger than life. The stone is about {stoneMm} mm across.
            </p>
          ) : null}
        </div>
        <div className="pointer-events-auto flex flex-wrap items-center gap-6">
          <TiltControl />
          <button
            type="button"
            className="link link-light"
            aria-pressed={closer}
            onClick={() => setCloser((c) => !c)}
          >
            {closer ? "Step back" : "Look closer"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
