import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Section, PageTitle } from "@/components/Section";
import { PageFallback } from "@/components/PageFallback";
import { DesignView } from "@/components/builder/DesignView";
import { decodeCode } from "@/lib/builder/code";
import { ringName } from "@/lib/builder/model";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const c = decodeCode(decodeURIComponent(code));
  return c ? { title: `Design ${decodeURIComponent(code)}`, description: ringName(c), robots: { index: false } } : { title: "Design" };
}

export default function DesignPage({ params, searchParams }: { params: Promise<{ code: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Content({ params, searchParams }: { params: Promise<{ code: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { code: raw } = await params;
  const sp = await searchParams;
  const code = decodeURIComponent(raw);
  const config = decodeCode(code);
  if (!config) notFound();
  const hint = sp.hint === "1";

  return (
    <>
      <Section className="pt-16 md:pt-24 pb-10 md:pb-14">
        <PageTitle eyebrow={hint ? "Someone has a ring in mind" : "A ring in the making"} title={hint ? "A hint, from someone who knows you." : ringName(config)} lede={hint ? "This is the ring they built for you. Its price is theirs to know." : "Built in the ring builder at American Jewelry. Bring the code to either store, or make it yours below."} />
      </Section>
      <Section>
        <DesignView config={config} code={code} hint={hint} />
      </Section>
      {!hint && (
        <Section className="pt-16">
          <div className="hair pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-ink-2">Want to change something?</span>
            <Link href={`/build/ring?code=${encodeURIComponent(code)}`} className="link">
              Open in the builder
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
