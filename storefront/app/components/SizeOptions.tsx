/** Ring sizes as fixed-height buttons. The border stays 1px; only its color changes. */
export function SizeOptions({ id, sizes, value, onChange }: { id: string; sizes: string[]; value: string; onChange: (size: string) => void }) {
  return (
    <div id={id} className="size-options" role="group" aria-label="Ring size" tabIndex={-1}>
      {sizes.map((s) => (
        <button key={s} type="button" className="size-opt" aria-pressed={value === s} onClick={() => onChange(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
