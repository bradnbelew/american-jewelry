import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  width = "7xl",
  id,
}: {
  children: ReactNode;
  className?: string;
  width?: "7xl" | "5xl" | "3xl";
  id?: string;
}) {
  const max = width === "7xl" ? "max-w-7xl" : width === "5xl" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section id={id} className={`mx-auto ${max} px-5 md:px-8 ${id ? "scroll-mt-24" : ""} ${className}`}>
      {children}
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  lede,
  align = "left",
  size = "lg",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  size?: "lg" | "xl";
}) {
  const t = size === "xl" ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl";
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className={`font-display font-normal leading-[1.05] text-navy balance ${t}`}>{title}</h1>
      {lede && <p className="text-lg md:text-xl text-ink/80 leading-relaxed max-w-2xl balance">{lede}</p>}
    </div>
  );
}
