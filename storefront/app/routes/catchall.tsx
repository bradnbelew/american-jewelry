/** A true 404. The root ErrorBoundary renders the page. */
export function loader() {
  throw new Response("Not found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
