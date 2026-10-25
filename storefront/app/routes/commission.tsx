import { redirect } from "react-router";

export function loader() {
  throw redirect("/custom-design", 301);
}

export default function CommissionRedirect() {
  return null;
}
