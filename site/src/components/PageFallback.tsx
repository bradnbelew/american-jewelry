export function PageFallback() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-24 pb-24 flex flex-col items-center gap-5" aria-busy="true">
      <div className="h-3 w-28 bg-ivory" />
      <div className="h-12 w-2/3 max-w-lg bg-ivory" />
      <div className="h-4 w-1/2 max-w-md bg-ivory" />
    </div>
  );
}
