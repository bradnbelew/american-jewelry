import type { ReactNode } from "react";
import { Pic } from "./Pic";

export function Section({
  children,
  className = "",
  width = "wide",
  id,
  reveal = false,
}: {
  children: ReactNode;
  className?: string;
  width?: "wide" | "text" | "narrow";
  id?: string;
  reveal?: boolean;
}) {
  const max = width === "wide" ? "max-w-[1440px]" : width === "text" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section id={id} className={`mx-auto ${max} px-5 md:px-10 ${id ? "scroll-mt-32" : ""} ${reveal ? "reveal" : ""} ${className}`}>
      {children}
    </section>
  );
}

/** Centered opener. Used only where the message itself is the page: appointments, policies, not-found. */
export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
      {eyebrow && <span className="caps text-muted">{eyebrow}</span>}
      <h1 className="h-display text-[2.75rem] md:text-[4.25rem]">{title}</h1>
      {lede && <p className="lede max-w-2xl">{lede}</p>}
    </div>
  );
}

/**
 * Split opener: the title and its paragraph on the left, a tall photograph on the right.
 * The house's standard opener for a tier, a design or a collection: the words and the thing, side by side.
 */
export function SplitOpener({
  kicker,
  title,
  lede,
  photo,
  position,
  children,
  ratio = "aspect-[4/5]",
}: {
  kicker?: string;
  title: string;
  lede: string;
  photo: string;
  position?: string;
  children?: ReactNode;
  ratio?: string;
}) {
  return (
    <Section className="pt-10 md:pt-16">
      <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end">
        <div className="md:col-span-5 flex flex-col gap-6 md:pb-10">
          {kicker && <span className="caps text-muted">{kicker}</span>}
          <h1 className="h-display text-[3rem] md:text-[4.5rem] lg:text-[5.25rem]">{title}</h1>
          <p className="lede measure">{lede}</p>
          {children}
        </div>
        <div className={`md:col-span-7 relative ${ratio} md:aspect-[5/4] overflow-hidden bg-paper`}>
          <Pic k={photo} priority sizes="(min-width: 768px) 58vw, 100vw" position={position} />
        </div>
      </div>
    </Section>
  );
}

/** Full-bleed photographic opener with the words set over the image. For the home and for Royal American. */
export function PhotoOpener({
  photo,
  position,
  title,
  lede,
  children,
  height = "h-[82vh] min-h-[560px] max-h-[960px]",
  align = "left",
}: {
  photo: string;
  position?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  height?: string;
  align?: "left" | "center";
}) {
  return (
    <section className={`relative ${height} overflow-hidden bg-navy`}>
      <Pic k={photo} priority sizes="100vw" position={position} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/5" />
      <div className="absolute inset-x-0 bottom-0">
        <div className={`mx-auto max-w-[1440px] px-5 md:px-10 pb-12 md:pb-20 flex flex-col gap-6 text-white on-photo ${align === "center" ? "items-center text-center" : "items-start"}`}>
          <h1 className="h-display text-[2.75rem] md:text-[4.5rem] lg:text-[5.5rem] max-w-4xl">{title}</h1>
          {lede && <p className="lede !text-white/90 max-w-xl">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, align = "center", lede }: { eyebrow?: string; title: string; align?: "center" | "left"; lede?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow && <span className="caps text-muted">{eyebrow}</span>}
      <h2 className="h-section text-[2rem] md:text-[2.75rem]">{title}</h2>
      {lede && <p className={`lede ${align === "center" ? "max-w-2xl" : "measure"}`}>{lede}</p>}
    </div>
  );
}
