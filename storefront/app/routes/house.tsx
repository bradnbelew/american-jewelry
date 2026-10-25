import { redirect } from "react-router";

export function loader() {
  throw redirect("/our-story", 301);
}

export default function HouseRedirect() {
  return null;
}
