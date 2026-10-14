import type { ReactNode } from "react";
import { Link } from "react-router";

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
  const max = width === "wide" ? "max-w-[1440px]" : width === "text" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section
      id={id}
      className={`house-section mx-auto w-full ${max} px-4 md:px-10 ${id ? "scroll-mt-28" : ""} ${reveal ? "reveal" : ""} ${screen ? "screen" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/** Centered title. Only where the message itself is the page: appointments, policies, 404. */
export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="page-title">
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
          <h1 className="h-display measure-display text-[3rem] md:text-[4.25rem] lg:text-[4.75rem]">{title}</h1>
          {lede && <p className="lede measure">{lede}</p>}
          {children}
        </div>
        <div className={`settle relative aspect-[4/5] overflow-hidden bg-paper md:col-span-7 md:aspect-[5/4] ${side === "left" ? "md:order-1 md:-ml-10" : "md:-mr-10"}`}>
          <Pic k={photo} priority sizes="(min-width: 768px) 58vw, 100vw" position={position} />
        </div>
      </div>
    </Section>
  );
}

/**
 * The opener: a full-bleed photograph with the words lower left on a real overlay. One per page, first.
 * `tall` is the art-directed phone source (4:5). The headline is 68px at 768 and 76px at 1440 (council T7).
 */
export function PhotoOpener({
  photo,
  tall,
  position,
  eyebrow,
  title,
  lede,
  children,
  height = "aspect-[4/5] md:aspect-auto md:h-[86vh] md:min-h-[560px] md:max-h-[1000px]",
}: {
  photo: string;
  tall?: string;
  position?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  height?: string;
}) {
  return (
    <section className={`photo-overlay relative ${height} overflow-hidden bg-ink`}>
      <Pic k={photo} tall={tall} priority sizes="100vw" position={position} />
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="on-photo mx-auto flex max-w-[96rem] flex-col items-start gap-6 px-4 pb-8 text-paper md:px-10 md:pb-16">
          {eyebrow && <span className="label !text-paper">{eyebrow}</span>}
          <h1 className="h-display measure-display text-[2.75rem] md:text-[4.25rem] lg:text-[4.75rem]">{title}</h1>
          {lede && <p className="lede max-w-xl !text-paper">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** A plate: one photograph across the page (2.2:1 on a desk, 4:5 in the hand), one line of caption beneath or none. */
export function Plate({ photo, tall, position, caption, href, priority = false, ratio = "aspect-[4/5] md:aspect-[2.2/1]" }: { photo: string; tall?: string; position?: string; caption?: ReactNode; href?: string; priority?: boolean; ratio?: string }) {
  const frame = (
    <div className={`settle relative ${ratio} overflow-hidden`}>
      <Pic k={photo} tall={tall} sizes="100vw" position={position} priority={priority} />
    </div>
  );
  return (
    <figure>
      {href ? (
        <Link to={href} viewTransition className="block">
          {frame}
        </Link>
      ) : (
        frame
      )}
      {caption && <figcaption className="label mx-auto mt-3 max-w-[96rem] px-4 md:px-10">{caption}</figcaption>}
    </figure>
  );
}

/** A line: one sentence, large, alone on the paper. */
export function LineScreen({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Section screen width="text" className={className}>
      <p className="h-section measure-display text-[1.75rem] md:text-[2.5rem] lg:text-[3rem]">{children}</p>
    </Section>
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
