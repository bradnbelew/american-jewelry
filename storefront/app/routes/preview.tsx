import { redirect } from "react-router";
export function loader() { return redirect("/", 302); }
export default function RetiredPreview() { return null; }
