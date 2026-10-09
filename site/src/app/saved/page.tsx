import type { Metadata } from "next";
import { Section, PageTitle } from "@/components/Section";
import { SavedList } from "@/components/saved/SavedList";

export const metadata: Metadata = {
  title: "Saved pieces",
  description: "Pieces and ring designs you have saved at American Jewelry, kept in this browser.",
  robots: { index: false },
};

export default function SavedPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle title="Saved" lede="Pieces and ring designs you set aside. Kept in this browser; bring the list to either store and we will have them on the table." />
      </Section>
      <Section>
        <SavedList />
      </Section>
    </>
  );
}
