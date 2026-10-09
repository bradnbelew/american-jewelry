/** Placeholder house mark (the "Ascender" AJ) until the logo is chosen. Swap this one file later. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="14" strokeLinejoin="miter" strokeMiterlimit={6}>
        <path d="M14,172 L118,28 L118,138 A26,26 0 0 1 66,138" />
        <path d="M63,104 L118,104" />
      </g>
    </svg>
  );
}
