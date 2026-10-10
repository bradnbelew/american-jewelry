import type { ReactNode } from "react";

import { Pic } from "./Pic";

/** A measured block of the page. `screen` adds the house's vertical breathing room (20vh desktop, 12vh mobile). */
export function Section({
  children,
  className = "",
  width = "wide",
  id,
  reveal = false,
  screen = false,
}: {
  children: ReactNode;
  className?: string;
  width?: "wide" | "text" | "narrow";
  id?: string;
  reveal?: boolean;
  screen?: boolean;
}) {
  const max = width === "wide" ? "max-w-[96rem]" : width === "text" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section
      id={id}
      className={`mx-auto w-full ${max} px-4 md:px-10 ${id ? "scroll-mt-28" : ""} ${reveal ? "reveal" : ""} ${screen ? "screen" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/** Centered title. Only where the message itself is the page: appointments, policies, 404. */
export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
      {eyebrow && <span className="label">{eyebrow}</span>}
      <h1 className="h-display text-[2.75rem] md:text-[4.25rem]">{title}</h1>
      {lede && <p className="lede max-w-2xl">{lede}</p>}
    </div>
  );
}

/**
 * The standard opener: a narrow column of words and a photograph bleeding to one edge.
 * Eyebrow in caps, the name set large, one line beneath. 5/7 on desktop.
 */
export function SplitOpener({
  eyebrow,
  title,
  lede,
  photo,
  position,
  children,
  side = "right",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  photo: string;
  position?: string;
  children?: ReactNode;
  side?: "left" | "right";
}) {
  return (
    <Section className="pt-8 md:pt-14">
      <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
        <div className={`flex flex-col gap-6 md:col-span-5 md:pb-10 ${side === "left" ? "md:order-2" : ""}`}>
          {eyebrow && <span className="label">{eyebrow}</span>}
          <h1 className="h-display measure-display text-[3rem] md:text-[4.5rem] lg:text-[5.5rem]">{title}</h1>
          {lede && <p className="lede measure">{lede}</p>}
          {children}
        </div>
        <div className={`settle relative aspect-[4/5] overflow-hidden bg-bone md:col-span-7 md:aspect-[5/4] ${side === "left" ? "md:order-1" : ""}`}>
          <Pic k={photo} priority sizes="(min-width: 768px) 58vw, 100vw" position={position} />
        </div>
      </div>
    </Section>
  );
}

/** Full-bleed photograph with the words over a real overlay. For the home and for Royal American. */
export function PhotoOpener({
  photo,
  position,
  eyebrow,
  title,
  lede,
  children,
  height = "h-[86vh] min-h-[560px] max-h-[1000px]",
}: {
  photo: string;
  position?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  height?: string;
}) {
  return (
    <section className={`photo-overlay relative ${height} overflow-hidden bg-navy`}>
      <Pic k={photo} priority sizes="100vw" position={position} />
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="on-photo mx-auto flex max-w-[96rem] flex-col items-start gap-5 px-4 pb-12 text-paper md:px-10 md:pb-20">
          {eyebrow && <span className="label !text-paper/85">{eyebrow}</span>}
          <h1 className="h-display measure-display text-[2.75rem] md:text-[4.5rem] lg:text-[5.5rem]">{title}</h1>
          {lede && <p className="lede max-w-xl !text-paper/90">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  align = "left",
  lede,
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  lede?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow && <span className="label">{eyebrow}</span>}
      <h2 className="h-section text-[2rem] md:text-[2.75rem]">{title}</h2>
      {lede && <p className={`lede ${align === "center" ? "max-w-2xl" : "measure"}`}>{lede}</p>}
    </div>
  );
}
