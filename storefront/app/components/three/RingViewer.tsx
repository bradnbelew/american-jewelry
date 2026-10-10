import {lazy, Suspense, useEffect, useState} from 'react';
import type {ParametricRingProps} from './ParametricRing';

/**
 * Client-only wrapper for the three.js ring. React Router renders on Oxygen's
 * edge runtime, which has no WebGL, so the scene mounts only after hydration.
 * The poster (children of the surrounding frame) stays in place until then.
 */
const ParametricRing = lazy(() =>
  import('./ParametricRing').then((m) => ({default: m.ParametricRing})),
);

export function RingViewer(props: ParametricRingProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Placeholder />;
  return (
    <Suspense fallback={<Placeholder />}>
      <ParametricRing {...props} />
    </Suspense>
  );
}

function Placeholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center caps-sm text-muted">
      Preparing the piece
    </div>
  );
}
