export function PageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-24" aria-busy="true">
      <div className="h-3 w-32 bg-line mb-6" />
      <div className="h-14 w-2/3 max-w-xl bg-line mb-4" />
      <div className="h-5 w-1/2 max-w-md bg-line" />
    </div>
  );
}
