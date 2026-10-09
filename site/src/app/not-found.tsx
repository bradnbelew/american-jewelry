import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="pt-24 md:pt-32 pb-16">
      <PageTitle title="That page is not here." lede="It may have moved when the house did. Everything we make is a step away." />
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        <Link href="/americana" className="btn">
          The designs
        </Link>
        <Link href="/appointments" className="btn btn-outline">
          Book an appointment
        </Link>
      </div>
    </Section>
  );
}
