"use client";

import { useEffect, useState } from "react";

/** Copyright year: a fixed value at prerender, corrected on the client after mount. */
export function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
