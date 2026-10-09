import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  width = "wide",
  id,
}: {
  children: ReactNode;
  className?: string;
  width?: "wide" | "text" | "narrow";
  id?: string;
}) {
  const max = width === "wide" ? "max-w-[1440px]" : width === "text" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section id={id} className={`mx-auto ${max} px-5 md:px-10 ${id ? "scroll-mt-32" : ""} ${className}`}>
      {children}
    </section>
  );
}

/** Centered page opener used on every secondary page. */
export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
      {eyebrow && <span className="caps text-muted">{eyebrow}</span>}
      <h1 className="h-display text-[2.75rem] md:text-[4.25rem]">{title}</h1>
      {lede && <p className="lede max-w-2xl">{lede}</p>}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, align = "center" }: { eyebrow?: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow && <span className="caps text-muted">{eyebrow}</span>}
      <h2 className="h-section text-[2rem] md:text-[2.75rem]">{title}</h2>
    </div>
  );
}
